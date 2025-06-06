import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  imageUrl: { 
    type: String 
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
})

// Add a pre-save hook to update the updatedAt field
eventSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema)

export default Event 