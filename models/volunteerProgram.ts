import { Schema } from 'mongoose';

const VolunteerProgramSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  requirements: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  maxVolunteers: {
    type: Number,
    min: 1
  },
  location: {
    type: String,
    trim: true
  },
  currentVolunteers: [{
    volunteer: {
      type: Schema.Types.ObjectId,
      ref: 'Volunteer'
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'withdrawn'],
      default: 'active'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Add validation to ensure endDate is after startDate
VolunteerProgramSchema.pre('save', function(next) {
  if (this.startDate && this.endDate && this.startDate > this.endDate) {
    next(new Error('End date must be after start date'));
  }
  next();
});

export { VolunteerProgramSchema }; 