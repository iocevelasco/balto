const { ZodError } = require('zod');

/**
 * Validate request data against a Zod schema
 * @param {Object} schema - Zod schema
 * @param {Object} data - Data to validate
 * @returns {Object} - Validated data
 * @throws {Error} - Validation error
 */
const validateRequest = (schema, data) => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = new Error('Validation failed');
      validationError.statusCode = 400;
      validationError.details = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      throw validationError;
    }
    throw error;
  }
};

/**
 * Format validation errors for API response
 * @param {Array} errors - Array of validation errors
 * @returns {Object} - Formatted error response
 */
const formatValidationErrors = (errors) => {
  const formattedErrors = {};
  
  errors.forEach(error => {
    const field = error.field || 'general';
    if (!formattedErrors[field]) {
      formattedErrors[field] = [];
    }
    formattedErrors[field].push(error.message);
  });

  return {
    success: false,
    message: 'Validation failed',
    errors: formattedErrors
  };
};

/**
 * Sanitize user input
 * @param {String} input - Input string to sanitize
 * @returns {String} - Sanitized string
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

/**
 * Validate MongoDB ObjectId
 * @param {String} id - ID to validate
 * @returns {Boolean} - True if valid ObjectId
 */
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

/**
 * Build MongoDB filter from query parameters
 * @param {Object} query - Query parameters
 * @param {Array} allowedFields - Allowed filter fields
 * @returns {Object} - MongoDB filter object
 */
const buildFilter = (query, allowedFields) => {
  const filter = {};
  
  allowedFields.forEach(field => {
    if (query[field] !== undefined && query[field] !== '') {
      if (field.includes('Date')) {
        // Handle date fields
        filter[field] = new Date(query[field]);
      } else if (typeof query[field] === 'string' && query[field].includes(',')) {
        // Handle comma-separated values
        filter[field] = { $in: query[field].split(',').map(v => v.trim()) };
      } else {
        filter[field] = query[field];
      }
    }
  });

  return filter;
};

/**
 * Build MongoDB sort object from query parameters
 * @param {String} sortBy - Field to sort by
 * @param {String} sortOrder - Sort order (asc/desc)
 * @param {Array} allowedFields - Allowed sort fields
 * @returns {Object} - MongoDB sort object
 */
const buildSort = (sortBy = 'createdAt', sortOrder = 'desc', allowedFields = []) => {
  const sort = {};
  
  if (allowedFields.length === 0 || allowedFields.includes(sortBy)) {
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
  } else {
    sort.createdAt = -1; // Default sort
  }

  return sort;
};

/**
 * Calculate pagination values
 * @param {Number} page - Current page
 * @param {Number} limit - Items per page
 * @param {Number} total - Total items
 * @returns {Object} - Pagination object
 */
const calculatePagination = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  const skip = (page - 1) * limit;
  
  return {
    page,
    limit,
    total,
    totalPages,
    skip,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null
  };
};

module.exports = {
  validateRequest,
  formatValidationErrors,
  sanitizeInput,
  isValidObjectId,
  buildFilter,
  buildSort,
  calculatePagination
}; 