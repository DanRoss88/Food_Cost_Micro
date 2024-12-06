import mongoose from 'mongoose';
import { ENV } from './env';
import { Logger } from './logger';

export class DatabaseConnection {
  static async connect(): Promise<typeof mongoose> {
    try {
      return await mongoose.connect(ENV.DATABASE_URI, {
        autoIndex: ENV.NODE_ENV === 'development'
      });
    } catch (error) {
      Logger.error('Database Connection Error', error);
      process.exit(1);
    }
  }

  static async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}