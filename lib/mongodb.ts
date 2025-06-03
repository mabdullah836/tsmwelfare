import mongoose from 'mongoose';


async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
      );
    }
    
    const MONGODB_URI = process.env.MONGODB_URI;
    console.log(MONGODB_URI);
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