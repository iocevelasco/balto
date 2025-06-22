const { z } = require('zod');

// Common validation patterns
const emailSchema = z.string()
  .email('Invalid email format')
  .min(1, 'Email is required');

const passwordSchema = z.string()
  .min(6, 'Password must be at least 6 characters')
  .max(128, 'Password cannot exceed 128 characters');

const phoneSchema = z.string()
  .regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format')
  .optional();

const nameSchema = z.string()
  .min(1, 'Name is required')
  .max(50, 'Name cannot exceed 50 characters')
  .trim();

// User registration validation
const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  role: z.enum(['user', 'shelter'], {
    errorMap: () => ({ message: 'Role must be either user or shelter' })
  }).default('user'),
  phone: phoneSchema,
  address: z.object({
    street: z.string().max(100).optional(),
    city: z.string().max(50).optional(),
    state: z.string().max(50).optional(),
    zipCode: z.string().max(10).optional(),
    country: z.string().max(50).default('US').optional(),
    coordinates: z.object({
      latitude: z.number().min(-90).max(90).optional(),
      longitude: z.number().min(-180).max(180).optional()
    }).optional()
  }).optional()
});

// User login validation
const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required')
});

// Profile update validation
const updateProfileSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  phone: phoneSchema,
  address: z.object({
    street: z.string().max(100).optional(),
    city: z.string().max(50).optional(),
    state: z.string().max(50).optional(),
    zipCode: z.string().max(10).optional(),
    country: z.string().max(50).optional(),
    coordinates: z.object({
      latitude: z.number().min(-90).max(90).optional(),
      longitude: z.number().min(-180).max(180).optional()
    }).optional()
  }).optional(),
  preferences: z.object({
    petTypes: z.array(z.enum(['dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish', 'reptile', 'other'])).optional(),
    maxDistance: z.number().min(1).max(500).optional(),
    notifications: z.object({
      email: z.boolean().optional(),
      push: z.boolean().optional()
    }).optional()
  }).optional()
}).partial();

// Password change validation
const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
  confirmPassword: z.string().min(1, 'Password confirmation is required')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Forgot password validation
const forgotPasswordSchema = z.object({
  email: emailSchema
});

// Reset password validation
const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Password confirmation is required')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Email verification validation
const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required')
});

// User search/filter validation
const userSearchSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).default('10'),
  role: z.enum(['user', 'shelter', 'admin']).optional(),
  isActive: z.string().transform(val => val === 'true').optional(),
  isVerified: z.string().transform(val => val === 'true').optional(),
  search: z.string().max(100).optional()
});

// Validation middleware factory
const validateSchema = (schema) => {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.body);
      req.validatedData = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors
        });
      }
      next(error);
    }
  };
};

// Query validation middleware
const validateQuery = (schema) => {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.query);
      req.validatedQuery = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        
        return res.status(400).json({
          success: false,
          message: 'Query validation failed',
          errors
        });
      }
      next(error);
    }
  };
};

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  userSearchSchema,
  validateSchema,
  validateQuery
}; 