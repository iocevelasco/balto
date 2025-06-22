const mongoose = require('mongoose');
const { ApplicationError } = require('./errorMiddleware');

/**
 * Middleware to check database connection before processing requests
 */
const requireDatabaseConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    throw new ApplicationError('Database connection is not available. Please try again later.', 503);
  }
  next();
};

/**
 * Middleware to check database connection for write operations
 */
const requireDatabaseForWrite = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    throw new ApplicationError('Database write operations are not available. Please try again later.', 503);
  }
  
  // Additional check for replica set primary
  if (mongoose.connection.db && mongoose.connection.db.serverConfig) {
    const topology = mongoose.connection.db.serverConfig;
    if (topology.isDestroyed()) {
      throw new ApplicationError('Database connection has been destroyed. Please try again later.', 503);
    }
  }
  
  next();
};

/**
 * Middleware that adds database status to response headers
 */
const addDatabaseStatusHeaders = (req, res, next) => {
  res.set('X-Database-Status', mongoose.connection.readyState === 1 ? 'connected' : 'disconnected');
  res.set('X-Database-Host', mongoose.connection.host || 'unknown');
  next();
};

/**
 * Transaction wrapper for database operations
 */
const withTransaction = (operation) => {
  return async (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
      throw new ApplicationError('Database connection is not available for transactions.', 503);
    }

    const session = await mongoose.startSession();
    
    try {
      session.startTransaction();
      
      // Add session to request for use in controllers
      req.dbSession = session;
      
      await operation(req, res, next);
      
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  };
};

/**
 * Graceful degradation middleware for optional database operations
 */
const optionalDatabase = (fallbackResponse = null) => {
  return (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
      if (fallbackResponse) {
        return res.json({
          success: true,
          message: 'Service temporarily unavailable, showing cached/default data',
          data: fallbackResponse,
          cached: true
        });
      } else {
        throw new ApplicationError('This feature is temporarily unavailable. Please try again later.', 503);
      }
    }
    next();
  };
};

module.exports = {
  requireDatabaseConnection,
  requireDatabaseForWrite,
  addDatabaseStatusHeaders,
  withTransaction,
  optionalDatabase
}; 