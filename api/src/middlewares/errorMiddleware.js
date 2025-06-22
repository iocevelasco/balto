/**
 * Error handling middleware for the Pet Adoption API
 */

/**
 * Not Found middleware - handles 404 errors
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Enhanced logging
  console.error('Error Details:', {
    name: err.name,
    message: err.message,
    code: err.code,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    requestInfo: {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString()
    }
  });

  // MongoDB connection errors
  if (err.name === 'MongooseServerSelectionError' || err.code === 'ECONNREFUSED') {
    const message = 'Database connection failed. Please try again later.';
    error = { message, statusCode: 503 };
  }

  if (err.name === 'MongoNetworkError') {
    const message = 'Database network error. Please try again later.';
    error = { message, statusCode: 503 };
  }

  if (err.name === 'MongoTimeoutError') {
    const message = 'Database operation timed out. Please try again.';
    error = { message, statusCode: 408 };
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    let message = 'Duplicate field value entered';
    
    // Extract field name from error
    const field = Object.keys(err.keyValue)[0];
    if (field === 'email') {
      message = 'Email already exists';
    } else if (field === 'phone') {
      message = 'Phone number already exists';
    } else if (field === 'username') {
      message = 'Username already exists';
    }
    
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, statusCode: 400 };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { message, statusCode: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { message, statusCode: 401 };
  }

  // Multer errors (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    const message = 'File too large';
    error = { message, statusCode: 400 };
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    const message = 'Too many files';
    error = { message, statusCode: 400 };
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    const message = 'Unexpected file field';
    error = { message, statusCode: 400 };
  }

  // Cloudinary errors
  if (err.http_code) {
    const message = 'Image upload failed';
    error = { message, statusCode: 400 };
  }

  // Rate limiting errors
  if (err.status === 429) {
    const message = 'Too many requests, please try again later';
    error = { message, statusCode: 429 };
  }

  // Syntax errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    const message = 'Invalid JSON format';
    error = { message, statusCode: 400 };
  }

  // Permission errors
  if (err.name === 'PermissionError') {
    const message = 'You do not have permission to perform this action';
    error = { message, statusCode: 403 };
  }

  // Custom application errors
  if (err.name === 'ApplicationError') {
    error = { message: err.message, statusCode: err.statusCode || 400 };
  }

  // Default to 500 server error
  const statusCode = error.statusCode || res.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      details: err 
    }),
    requestId: req.headers['x-request-id'] || 'unknown'
  });
};

/**
 * Async error handler wrapper
 * Wraps async functions to catch errors and pass them to error handler
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Custom error classes
 */
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ErrorResponse';
  }
}

class ApplicationError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApplicationError';
  }
}

class PermissionError extends Error {
  constructor(message = 'You do not have permission to perform this action') {
    super(message);
    this.statusCode = 403;
    this.name = 'PermissionError';
  }
}

class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message);
    this.statusCode = 404;
    this.name = 'NotFoundError';
  }
}

/**
 * Request ID middleware for tracking requests
 */
const requestIdMiddleware = (req, res, next) => {
  req.headers['x-request-id'] = req.headers['x-request-id'] || 
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  next();
};

module.exports = {
  notFound,
  errorHandler,
  asyncHandler,
  ErrorResponse,
  ApplicationError,
  PermissionError,
  NotFoundError,
  requestIdMiddleware
}; 