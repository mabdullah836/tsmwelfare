import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) {
      return mongoose;
    }

    await mongoose.connect(MONGODB_URI);
    return mongoose;
  } catch (error) {
    throw error;
  }
}

export default connectDB; 