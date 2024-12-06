import mongoose from 'mongoose';
import { Location } from '../interfaces/location.interface';

const LocationSchema = new mongoose.Schema<Location>({
    country: { type: String, required: true },
    currency: { type: String, required: true },
    taxRate: { type: Number, default: 0 },
    averageWage: { type: Number, default: 0 }
  });
  
  export const LocationModel = mongoose.model<Location>('Location', LocationSchema);