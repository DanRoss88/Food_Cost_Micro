import { EmployeeRole } from './Enums';

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  localCostPerUnit: number;
  sourcedFrom?: string;
}

export interface FoodItem {
  id?: string;
  name: string;
  ingredients: Ingredient[];
  requiredEmployees: RequiredEmployee[];
  location: Location;
  laborCostPerHour: number; // Average hourly labor cost
  preparationTime: number; // Time in minutes
  overheadCostPercentage: number; // Overhead percentage (e.g., 10%)
  basePrice: number; // Price before overhead and profit
  finalPrice?: number; // Final price after overhead and profit
  profitMargin?: number; // Profit margin as a percentage
}

export interface RequiredEmployee {
  id? : string;
  role: EmployeeRole;
  estimatedHours: number;
}

export interface Employee {
  id?: string;
  name: string;
  role: EmployeeRole;
  hourlyRate: number;
  hireDate: Date;
  specializations?: string[];
  employmentType: "Full-Time" | "Part-Time" | "Contract";
}
