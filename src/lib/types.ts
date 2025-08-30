


export type CustomizationOptionChoice = {
  name: string;
  priceModifier: number;
  imageUrl?: string;
};

export type CustomizationOption = {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  choices: CustomizationOptionChoice[];
};

export type MenuItemType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Burgers' | 'Pizzas' | 'Sides' | 'Drinks' | 'Breakfast' | 'Snacks' | 'Coffee';
  'data-ai-hint'?: string;
  customizationOptions?: CustomizationOption[];
};

export type CartItemType = {
  id: string; // Will be a composite key like `productId-option1-option2`
  productId: string;
  name: string;
  price: number; // Base price + modifiers
  image: string;
  quantity: number;
  customizations?: { option: string; choice: string }[];
};

export const mapPizzaSize = {
  20: 'Маленькая',
  30: 'Средняя',
  40: 'Большая',
} as const;

export const mapPizzaType = {
  1: 'традиционная',
  2: 'тонкая',
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
  name,
  value,
}));

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
  name,
  value,
}));

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;
