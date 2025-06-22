const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Adoption:
 *       type: object
 *       required:
 *         - pet
 *         - adopter
 *         - shelter
 *       properties:
 *         _id:
 *           type: string
 *           description: Adoption ID
 *         pet:
 *           type: string
 *           description: Pet ID
 *         adopter:
 *           type: string
 *           description: Adopter user ID
 *         shelter:
 *           type: string
 *           description: Shelter user ID
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected, completed, cancelled]
 *           description: Current adoption status
 *         applicationData:
 *           type: object
 *           properties:
 *             experience:
 *               type: string
 *             livingSpace:
 *               type: string
 *             otherPets:
 *               type: string
 *             workSchedule:
 *               type: string
 *             reason:
 *               type: string
 *         statusHistory:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               note:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *         meetingScheduled:
 *           type: object
 *           properties:
 *             date:
 *               type: string
 *               format: date-time
 *             location:
 *               type: string
 *             notes:
 *               type: string
 *         adoptionFee:
 *           type: number
 *         paymentStatus:
 *           type: string
 *           enum: [pending, paid, refunded]
 *         documents:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string
 *               uploadedAt:
 *                 type: string
 *                 format: date-time
 *         notes:
 *           type: string
 *         completedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const adoptionSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: [true, 'Pet is required']
  },
  adopter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Adopter is required']
  },
  shelter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Shelter is required']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  applicationData: {
    experience: {
      type: String,
      required: [true, 'Pet experience is required'],
      trim: true,
      maxlength: [1000, 'Experience description cannot exceed 1000 characters']
    },
    livingSpace: {
      type: String,
      required: [true, 'Living space information is required'],
      enum: ['apartment', 'house', 'farm', 'other'],
      lowercase: true
    },
    hasYard: {
      type: Boolean,
      default: false
    },
    otherPets: {
      type: String,
      trim: true,
      maxlength: [500, 'Other pets description cannot exceed 500 characters']
    },
    workSchedule: {
      type: String,
      required: [true, 'Work schedule is required'],
      trim: true,
      maxlength: [500, 'Work schedule cannot exceed 500 characters']
    },
    reason: {
      type: String,
      required: [true, 'Reason for adoption is required'],
      trim: true,
      maxlength: [1000, 'Reason cannot exceed 1000 characters']
    },
    emergencyContact: {
      name: { type: String, trim: true },
      phone: { type: String, trim: true },
      relationship: { type: String, trim: true }
    },
    veterinarian: {
      name: { type: String, trim: true },
      phone: { type: String, trim: true },
      address: { type: String, trim: true }
    }
  },
  statusHistory: [{
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    note: {
      type: String,
      trim: true,
      maxlength: [500, 'Status note cannot exceed 500 characters']
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }],
  meetingScheduled: {
    date: Date,
    location: {
      type: String,
      trim: true
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Meeting notes cannot exceed 500 characters']
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  adoptionFee: {
    type: Number,
    min: 0,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentDetails: {
    transactionId: String,
    paymentMethod: String,
    paidAt: Date
  },
  documents: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true
    },
    publicId: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  homeVisit: {
    scheduled: { type: Boolean, default: false },
    date: Date,
    completed: { type: Boolean, default: false },
    notes: String,
    approved: Boolean
  },
  references: [{
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    relationship: { type: String, trim: true },
    contacted: { type: Boolean, default: false },
    notes: String
  }],
  notes: {
    type: String,
    trim: true,
    maxlength: [2000, 'Notes cannot exceed 2000 characters']
  },
  completedAt: Date,
  followUpDate: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for current status info
adoptionSchema.virtual('currentStatusInfo').get(function() {
  return this.statusHistory[this.statusHistory.length - 1];
});

// Virtual for days since application
adoptionSchema.virtual('daysSinceApplication').get(function() {
  const now = new Date();
  const created = new Date(this.createdAt);
  const diffTime = Math.abs(now - created);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Index for efficient queries
adoptionSchema.index({ pet: 1, status: 1 });
adoptionSchema.index({ adopter: 1, status: 1 });
adoptionSchema.index({ shelter: 1, status: 1 });
adoptionSchema.index({ createdAt: -1 });

// Pre-save middleware to add status to history
adoptionSchema.pre('save', function(next) {
  if (this.isModified('status') && !this.isNew) {
    this.statusHistory.push({
      status: this.status,
      date: new Date(),
      updatedBy: this._updatedBy || this.shelter
    });
  } else if (this.isNew) {
    this.statusHistory.push({
      status: this.status,
      date: new Date(),
      updatedBy: this.adopter
    });
  }
  next();
});

// Method to update status with note
adoptionSchema.methods.updateStatus = function(newStatus, note, updatedBy) {
  this.status = newStatus;
  this._updatedBy = updatedBy;
  
  if (newStatus === 'completed') {
    this.completedAt = new Date();
  }
  
  return this.save();
};

// Method to schedule meeting
adoptionSchema.methods.scheduleMeeting = function(date, location, notes) {
  this.meetingScheduled = {
    date,
    location,
    notes,
    completed: false
  };
  return this.save();
};

// Static method to get adoption statistics
adoptionSchema.statics.getStatistics = function(shelterId) {
  return this.aggregate([
    ...(shelterId ? [{ $match: { shelter: mongoose.Types.ObjectId(shelterId) } }] : []),
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
};

module.exports = mongoose.model('Adoption', adoptionSchema); 