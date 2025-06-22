const { z } = require('zod');

// Adoption status enum
const adoptionStatusEnum = z.enum(['pending', 'approved', 'rejected', 'completed', 'cancelled']);

// Living space enum
const livingSpaceEnum = z.enum(['apartment', 'house', 'farm', 'other']);

// Emergency contact schema
const emergencyContactSchema = z.object({
  name: z.string().min(1, 'Emergency contact name is required').max(100),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format'),
  relationship: z.string().min(1, 'Relationship is required').max(50)
});

// Veterinarian schema
const veterinarianSchema = z.object({
  name: z.string().max(100).optional(),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format').optional(),
  address: z.string().max(200).optional()
});

// Reference schema
const referenceSchema = z.object({
  name: z.string().min(1, 'Reference name is required').max(100),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format'),
  relationship: z.string().min(1, 'Relationship is required').max(50)
});

// Adoption application creation validation
const createAdoptionSchema = z.object({
  pet: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid pet ID'),
  applicationData: z.object({
    experience: z.string()
      .min(10, 'Please provide more details about your pet experience')
      .max(1000, 'Experience description cannot exceed 1000 characters'),
    livingSpace: livingSpaceEnum,
    hasYard: z.boolean().default(false),
    otherPets: z.string()
      .max(500, 'Other pets description cannot exceed 500 characters')
      .optional(),
    workSchedule: z.string()
      .min(5, 'Please provide details about your work schedule')
      .max(500, 'Work schedule cannot exceed 500 characters'),
    reason: z.string()
      .min(10, 'Please provide more details about why you want to adopt this pet')
      .max(1000, 'Reason cannot exceed 1000 characters'),
    emergencyContact: emergencyContactSchema,
    veterinarian: veterinarianSchema.optional()
  }),
  references: z.array(referenceSchema).min(1, 'At least one reference is required').max(3)
});

// Adoption status update validation
const updateAdoptionStatusSchema = z.object({
  status: adoptionStatusEnum,
  note: z.string().max(500, 'Note cannot exceed 500 characters').optional(),
  meetingDate: z.string().datetime().optional(),
  meetingLocation: z.string().max(200).optional(),
  meetingNotes: z.string().max(500).optional()
});

// Meeting scheduling validation
const scheduleMeetingSchema = z.object({
  date: z.string().datetime('Invalid date format'),
  location: z.string().min(1, 'Meeting location is required').max(200),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional()
});

// Home visit scheduling validation
const scheduleHomeVisitSchema = z.object({
  date: z.string().datetime('Invalid date format'),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional()
});

// Home visit completion validation
const completeHomeVisitSchema = z.object({
  approved: z.boolean(),
  notes: z.string().max(1000, 'Notes cannot exceed 1000 characters').optional()
});

// Payment update validation
const updatePaymentSchema = z.object({
  paymentStatus: z.enum(['pending', 'paid', 'refunded']),
  transactionId: z.string().optional(),
  paymentMethod: z.string().max(50).optional()
});

// Adoption search/filter validation
const adoptionSearchSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).default('10'),
  status: adoptionStatusEnum.optional(),
  adopter: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  shelter: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  pet: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  paymentStatus: z.enum(['pending', 'paid', 'refunded']).optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'status']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

// Reference contact update validation
const updateReferenceSchema = z.object({
  referenceIndex: z.number().min(0).max(2),
  contacted: z.boolean(),
  notes: z.string().max(500).optional()
});

// Adoption notes update validation
const updateAdoptionNotesSchema = z.object({
  notes: z.string().max(2000, 'Notes cannot exceed 2000 characters')
});

// Follow-up scheduling validation
const scheduleFollowUpSchema = z.object({
  followUpDate: z.string().datetime('Invalid date format')
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

// Adoption ID validation middleware
const validateAdoptionId = (req, res, next) => {
  const adoptionId = req.params.id || req.params.adoptionId;
  
  if (!adoptionId || !/^[0-9a-fA-F]{24}$/.test(adoptionId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid adoption ID format'
    });
  }
  
  next();
};

// Validate that meeting date is in the future
const validateFutureDate = (req, res, next) => {
  const { date } = req.validatedData || req.body;
  
  if (date) {
    const meetingDate = new Date(date);
    const now = new Date();
    
    if (meetingDate <= now) {
      return res.status(400).json({
        success: false,
        message: 'Meeting date must be in the future'
      });
    }
  }
  
  next();
};

module.exports = {
  createAdoptionSchema,
  updateAdoptionStatusSchema,
  scheduleMeetingSchema,
  scheduleHomeVisitSchema,
  completeHomeVisitSchema,
  updatePaymentSchema,
  adoptionSearchSchema,
  updateReferenceSchema,
  updateAdoptionNotesSchema,
  scheduleFollowUpSchema,
  validateSchema,
  validateQuery,
  validateAdoptionId,
  validateFutureDate,
  // Export enums for use in other files
  adoptionStatusEnum,
  livingSpaceEnum
}; 