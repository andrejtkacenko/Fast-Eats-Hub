'use server';

import { menuData } from '@/lib/menu-data';

export async function getRecommendationsAction(cartItems: string[]) {
  if (cartItems.length === 0) {
    return [];
  }
  
  // This is a placeholder for a real recommendation engine.
  // For now, it returns a few items from the menu that are not in the cart.
  const recommendedItems = menuData.filter(item => !cartItems.find(cartItem => cartItem.toLowerCase() === item.name.toLowerCase()));

  return recommendedItems.slice(0, 2);
}
