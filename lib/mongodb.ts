import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;

let cachedConnection: mongoose.Connection | null = null;

export async function dbConnect(): Promise<mongoose.Connection> {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI);
    cachedConnection = connection.connection;
    
    // Handle connection errors after initial connect
    connection.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
      cachedConnection = null;
    });
    
    connection.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      cachedConnection = null;
    });

    return connection.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function withDbConnection<T>(operation: () => Promise<T>): Promise<T> {
  try {
    await dbConnect();
    return await operation();
  } catch (error) {
    console.error('Database operation failed:', error);
    throw error;
  }
}