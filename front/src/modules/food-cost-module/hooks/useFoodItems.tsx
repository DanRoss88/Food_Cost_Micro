import { useState, useEffect, useCallback } from 'react';
import { FoodItem } from '../types/interfaces';
import { FoodItemAPI } from '../api/food-item.api';

export const useFoodItems = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFoodItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const items = await FoodItemAPI.getAllFoodItems();
      setFoodItems(items);
      setError(null);
    } catch (err) {
      setError('Failed to fetch food items');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createFoodItem = useCallback(async (foodItem: Partial<FoodItem>) => {
    setIsLoading(true);
    try {
      const newItem = await FoodItemAPI.createFoodItem(foodItem);
      setFoodItems(prev => [...prev, newItem]);
      setError(null);
      return newItem;
    } catch (err) {
      setError('Failed to create food item');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateFoodItem = useCallback(async (id: string, foodItem: Partial<FoodItem>) => {
    setIsLoading(true);
    try {
      const updatedItem = await FoodItemAPI.updateFoodItem(id, foodItem);
      setFoodItems(prev => 
        prev.map(item => item.id === id ? updatedItem : item)
      );
      setError(null);
      return updatedItem;
    } catch (err) {
      setError('Failed to update food item');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteFoodItem = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await FoodItemAPI.deleteFoodItem(id);
      setFoodItems(prev => prev.filter(item => item.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete food item');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFoodItems();
  }, [fetchFoodItems]);

  return {
    foodItems,
    isLoading,
    error,
    fetchFoodItems,
    createFoodItem,
    updateFoodItem,
    deleteFoodItem
  };
};