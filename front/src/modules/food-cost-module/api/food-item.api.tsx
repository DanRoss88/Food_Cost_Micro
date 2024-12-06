import { axiosInstance } from "../../../config/api";
import { FoodItem } from "../types/interfaces";

export const FoodItemAPI = {
    async getAllFoodItems(): Promise<FoodItem[]> {
      const response = await axiosInstance.get('/food-items');
      return response.data;
    },
  
    async createFoodItem(foodItem: Partial<FoodItem>): Promise<FoodItem> {
      const response = await axiosInstance.post('/food-items', foodItem);
      return response.data;
    },
  
    async updateFoodItem(id: string, foodItem: Partial<FoodItem>): Promise<FoodItem> {
      const response = await axiosInstance.put(`/food-items/${id}`, foodItem);
      return response.data;
    },
  
    async deleteFoodItem(id: string): Promise<void> {
      await axiosInstance.delete(`/food-items/${id}`);
    }
  };
  
  