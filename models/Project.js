import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
    trim: true
  },
  client: {
    type: String,
    required: [true, 'client is required'],
    trim: true
  },
  budget: {
    type: Number,
    required: [true, 'budget is required'],
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
})

export default mongoose.model('Project', projectSchema)