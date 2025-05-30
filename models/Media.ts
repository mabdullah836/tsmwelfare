import mongoose from 'mongoose'

const mediaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ['image', 'video'], required: true },
  url: { type: String, required: true },
  size: String,
  publicId: String,
  createdAt: { type: Date, default: Date.now }
})

const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema)

export default Media 