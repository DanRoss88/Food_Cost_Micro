export enum EmployeeRole {
  CHEF = "Chef",
  SOUS_CHEF = "Sous Chef",
  LINE_COOK = "Line Cook",
  PREP_COOK = "Prep Cook",
  DISHWASHER = "Dishwasher",
}

export interface RequiredEmployee {
  role: EmployeeRole;
  estimatedHours: number;
}

export interface Employee {
  name: string;
  role: EmployeeRole;
  hourlyRate: number;
  hireDate: Date;
  specializations?: string[];
  employmentType: "Full-Time" | "Part-Time" | "Contract";
}
