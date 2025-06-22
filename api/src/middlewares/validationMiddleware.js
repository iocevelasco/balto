const { validationResult } = require('express-validator');
const { ApplicationError } = require('./errorMiddleware');

/**
 * Validation middleware that handles express-validator results
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path || error.param,
      message: error.msg,
      value: error.value
    }));
    
    const errorMessage = errorMessages.map(err => `${err.field}: ${err.message}`).join(', ');
    
    throw new ApplicationError(errorMessage, 400);
  }
  
  next();
};

/**
 * Custom validation for MongoDB ObjectId
 */
const isValidObjectId = (value) => {
  return /^[0-9a-fA-F]{24}$/.test(value);
};

/**
 * Middleware to validate MongoDB ObjectId parameters
 */
const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    
    if (!id) {
      throw new ApplicationError(`${paramName} parameter is required`, 400);
    }
    
    if (!isValidObjectId(id)) {
      throw new ApplicationError(`Invalid ${paramName} format`, 400);
    }
    
    next();
  };
};

/**
 * Sanitize request body to prevent NoSQL injection
 */
const sanitizeBody = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    sanitizeObject(req.body);
  }
  next();
};

/**
 * Recursively sanitize object properties
 */
const sanitizeObject = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          obj[key].forEach(item => {
            if (typeof item === 'object' && item !== null) {
              sanitizeObject(item);
            }
          });
        } else {
          sanitizeObject(obj[key]);
        }
      } else if (typeof obj[key] === 'string') {
        // Remove potential NoSQL injection patterns
        obj[key] = obj[key].replace(/^\$/, '');
      }
    }
  }
};

/**
 * Pagination validation middleware
 */
const validatePagination = (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  
  if (isNaN(pageNum) || pageNum < 1) {
    throw new ApplicationError('Page must be a positive integer', 400);
  }
  
  if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
    throw new ApplicationError('Limit must be between 1 and 100', 400);
  }
  
  req.pagination = {
    page: pageNum,
    limit: limitNum,
    skip: (pageNum - 1) * limitNum
  };
  
  next();
};

/**
 * File upload validation
 */
const validateFileUpload = (allowedTypes = [], maxSize = 5 * 1024 * 1024) => {
  return (req, res, next) => {
    if (!req.file && !req.files) {
      return next();
    }
    
    const files = req.files || [req.file];
    
    for (const file of files) {
      if (file) {
        // Check file size
        if (file.size > maxSize) {
          throw new ApplicationError(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`, 400);
        }
        
        // Check file type
        if (allowedTypes.length > 0 && !allowedTypes.includes(file.mimetype)) {
          throw new ApplicationError(`File type ${file.mimetype} not allowed. Allowed types: ${allowedTypes.join(', ')}`, 400);
        }
      }
    }
    
    next();
  };
};

/**
 * Email validation regex
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone validation regex (supports international formats)
 */
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

/**
 * Password strength validation
 */
const validatePasswordStrength = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasNonalphas = /\W/.test(password);
  
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long`;
  }
  
  if (!hasUpperCase) {
    return 'Password must contain at least one uppercase letter';
  }
  
  if (!hasLowerCase) {
    return 'Password must contain at least one lowercase letter';
  }
  
  if (!hasNumbers) {
    return 'Password must contain at least one number';
  }
  
  if (!hasNonalphas) {
    return 'Password must contain at least one special character';
  }
  
  return null; // Password is valid
};

module.exports = {
  validateRequest,
  validateObjectId,
  sanitizeBody,
  validatePagination,
  validateFileUpload,
  isValidObjectId,
  emailRegex,
  phoneRegex,
  validatePasswordStrength
}; 