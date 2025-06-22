const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async (retries = 5) => {
  try {
    // Check if already connected
    if (isConnected) {
      console.log('🍃 MongoDB already connected');
      return;
    }

    // Connection options
    const options = {
      // Remove deprecated options
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4 // Use IPv4, skip trying IPv6
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    isConnected = true;
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 MongoDB disconnected');
      isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
      isConnected = true;
    });

    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected');
      isConnected = true;
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🛑 MongoDB connection closed through app termination');
        process.exit(0);
      } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        process.exit(1);
      }
    });

    process.on('SIGTERM', async () => {
      try {
        await mongoose.connection.close();
        console.log('🛑 MongoDB connection closed through SIGTERM');
        process.exit(0);
      } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    isConnected = false;
    
    if (retries > 0) {
      console.log(`🔄 Retrying connection in 5 seconds... (${retries} retries left)`);
      setTimeout(() => connectDB(retries - 1), 5000);
    } else {
      console.error('💥 Max retries reached. Unable to connect to MongoDB.');
      // Don't exit process in development, let the app run without DB
      if (process.env.NODE_ENV === 'production') {
        process.exit(1);
      }
    }
  }
};

// Function to check database connection status
const checkConnection = () => {
  return {
    isConnected,
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host,
    name: mongoose.connection.name
  };
};

// Function to manually reconnect
const reconnect = async () => {
  if (!isConnected) {
    console.log('🔄 Attempting to reconnect to MongoDB...');
    await connectDB();
  }
};

module.exports = { 
  connectDB, 
  checkConnection, 
  reconnect 
}; 