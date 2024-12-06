import { RequiredEmployee} from './employee.interface';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  localCostPerUnit: number;
  sourcedFrom?: string;
}

export interface FoodItem extends Document {
  name: string;
  ingredients: Ingredient[];
  requiredEmployees: RequiredEmployee[];
  location: mongoose.Types.ObjectId; // Reference to a Location
  laborCostPerHour: number; // Average hourly labor cost
  preparationTime: number; // Time in minutes
  overheadCostPercentage: number; // Overhead percentage (e.g., 10%)
  basePrice: number; // Price before overhead and profit
  finalPrice?: number; // Final price after overhead and profit
  profitMargin?: number; // Profit margin as a percentage
}