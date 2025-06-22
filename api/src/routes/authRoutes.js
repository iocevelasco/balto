const express = require('express');
const router = express.Router();

// Import controllers
const {
  register,
  login,
  googleSignIn,
  verifyEmail,
  forgotPassword,
  resetPassword,
  resendVerification,
  getMe,
  logout
} = require('../controllers/authController');

// Import middleware
const { authenticate } = require('../middlewares/authMiddleware');

// Import validation schemas
const {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  validateSchema
} = require('../validations/userValidation');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and account management
 */

// Public routes (no authentication required)
router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/google', googleSignIn);
router.post('/verify-email', validateSchema(verifyEmailSchema), verifyEmail);
router.post('/forgot-password', validateSchema(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validateSchema(resetPasswordSchema), resetPassword);

// Protected routes (authentication required)
router.use(authenticate); // Apply authentication middleware to all routes below

router.get('/me', getMe);
router.get('/verify', getMe); // Add verify route as alias to /me for token verification
router.post('/resend-verification', resendVerification);
router.post('/logout', logout);

module.exports = router; 