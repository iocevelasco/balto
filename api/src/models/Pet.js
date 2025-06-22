const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - breed
 *         - age
 *         - gender
 *         - size
 *         - shelter
 *       properties:
 *         _id:
 *           type: string
 *           description: Pet ID
 *         name:
 *           type: string
 *           description: Pet name
 *         type:
 *           type: string
 *           enum: [dog, cat, bird, rabbit, hamster, fish, reptile, other]
 *           description: Type of pet
 *         breed:
 *           type: string
 *           description: Pet breed
 *         age:
 *           type: object
 *           properties:
 *             years:
 *               type: number
 *             months:
 *               type: number
 *         gender:
 *           type: string
 *           enum: [male, female, unknown]
 *         size:
 *           type: string
 *           enum: [small, medium, large, extra-large]
 *         weight:
 *           type: number
 *           description: Weight in pounds
 *         color:
 *           type: array
 *           items:
 *             type: string
 *         description:
 *           type: string
 *           description: Detailed description of the pet
 *         personality:
 *           type: array
 *           items:
 *             type: string
 *         goodWith:
 *           type: object
 *           properties:
 *             children:
 *               type: boolean
 *             dogs:
 *               type: boolean
 *             cats:
 *               type: boolean
 *         healthInfo:
 *           type: object
 *           properties:
 *             vaccinated:
 *               type: boolean
 *             spayedNeutered:
 *               type: boolean
 *             microchipped:
 *               type: boolean
 *             specialNeeds:
 *               type: string
 *             medications:
 *               type: array
 *               items:
 *                 type: string
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               publicId:
 *                 type: string
 *               isPrimary:
 *                 type: boolean
 *         shelter:
 *           type: string
 *           description: Shelter ID
 *         status:
 *           type: string
 *           enum: [available, pending, adopted, unavailable]
 *         adoptionFee:
 *           type: number
 *         location:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             zipCode:
 *               type: string
 *             coordinates:
 *               type: object
 *               properties:
 *                 latitude:
 *                   type: number
 *                 longitude:
 *                   type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pet name is required'],
    trim: true,
    maxlength: [50, 'Pet name cannot exceed 50 characters']
  },
  type: {
    type: String,
    required: [true, 'Pet type is required'],
    enum: ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish', 'reptile', 'other'],
    lowercase: true
  },
  breed: {
    type: String,
    required: [true, 'Pet breed is required'],
    trim: true,
    maxlength: [100, 'Breed cannot exceed 100 characters']
  },
  age: {
    years: {
      type: Number,
      min: 0,
      max: 30,
      default: 0
    },
    months: {
      type: Number,
      min: 0,
      max: 11,
      default: 0
    }
  },
  gender: {
    type: String,
    required: [true, 'Pet gender is required'],
    enum: ['male', 'female', 'unknown'],
    lowercase: true
  },
  size: {
    type: String,
    required: [true, 'Pet size is required'],
    enum: ['small', 'medium', 'large', 'extra-large'],
    lowercase: true
  },
  weight: {
    type: Number,
    min: 0,
    max: 300
  },
  color: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  description: {
    type: String,
    required: [true, 'Pet description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  personality: [{
    type: String,
    enum: [
      'friendly', 'energetic', 'calm', 'playful', 'gentle', 'independent',
      'social', 'quiet', 'active', 'cuddly', 'protective', 'intelligent',
      'loyal', 'curious', 'affectionate', 'shy', 'confident', 'patient'
    ]
  }],
  goodWith: {
    children: { type: Boolean, default: false },
    dogs: { type: Boolean, default: false },
    cats: { type: Boolean, default: false }
  },
  healthInfo: {
    vaccinated: { type: Boolean, default: false },
    spayedNeutered: { type: Boolean, default: false },
    microchipped: { type: Boolean, default: false },
    specialNeeds: {
      type: String,
      trim: true,
      maxlength: [500, 'Special needs description cannot exceed 500 characters']
    },
    medications: [{
      type: String,
      trim: true
    }],
    lastVetVisit: Date
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    },
    caption: String
  }],
  shelter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Shelter is required']
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'adopted', 'unavailable'],
    default: 'available'
  },
  adoptionFee: {
    type: Number,
    min: 0,
    max: 10000,
    default: 0
  },
  location: {
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number }
    }
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for age in human readable format
petSchema.virtual('ageString').get(function() {
  const years = this.age.years || 0;
  const months = this.age.months || 0;
  
  if (years === 0 && months === 0) return 'Less than 1 month';
  if (years === 0) return `${months} month${months > 1 ? 's' : ''}`;
  if (months === 0) return `${years} year${years > 1 ? 's' : ''}`;
  return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
});

// Virtual for primary image
petSchema.virtual('primaryImage').get(function() {
  const primaryImg = this.images.find(img => img.isPrimary);
  return primaryImg || this.images[0] || null;
});

// Index for geospatial queries
petSchema.index({ 'location.coordinates': '2dsphere' });

// Index for search optimization
petSchema.index({ type: 1, status: 1 });
petSchema.index({ shelter: 1, status: 1 });
petSchema.index({ featured: -1, createdAt: -1 });

// Text index for search
petSchema.index({
  name: 'text',
  breed: 'text',
  description: 'text',
  'personality': 'text'
});

// Pre-save middleware to ensure only one primary image
petSchema.pre('save', function(next) {
  if (this.images && this.images.length > 0) {
    const primaryImages = this.images.filter(img => img.isPrimary);
    if (primaryImages.length === 0) {
      this.images[0].isPrimary = true;
    } else if (primaryImages.length > 1) {
      this.images.forEach((img, index) => {
        img.isPrimary = index === 0;
      });
    }
  }
  next();
});

// Method to increment views
petSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

module.exports = mongoose.model('Pet', petSchema); 