const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * Generate JWT token for user authentication
 * @param {string} userId - User ID
 * @param {string} role - User role
 * @returns {string} JWT token
 */
const generateToken = (userId, role) => {
  return jwt.sign(
    { 
      id: userId,
      role: role 
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    }
  );
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Generate refresh token
 * @returns {string} Refresh token
 */
const generateRefreshToken = () => {
  return crypto.randomBytes(40).toString('hex');
};

/**
 * Generate password reset token
 * @returns {Object} Token and expiry
 */
const generateResetToken = () => {
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  // Hash token and set expiry
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  const resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return {
    resetToken,
    hashedToken,
    resetTokenExpire
  };
};

/**
 * Generate email verification token
 * @returns {Object} Token and expiry
 */
const generateVerificationToken = () => {
  const verificationToken = crypto.randomBytes(20).toString('hex');
  
  // Hash token and set expiry
  const hashedToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  
  const verificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  return {
    verificationToken,
    hashedToken,
    verificationTokenExpire
  };
};

/**
 * Hash token for storage
 * @param {string} token - Token to hash
 * @returns {string} Hashed token
 */
const hashToken = (token) => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
};

/**
 * Extract token from Authorization header
 * @param {string} authHeader - Authorization header value
 * @returns {string|null} Extracted token or null
 */
const extractTokenFromHeader = (authHeader) => {
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};

/**
 * Check if token is expired
 * @param {number} exp - Token expiration timestamp
 * @returns {boolean} True if expired
 */
const isTokenExpired = (exp) => {
  return Date.now() >= exp * 1000;
};

/**
 * Get token expiration time in human readable format
 * @param {string} token - JWT token
 * @returns {string} Expiration time
 */
const getTokenExpiration = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (decoded && decoded.exp) {
      return new Date(decoded.exp * 1000).toISOString();
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Generate API key for external integrations
 * @param {string} prefix - Prefix for the API key
 * @returns {string} API key
 */
const generateApiKey = (prefix = 'pk') => {
  const randomBytes = crypto.randomBytes(32).toString('hex');
  return `${prefix}_${randomBytes}`;
};

module.exports = {
  generateToken,
  verifyToken,
  generateRefreshToken,
  generateResetToken,
  generateVerificationToken,
  hashToken,
  extractTokenFromHeader,
  isTokenExpired,
  getTokenExpiration,
  generateApiKey
}; 