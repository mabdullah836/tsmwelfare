import mongoose from 'mongoose'

const teamMemberSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    required: true 
  },
  bio: { 
    type: String, 
    required: true 
  },
  imageUrl: { 
    type: String 
  },
  order: { 
    type: Number, 
    required: true 
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
teamMemberSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

const Team = mongoose.models.Team || mongoose.model('Team', teamMemberSchema)

export default Team 