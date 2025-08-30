export type MenuItemType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Burgers' | 'Pizzas' | 'Sides' | 'Drinks';
  'data-ai-hint'?: string;
};

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};
