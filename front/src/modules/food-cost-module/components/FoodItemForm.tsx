import React, { useState } from "react";
import { TextField, Button, Container, Grid, Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useFoodItems } from "../hooks/useFoodItems";
import { FoodItem, Ingredient, RequiredEmployee } from "../types/interfaces";
import { EmployeeRole } from "../types/Enums";

export const FoodItemForm: React.FC = () => {
  const { createFoodItem } = useFoodItems();
  const [foodItem, setFoodItem] = useState<Partial<FoodItem>>({
    name: "",
    ingredients: [{ name: "", quantity: 0, unit: "", localCostPerUnit: 0 }],
    requiredEmployees: [{ role: EmployeeRole.PREP_COOK, estimatedHours: 0 }],
    laborCostPerHour: 0,
    preparationTime: 0,
    overheadCostPercentage: 0,
    basePrice: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createFoodItem(foodItem);
    // Reset form or show success message
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    const newIngredients = [...(foodItem.ingredients || [])];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setFoodItem((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const updateEmployee = (index: number, field: keyof RequiredEmployee, value: EmployeeRole | number) => {
    const newEmployees = [...(foodItem.requiredEmployees || [])];
    newEmployees[index] = { ...newEmployees[index], [field]: value };
    setFoodItem((prev) => ({ ...prev, requiredEmployees: newEmployees }));
  };

  const addIngredient = () => {
    setFoodItem((prev) => ({
      ...prev,
      ingredients: [...(prev.ingredients || []), { name: "", quantity: 0, unit: "", localCostPerUnit: 0 }],
    }));
  };

  const addEmployee = () => {
    setFoodItem((prev) => ({
      ...prev,
      requiredEmployees: [...(prev.requiredEmployees || []), { role: EmployeeRole.PREP_COOK, estimatedHours: 0 }],
    }));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Create Food Item</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Food Item Name"
              value={foodItem.name}
              onChange={(e) => setFoodItem((prev) => ({ ...prev, name: e.target.value }))}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Ingredients</Typography>
          </Grid>
          {foodItem.ingredients?.map((ingredient, index) => (
            <React.Fragment key={index}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Ingredient Name"
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(index, "name", e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="number"
                  label="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => updateIngredient(index, "quantity", parseFloat(e.target.value))}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Unit"
                  value={ingredient.unit}
                  onChange={(e) => updateIngredient(index, "unit", e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="number"
                  label="Cost per Unit"
                  value={ingredient.localCostPerUnit}
                  onChange={(e) => updateIngredient(index, "localCostPerUnit", parseFloat(e.target.value))}
                />
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button onClick={addIngredient}>Add Ingredient</Button>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Required Employees</Typography>
          </Grid>
          {foodItem.requiredEmployees?.map((employee, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Employee Role</InputLabel>
                  <Select
                    value={employee.role}
                    onChange={(e) => updateEmployee(index, "role", e.target.value as EmployeeRole)}
                  >
                    {Object.values(EmployeeRole).map((role) => (
                      <MenuItem key={role} value={role}>{role}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Estimated Hours"
                  value={employee.estimatedHours}
                  onChange={(e) => updateEmployee(index, "estimatedHours", parseFloat(e.target.value))}
                />
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button onClick={addEmployee}>Add Employee</Button>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Labor Cost per Hour"
              value={foodItem.laborCostPerHour}
              onChange={(e) => setFoodItem((prev) => ({ ...prev, laborCostPerHour: parseFloat(e.target.value) }))}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Preparation Time (minutes)"
              value={foodItem.preparationTime}
              onChange={(e) => setFoodItem((prev) => ({ ...prev, preparationTime: parseFloat(e.target.value) }))}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Overhead Cost Percentage"
              value={foodItem.overheadCostPercentage}
              onChange={(e) => setFoodItem((prev) => ({ ...prev, overheadCostPercentage: parseFloat(e.target.value) }))}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Base Price"
              value={foodItem.basePrice}
              onChange={(e) => setFoodItem((prev) => ({ ...prev, basePrice: parseFloat(e.target.value) }))}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Create Food Item
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};