const { z } = require('zod');

// Pet type enum
const petTypeEnum = z.enum(['dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish', 'reptile', 'other']);

// Pet size enum
const petSizeEnum = z.enum(['small', 'medium', 'large', 'extra-large']);

// Pet gender enum
const petGenderEnum = z.enum(['male', 'female', 'unknown']);

// Pet status enum
const petStatusEnum = z.enum(['available', 'pending', 'adopted', 'unavailable']);

// Personality traits enum
const personalityEnum = z.enum([
  'friendly', 'energetic', 'calm', 'playful', 'gentle', 'independent',
  'social', 'quiet', 'active', 'cuddly', 'protective', 'intelligent',
  'loyal', 'curious', 'affectionate', 'shy', 'confident', 'patient'
]);

// Age validation schema
const ageSchema = z.object({
  years: z.number().min(0).max(30).default(0),
  months: z.number().min(0).max(11).default(0)
});

// Location validation schema
const locationSchema = z.object({
  address: z.string().max(200).optional(),
  city: z.string().max(50).optional(),
  state: z.string().max(50).optional(),
  zipCode: z.string().max(10).optional(),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
  }).optional()
});

// Health info validation schema
const healthInfoSchema = z.object({
  vaccinated: z.boolean().default(false),
  spayedNeutered: z.boolean().default(false),
  microchipped: z.boolean().default(false),
  specialNeeds: z.string().max(500).optional(),
  medications: z.array(z.string().max(100)).optional(),
  lastVetVisit: z.string().datetime().optional()
});

// Good with validation schema
const goodWithSchema = z.object({
  children: z.boolean().default(false),
  dogs: z.boolean().default(false),
  cats: z.boolean().default(false)
});

// Pet creation validation
const createPetSchema = z.object({
  name: z.string()
    .min(1, 'Pet name is required')
    .max(50, 'Pet name cannot exceed 50 characters')
    .trim(),
  type: petTypeEnum,
  breed: z.string()
    .min(1, 'Pet breed is required')
    .max(100, 'Breed cannot exceed 100 characters')
    .trim(),
  age: ageSchema,
  gender: petGenderEnum,
  size: petSizeEnum,
  weight: z.number().min(0).max(300).optional(),
  color: z.array(z.string().max(30)).min(1, 'At least one color is required'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description cannot exceed 2000 characters')
    .trim(),
  personality: z.array(personalityEnum).optional(),
  goodWith: goodWithSchema.optional(),
  healthInfo: healthInfoSchema.optional(),
  adoptionFee: z.number().min(0).max(10000).default(0),
  location: locationSchema.optional(),
  featured: z.boolean().default(false)
});

// Pet update validation (all fields optional except required ones)
const updatePetSchema = createPetSchema.partial().extend({
  status: petStatusEnum.optional()
});

// Pet search/filter validation
const petSearchSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).default('12'),
  type: petTypeEnum.optional(),
  breed: z.string().max(100).optional(),
  size: petSizeEnum.optional(),
  gender: petGenderEnum.optional(),
  status: petStatusEnum.optional(),
  minAge: z.string().regex(/^\d+$/).transform(Number).optional(),
  maxAge: z.string().regex(/^\d+$/).transform(Number).optional(),
  goodWithChildren: z.string().transform(val => val === 'true').optional(),
  goodWithDogs: z.string().transform(val => val === 'true').optional(),
  goodWithCats: z.string().transform(val => val === 'true').optional(),
  vaccinated: z.string().transform(val => val === 'true').optional(),
  spayedNeutered: z.string().transform(val => val === 'true').optional(),
  microchipped: z.string().transform(val => val === 'true').optional(),
  maxFee: z.string().regex(/^\d+$/).transform(Number).optional(),
  personality: z.string().optional(), // Will be split into array
  search: z.string().max(100).optional(),
  featured: z.string().transform(val => val === 'true').optional(),
  shelter: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(), // MongoDB ObjectId
  // Location-based search
  latitude: z.string().regex(/^-?\d+\.?\d*$/).transform(Number).optional(),
  longitude: z.string().regex(/^-?\d+\.?\d*$/).transform(Number).optional(),
  radius: z.string().regex(/^\d+$/).transform(Number).default('50'), // km
  // Sorting
  sortBy: z.enum(['createdAt', 'name', 'age', 'adoptionFee', 'views']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

// Pet image update validation
const updatePetImagesSchema = z.object({
  imagesToRemove: z.array(z.string()).optional(), // Array of image public IDs to remove
  primaryImageId: z.string().optional() // Public ID of image to set as primary
});

// Pet status update validation
const updatePetStatusSchema = z.object({
  status: petStatusEnum,
  reason: z.string().max(500).optional()
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
      
      // Process personality array if provided
      if (validated.personality) {
        validated.personality = validated.personality.split(',').map(p => p.trim());
      }
      
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

// Pet ID validation middleware
const validatePetId = (req, res, next) => {
  const petId = req.params.id || req.params.petId;
  
  if (!petId || !/^[0-9a-fA-F]{24}$/.test(petId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid pet ID format'
    });
  }
  
  next();
};

module.exports = {
  createPetSchema,
  updatePetSchema,
  petSearchSchema,
  updatePetImagesSchema,
  updatePetStatusSchema,
  validateSchema,
  validateQuery,
  validatePetId,
  // Export enums for use in other files
  petTypeEnum,
  petSizeEnum,
  petGenderEnum,
  petStatusEnum,
  personalityEnum
}; 