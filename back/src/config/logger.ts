// src/config/logger.ts
import winston from 'winston';
import { ENV } from './env';

export const Logger = winston.createLogger({
  level: ENV.LOGGING_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});