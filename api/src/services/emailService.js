const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

/**
 * Send email verification
 * @param {string} email - Recipient email
 * @param {string} firstName - User's first name
 * @param {string} verificationToken - Verification token
 */
const sendVerificationEmail = async (email, firstName, verificationToken) => {
  const transporter = createTransporter();
  
  const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;
  
  const mailOptions = {
    from: `"Pet Adoption Platform" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email Address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Welcome to Pet Adoption Platform! 🐾</h2>
        <p>Hi ${firstName},</p>
        <p>Thank you for joining our pet adoption community! To complete your registration, please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #3498db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #7f8c8d;">${verificationUrl}</p>
        <p>This verification link will expire in 24 hours.</p>
        <p>If you didn't create an account with us, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ecf0f1; margin: 30px 0;">
        <p style="color: #7f8c8d; font-size: 12px;">
          Best regards,<br>
          The Pet Adoption Team
        </p>
      </div>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

/**
 * Send password reset email
 * @param {string} email - Recipient email
 * @param {string} firstName - User's first name
 * @param {string} resetToken - Reset token
 */
const sendPasswordResetEmail = async (email, firstName, resetToken) => {
  const transporter = createTransporter();
  
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: `"Pet Adoption Platform" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #e74c3c;">Password Reset Request 🔐</h2>
        <p>Hi ${firstName},</p>
        <p>We received a request to reset your password. If you made this request, click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #e74c3c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #7f8c8d;">${resetUrl}</p>
        <p><strong>This reset link will expire in 10 minutes.</strong></p>
        <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
        <hr style="border: none; border-top: 1px solid #ecf0f1; margin: 30px 0;">
        <p style="color: #7f8c8d; font-size: 12px;">
          Best regards,<br>
          The Pet Adoption Team
        </p>
      </div>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

/**
 * Send adoption application notification to shelter
 * @param {Object} shelter - Shelter user object
 * @param {Object} adopter - Adopter user object
 * @param {Object} pet - Pet object
 * @param {Object} adoption - Adoption object
 */
const sendAdoptionApplicationNotification = async (shelter, adopter, pet, adoption) => {
  const transporter = createTransporter();
  
  const applicationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/shelter/adoptions/${adoption._id}`;
  
  const mailOptions = {
    from: `"Pet Adoption Platform" <${process.env.EMAIL_USER}>`,
    to: shelter.email,
    subject: `New Adoption Application for ${pet.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #27ae60;">New Adoption Application! 🏠</h2>
        <p>Hi ${shelter.firstName},</p>
        <p>Great news! You've received a new adoption application for <strong>${pet.name}</strong>.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">Application Details:</h3>
          <p><strong>Pet:</strong> ${pet.name} (${pet.type})</p>
          <p><strong>Applicant:</strong> ${adopter.firstName} ${adopter.lastName}</p>
          <p><strong>Email:</strong> ${adopter.email}</p>
          <p><strong>Phone:</strong> ${adopter.phone || 'Not provided'}</p>
          <p><strong>Application Date:</strong> ${new Date(adoption.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${applicationUrl}" style="background-color: #27ae60; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Review Application
          </a>
        </div>
        
        <p>Please review the application and respond as soon as possible. The applicant is waiting to hear from you!</p>
        
        <hr style="border: none; border-top: 1px solid #ecf0f1; margin: 30px 0;">
        <p style="color: #7f8c8d; font-size: 12px;">
          Best regards,<br>
          The Pet Adoption Team
        </p>
      </div>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

/**
 * Send adoption status update notification
 * @param {Object} adopter - Adopter user object
 * @param {Object} pet - Pet object
 * @param {string} status - New adoption status
 * @param {string} note - Optional note from shelter
 */
const sendAdoptionStatusUpdate = async (adopter, pet, status, note = '') => {
  const transporter = createTransporter();
  
  const statusMessages = {
    approved: {
      subject: `Great News! Your adoption application for ${pet.name} has been approved! 🎉`,
      title: 'Application Approved!',
      color: '#27ae60',
      message: `Congratulations! Your adoption application for ${pet.name} has been approved. The shelter will contact you soon to arrange the next steps.`
    },
    rejected: {
      subject: `Update on your adoption application for ${pet.name}`,
      title: 'Application Update',
      color: '#e74c3c',
      message: `We regret to inform you that your adoption application for ${pet.name} was not approved at this time. Don't give up - there are many other wonderful pets looking for homes!`
    },
    completed: {
      subject: `Welcome to the family! ${pet.name}'s adoption is complete! 🏠`,
      title: 'Adoption Complete!',
      color: '#8e44ad',
      message: `Congratulations! The adoption of ${pet.name} is now complete. Welcome to your new family member! We're so happy for you both.`
    }
  };
  
  const statusInfo = statusMessages[status] || {
    subject: `Update on your adoption application for ${pet.name}`,
    title: 'Application Update',
    color: '#3498db',
    message: `There's an update on your adoption application for ${pet.name}.`
  };
  
  const mailOptions = {
    from: `"Pet Adoption Platform" <${process.env.EMAIL_USER}>`,
    to: adopter.email,
    subject: statusInfo.subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: ${statusInfo.color};">${statusInfo.title}</h2>
        <p>Hi ${adopter.firstName},</p>
        <p>${statusInfo.message}</p>
        
        ${note ? `
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #2c3e50;">Message from the shelter:</h4>
          <p style="margin-bottom: 0;">${note}</p>
        </div>
        ` : ''}
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">Pet Details:</h3>
          <p><strong>Name:</strong> ${pet.name}</p>
          <p><strong>Type:</strong> ${pet.type}</p>
          <p><strong>Breed:</strong> ${pet.breed}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ecf0f1; margin: 30px 0;">
        <p style="color: #7f8c8d; font-size: 12px;">
          Best regards,<br>
          The Pet Adoption Team
        </p>
      </div>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

/**
 * Send meeting reminder email
 * @param {Object} user - User object
 * @param {Object} pet - Pet object
 * @param {Date} meetingDate - Meeting date
 * @param {string} location - Meeting location
 */
const sendMeetingReminder = async (user, pet, meetingDate, location) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: `"Pet Adoption Platform" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: `Reminder: Meeting scheduled for ${pet.name} tomorrow`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f39c12;">Meeting Reminder 📅</h2>
        <p>Hi ${user.firstName},</p>
        <p>This is a friendly reminder about your scheduled meeting regarding <strong>${pet.name}</strong>.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">Meeting Details:</h3>
          <p><strong>Pet:</strong> ${pet.name}</p>
          <p><strong>Date & Time:</strong> ${meetingDate.toLocaleString()}</p>
          <p><strong>Location:</strong> ${location}</p>
        </div>
        
        <p>We're excited for you to meet ${pet.name}! Please arrive on time and bring any questions you might have.</p>
        
        <hr style="border: none; border-top: 1px solid #ecf0f1; margin: 30px 0;">
        <p style="color: #7f8c8d; font-size: 12px;">
          Best regards,<br>
          The Pet Adoption Team
        </p>
      </div>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

/**
 * Send welcome email to new users
 * @param {Object} user - User object
 */
const sendWelcomeEmail = async (user) => {
  const transporter = createTransporter();
  
  const dashboardUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard`;
  
  const mailOptions = {
    from: `"Pet Adoption Platform" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Welcome to Pet Adoption Platform! 🐾',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3498db;">Welcome to Pet Adoption Platform! 🐾</h2>
        <p>Hi ${user.firstName},</p>
        <p>Welcome to our pet adoption community! We're thrilled to have you join us in our mission to connect loving pets with caring families.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">What you can do now:</h3>
          <ul>
            <li>Browse available pets in your area</li>
            <li>Save your favorite pets</li>
            <li>Set up adoption alerts</li>
            <li>Complete your profile for faster applications</li>
            ${user.role === 'shelter' ? '<li>Add your pets for adoption</li>' : ''}
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${dashboardUrl}" style="background-color: #3498db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Get Started
          </a>
        </div>
        
        <p>If you have any questions, feel free to reach out to our support team. Happy pet hunting!</p>
        
        <hr style="border: none; border-top: 1px solid #ecf0f1; margin: 30px 0;">
        <p style="color: #7f8c8d; font-size: 12px;">
          Best regards,<br>
          The Pet Adoption Team
        </p>
      </div>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendAdoptionApplicationNotification,
  sendAdoptionStatusUpdate,
  sendMeetingReminder,
  sendWelcomeEmail
}; 