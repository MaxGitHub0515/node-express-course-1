

import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB(uri) {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, // disables mongoose buffering
    }).then((mongooseInstance) => {
      console.log('MongoDB connected');
      return mongooseInstance;
    }).catch((err) => {
      console.error('MongoDB connection error:', err);
      throw err; // propagate the error so caller can handle it
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
