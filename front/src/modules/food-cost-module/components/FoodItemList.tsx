import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Typography,
  Box
} from '@mui/material';
import { useFoodItems } from '../hooks/useFoodItems';
import { FoodItem } from '../types/interfaces';
export const FoodItemList: React.FC = () => {
    const { foodItems, deleteFoodItem, isLoading, error } = useFoodItems();
  
    const calculateTotalCost = (item: FoodItem): number => {
      const ingredientCost = item.ingredients.reduce((sum, ing) => sum + ing.quantity * ing.localCostPerUnit, 0);
      const laborCost = item.requiredEmployees.reduce((sum, emp) => sum + emp.estimatedHours * item.laborCostPerHour, 0);
      const overheadCost = (ingredientCost + laborCost) * (item.overheadCostPercentage / 100);
      return ingredientCost + laborCost + overheadCost;
    };
  
    if (isLoading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;
  
    return (
      <Box>
        <Typography variant="h4" gutterBottom>Food Items</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Base Cost</TableCell>
                <TableCell>Labor Cost</TableCell>
                <TableCell>Overhead Cost</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell>Base Price</TableCell>
                <TableCell>Final Price</TableCell>
                <TableCell>Profit Margin</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foodItems.map((item) => {
                const totalCost = calculateTotalCost(item);
                const profitMargin = item.finalPrice ? ((item.finalPrice - totalCost) / item.finalPrice) * 100 : 0;
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>${(totalCost - (totalCost * (item.overheadCostPercentage / 100))).toFixed(2)}</TableCell>
                    <TableCell>${(item.laborCostPerHour * item.preparationTime / 60).toFixed(2)}</TableCell>
                    <TableCell>${(totalCost * (item.overheadCostPercentage / 100)).toFixed(2)}</TableCell>
                    <TableCell>${totalCost.toFixed(2)}</TableCell>
                    <TableCell>${item.basePrice.toFixed(2)}</TableCell>
                    <TableCell>${item.finalPrice?.toFixed(2) || 'N/A'}</TableCell>
                    <TableCell>{profitMargin.toFixed(2)}%</TableCell>
                    <TableCell>
                      <Button onClick={() => deleteFoodItem(item.id!)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };