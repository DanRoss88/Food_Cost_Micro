import { LocationModel } from '../models/location.model'; 
import OpenAI from 'openai';


export class IngredientPricingService {
    private openai: OpenAI;
  
    constructor(apiKey: string) {
      this.openai = new OpenAI({ apiKey });
    }
  
    /**
     * Fetches the current market price for an ingredient based on location.
     * @param ingredientName - The name of the ingredient.
     * @param locationId - The location ID (to fetch country and currency).
     * @returns The average price per unit of the ingredient, adjusted for location.
     */
    async getIngredientPrice(ingredientName: string, locationId: string): Promise<number> {
      try {
        // Fetch the location data from the LocationModel
        const location = await LocationModel.findById(locationId).exec();
  
        if (!location) {
          console.error('Location not found');
          return 0;
        }
  
        // Prepare the location-specific details (country and currency)
        const { country, currency } = location;
  
        // Construct the OpenAI prompt, including the country and currency for accurate pricing
        const response = await this.openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant that provides current market prices for food ingredients. Prices vary based on location, so be sure to consider the country and currency for accurate price estimates.'
            },
            {
              role: 'user',
              content: `What is the current average price per unit for ${ingredientName} in ${country} (currency: ${currency})?`
            }
          ]
        });
  
        // Parse the price from the response, remove any non-numeric characters
        const priceText = response.choices[0]?.message.content || '';
        const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ''));
  
        return price || 0; // Return the price or 0 if it couldn't be parsed
      } catch (error) {
        console.error('Error fetching ingredient price:', error);
        return 0;
      }
    }
  }