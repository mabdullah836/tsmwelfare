import mongoose from 'mongoose'

const mediaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: false,
    default: '',
  },
  size: {
    type: String,
    required: true,
  },
  folder: {
    type: String,
    enum: ['events', 'team-members', 'general', 'applications', 'thumbnails'],
    default: 'general',
  },
  thumbnail: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true,
})

export default mongoose.models.Media || mongoose.model('Media', mediaSchema) 