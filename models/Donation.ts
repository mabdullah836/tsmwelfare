import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  donor: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  project: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'bank', 'online', 'other'],
    default: 'other',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Donation || mongoose.model('Donation', donationSchema); 