import { FoodItem } from "../interfaces/food-item.interface";

export class CostCalculationService {
    /**
     * Calculates the total cost of a FoodItem, including ingredients, labor, and overhead.
     * @param item - The FoodItem to calculate costs for.
     * @param profitMargin - Optional custom profit margin percentage.
     * @returns An object containing detailed breakdowns of costs and the final selling price.
     */
    static calculateCosts(
      item: FoodItem,
      profitMargin: number = 20 // Default profit margin to 20% if not provided
    ): {
      ingredientCost: number;
      laborCost: number;
      overheadCost: number;
      totalCost: number;
      finalPrice: number;
    } {
      // Calculate ingredient costs
      const ingredientCost = item.ingredients.reduce(
        (total, ingredient) => total + ingredient.quantity * ingredient.localCostPerUnit,
        0
      );
  
      // Calculate labor costs
      const laborCost = item.requiredEmployees.reduce(
        (total, employee) => total + employee.estimatedHours * item.laborCostPerHour,
        0
      );
  
      // Calculate overhead cost
      const overheadCost = (ingredientCost + laborCost) * (item.overheadCostPercentage / 100);
  
      // Total cost calculation
      const totalCost = ingredientCost + laborCost + overheadCost;
  
      // Final price with profit margin
      const finalPrice = totalCost * (1 + profitMargin / 100);
  
      return {
        ingredientCost,
        laborCost,
        overheadCost,
        totalCost,
        finalPrice,
      };
    }
  
    /**
     * Calculates the profit margin given a selling price.
     * @param item - The FoodItem to calculate the profit margin for.
     * @param sellingPrice - Optional custom selling price. Defaults to the FoodItem's selling price.
     * @returns The profit margin as a percentage.
     */
    static calculateProfitMargin(item: FoodItem, sellingPrice?: number): number {
      const totalCost = this.calculateCosts(item).totalCost;
      const price = sellingPrice || item.finalPrice || 0;
      if (price === 0) return 0; // Avoid division by zero
      return ((price - totalCost) / price) * 100;
    }
  }
  