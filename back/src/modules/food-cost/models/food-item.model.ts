// src/models/FoodItem.ts
import mongoose from 'mongoose';
import { EmployeeRole } from '../interfaces/employee.interface';
import { FoodItem } from '../interfaces/food-item.interface';


const FoodItemSchema = new mongoose.Schema<FoodItem>({
    name: { type: String, required: true },
    ingredients: [{
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, required: true },
      localCostPerUnit: { type: Number, required: true },
      sourcedFrom: { type: String }
    }],
    requiredEmployees: [{
      role: { type: String, enum: Object.values(EmployeeRole), required: true },
      estimatedHours: { type: Number, required: true }
    }],
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    laborCostPerHour: { type: Number, default: 0 },
    preparationTime: { type: Number, default: 0 },
    overheadCostPercentage: { type: Number, default: 10 },
    basePrice: { type: Number, required: true },
    finalPrice: { type: Number },
    profitMargin: { type: Number }
  });
  
  export const FoodItemModel = mongoose.model<FoodItem>('FoodItem', FoodItemSchema);
  
