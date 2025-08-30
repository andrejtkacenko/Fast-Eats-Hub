
export type CustomizationOptionChoice = {
  name: string;
  priceModifier: number;
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
  category: 'Burgers' | 'Pizzas' | 'Sides' | 'Drinks';
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
