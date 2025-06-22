const User = require('../models/User');
const { generateToken, generateResetToken, generateVerificationToken, hashToken } = require('../utils/jwtUtils');
const { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail } = require('../services/emailService');
const { asyncHandler } = require('../middlewares/errorMiddleware');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, shelter]
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 */
const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, role, phone, address } = req.validatedData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User with this email already exists'
    });
  }

  // Generate email verification token
  const { verificationToken, hashedToken, verificationTokenExpire } = generateVerificationToken();

  // Create user
  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    role: role || 'user',
    phone,
    address,
    emailVerificationToken: hashedToken,
    emailVerificationExpire: verificationTokenExpire
  });

  // Send verification email
  try {
    await sendVerificationEmail(email, firstName, verificationToken);
  } catch (error) {
    console.error('Failed to send verification email:', error);
    // Don't fail registration if email fails
  }

  // Generate JWT token
  const token = generateToken(user._id, user.role);

  res.status(201).json({
    success: true,
    message: 'User registered successfully. Please check your email to verify your account.',
    data: {
      user: user.getPublicProfile(),
      token
    }
  });
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validatedData;

  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  if (!user.isActive) {
    return res.status(401).json({
      success: false,
      message: 'Account is deactivated. Please contact support.'
    });
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate JWT token
  const token = generateToken(user._id, user.role);

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: user.getPublicProfile(),
      token
    }
  });
});

/**
 * @swagger
 * /api/auth/verify-email:
 *   post:
 *     summary: Verify user email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 */
const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.validatedData;

  // Hash the token to compare with stored hash
  const hashedToken = hashToken(token);

  // Find user with matching token and check expiry
  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpire: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired verification token'
    });
  }

  // Update user verification status
  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpire = undefined;
  await user.save();

  // Send welcome email
  try {
    await sendWelcomeEmail(user);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }

  res.json({
    success: true,
    message: 'Email verified successfully'
  });
});

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       404:
 *         description: User not found
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.validatedData;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'No user found with this email address'
    });
  }

  // Generate reset token
  const { resetToken, hashedToken, resetTokenExpire } = generateResetToken();

  // Save reset token to user
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = resetTokenExpire;
  await user.save();

  // Send reset email
  try {
    await sendPasswordResetEmail(email, user.firstName, resetToken);
    
    res.json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (error) {
    // Clear reset token if email fails
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    console.error('Failed to send password reset email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send password reset email'
    });
  }
});

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password with token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *               - confirmPassword
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 6
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.validatedData;

  // Hash the token to compare with stored hash
  const hashedToken = hashToken(token);

  // Find user with matching token and check expiry
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired reset token'
    });
  }

  // Update password and clear reset token
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // Generate new JWT token
  const jwtToken = generateToken(user._id, user.role);

  res.json({
    success: true,
    message: 'Password reset successful',
    data: {
      user: user.getPublicProfile(),
      token: jwtToken
    }
  });
});

/**
 * @swagger
 * /api/auth/resend-verification:
 *   post:
 *     summary: Resend email verification
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Verification email sent
 *       400:
 *         description: Email already verified
 */
const resendVerification = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user.isVerified) {
    return res.status(400).json({
      success: false,
      message: 'Email is already verified'
    });
  }

  // Generate new verification token
  const { verificationToken, hashedToken, verificationTokenExpire } = generateVerificationToken();

  // Update user with new token
  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpire = verificationTokenExpire;
  await user.save();

  // Send verification email
  try {
    await sendVerificationEmail(user.email, user.firstName, verificationToken);
    
    res.json({
      success: true,
      message: 'Verification email sent'
    });
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send verification email'
    });
  }
});

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *       401:
 *         description: Unauthorized
 */
const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      user: req.user.getPublicProfile()
    }
  });
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user (client-side token removal)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
const logout = asyncHandler(async (req, res) => {
  // Since we're using stateless JWT, logout is handled client-side
  // This endpoint is mainly for consistency and potential future features
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Authenticate user with Google
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idToken
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: Google ID token from client
 *     responses:
 *       200:
 *         description: Google sign-in successful
 *       400:
 *         description: Invalid Google token
 *       401:
 *         description: Authentication failed
 */
const googleSignIn = asyncHandler(async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ 
      success: false, 
      message: 'ID token is required.' 
    });
  }

  let ticket;
  try {
    ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
  } catch (error) {
    console.error('Google token verification error:', error);
    return res.status(401).json({ 
      success: false, 
      message: 'Google authentication failed. Invalid token.' 
    });
  }
  
  const payload = ticket.getPayload();
  const { 
    sub: googleId, 
    email, 
    name, 
    picture: avatar, 
    given_name: firstName, 
    family_name: lastName 
  } = payload;

  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Google account does not have an email.' 
    });
  }

  let user = await User.findOne({ email });

  if (!user) {
    // User does not exist, create a new one
    try {
      user = await User.create({
        googleId,
        email,
        firstName: firstName || name?.split(' ')[0] || 'Usuario',
        lastName: lastName || name?.split(' ').slice(1).join(' ') || '',
        avatar,
        isVerified: true, // Email is verified by Google
        role: 'user',
        isActive: true,
        lastLogin: new Date()
      });
    } catch (createError) {
      console.error('Error creating user from Google auth:', createError);
      return res.status(500).json({
        success: false,
        message: 'Error creating user account'
      });
    }
  } else {
    // User exists, update with Google info if necessary
    try {
      if (!user.googleId) {
        user.googleId = googleId;
      }
      if (!user.avatar && avatar) {
        user.avatar = avatar;
      }
      if (!user.isVerified) {
        user.isVerified = true; // Trust Google verification
      }
      user.lastLogin = new Date();
      await user.save();
    } catch (updateError) {
      console.error('Error updating user from Google auth:', updateError);
      // Continue with login even if update fails
    }
  }
  
  // Generate JWT token
  const token = generateToken(user._id, user.role);

  res.json({
    success: true,
    message: 'Google sign-in successful',
    data: {
      user: user.getPublicProfile(),
      token
    }
  });
});

module.exports = {
  register,
  login,
  googleSignIn,
  verifyEmail,
  forgotPassword,
  resetPassword,
  resendVerification,
  getMe,
  logout
}; 