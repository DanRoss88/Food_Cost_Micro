import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URI: process.env.DATABASE_URI || " ",
  JWT_SECRET: process.env.JWT_SECRET || 'default-secret',
  LOGGING_LEVEL: process.env.LOGGING_LEVEL || 'info'
};