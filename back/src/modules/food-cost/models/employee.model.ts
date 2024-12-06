import { Employee, EmployeeRole } from "../interfaces/employee.interface";
import mongoose from "mongoose";


const EmployeeSchema = new mongoose.Schema<Employee>({
    name: { type: String, required: true },
    role: { 
      type: String, 
      enum: Object.values(EmployeeRole), 
      required: true 
    },
    hourlyRate: { type: Number, required: true },
    hireDate: { type: Date, default: Date.now },
    specializations: [{ type: String }],
    employmentType: { 
      type: String, 
      enum: ['Full-Time', 'Part-Time', 'Contract'], 
      default: 'Full-Time' 
    }
  });
  
  export const EmployeeModel = mongoose.model<Employee>('Employee', EmployeeSchema);