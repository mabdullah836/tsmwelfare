import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const VolunteerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  occupation: {
    type: String,
    required: true,
    trim: true
  },
  availability: {
    type: String,
    required: true,
    enum: ['weekdays', 'weekends', 'evenings', 'flexible']
  },
  interests: [{
    type: String,
    required: true
  }],
  skills: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  motivation: {
    type: String,
    required: true,
    trim: true
  },
  references: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export const VolunteerModel = mongoose.models.Volunteer || mongoose.model('Volunteer', VolunteerSchema);