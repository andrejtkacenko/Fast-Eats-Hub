'use server';

import { getRecommendations } from '@/ai/flows/ai-powered-recommendations';
import { menuData } from '@/lib/menu-data';

export async function getRecommendationsAction(cartItems: string[]) {
  if (cartItems.length === 0) {
    return [];
  }
  
  try {
    const result = await getRecommendations({ cartItems });
    const recommendedItems = result.recommendations.map(name => {
      return menuData.find(item => item.name.toLowerCase() === name.toLowerCase());
    }).filter(Boolean); // Filter out any undefined items

    return recommendedItems;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
}
