import type { MenuItemType } from './types';

export const menuData: MenuItemType[] = [
  {
    id: '1',
    name: 'Classic Cheeseburger',
    description: 'A juicy beef patty with melted cheddar cheese, lettuce, tomato, and our special sauce.',
    price: 9.99,
    image: 'https://picsum.photos/600/400',
    'data-ai-hint': 'cheeseburger classic',
    category: 'Burgers',
    customizationOptions: [
      {
        id: 'extra-patty',
        name: 'Add Extra Patty',
        type: 'single',
        choices: [
          { name: 'No', priceModifier: 0 },
          { name: 'Yes', priceModifier: 2.50 },
        ],
      },
      {
        id: 'extra-cheese',
        name: 'Add Extra Cheese',
        type: 'single',
        choices: [
          { name: 'No', priceModifier: 0 },
          { name: 'Yes', priceModifier: 1.00 },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Bacon Avocado Burger',
    description: 'Topped with crispy bacon, fresh avocado, Swiss cheese, and a zesty aioli.',
    price: 12.99,
    image: 'https://picsum.photos/600/400',
    'data-ai-hint': 'bacon burger',
    category: 'Burgers',
    customizationOptions: [
      {
        id: 'extra-bacon',
        name: 'Add Extra Bacon',
        type: 'single',
        choices: [
          { name: 'No', priceModifier: 0 },
          { name: 'Yes', priceModifier: 1.50 },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Spicy Jalapeño Burger',
    description: 'For those who like it hot! A fiery burger with jalapeños, pepper jack cheese, and chipotle mayo.',
    price: 11.99,
    image: 'https://picsum.photos/600/400',
    'data-ai-hint': 'spicy burger',
    category: 'Burgers',
     customizationOptions: [
      {
        id: 'heat-level',
        name: 'Heat Level',
        type: 'single',
        choices: [
          { name: 'Spicy (Standard)', priceModifier: 0 },
          { name: 'Extra Spicy', priceModifier: 0.50 },
          { name: 'Volcanic', priceModifier: 1.00 },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, San Marzano tomatoes, fresh basil, salt, and extra-virgin olive oil.',
    price: 14.99,
    image: 'https://picsum.photos/600/400',
    'data-ai-hint': 'margherita pizza',
    category: 'Pizzas',
    customizationOptions: [
        {
            id: 'size',
            name: 'Size',
            type: 'single',
            choices: [
                { name: 'Medium (12")', priceModifier: 0 },
                { name: 'Large (16")', priceModifier: 4.00 },
            ],
        },
        {
            id: 'crust',
            name: 'Crust',
            type: 'single',
            choices: [
                { name: 'Classic', priceModifier: 0 },
                { name: 'Cheese-stuffed', priceModifier: 2.50 },
            ],
        },
        {
            id: 'toppings',
            name: 'Extra Toppings',
            type: 'multiple',
            choices: [
                { name: 'Mushrooms', priceModifier: 1.25 },
                { name: 'Olives', priceModifier: 1.25 },
                { name: 'Extra Basil', priceModifier: 1.00 },
            ],
        },
    ],
  },
  {
    id: '5',
    name: 'Pepperoni Pizza',
    description: 'An American classic with a generous amount of pepperoni and mozzarella cheese.',
    price: 16.99,
    image: 'https://picsum.photos/600/400',
    'data-ai-hint': 'pepperoni pizza',
    category: 'Pizzas',
    customizationOptions: [
        {
            id: 'size',
            name: 'Size',
            type: 'single',
            choices: [
                { name: 'Medium (12")', priceModifier: 0 },
                { name: 'Large (16")', priceModifier: 4.00 },
            ],
        },
        {
            id: 'crust',
            name: 'Crust',
            type: 'single',
            choices: [
                { name: 'Classic', priceModifier: 0 },
                { name: 'Cheese-stuffed', priceModifier: 2.50 },
            ],
        },
    ],
  },
  {
    id: '6',
    name: 'BBQ Chicken Pizza',
    description: 'Topped with tangy BBQ sauce, grilled chicken, red onions, and cilantro.',
    price: 18.99,
    image: 'https://picsum.photos/600/400',
    'data-ai-hint': 'bbq pizza',
    category: 'Pizzas',
    customizationOptions: [
        {
            id: 'size',
            name: 'Size',
            type: 'single',
            choices: [
                { name: 'Medium (12")', priceModifier: 0 },
                { name: 'Large (16")', priceModifier: 4.00 },
            ],
        },
        {
            id: 'crust',
            name: 'Crust',
            type: 'single',
            choices: [
                { name: 'Classic', priceModifier: 0 },
                { name: 'Cheese-stuffed', priceModifier: 2.50 },
            ],
        },
    ],
  },
  {
    id: '7',
    name: 'French Fries',
    description: 'Crispy, golden-brown fries salted to perfection. The perfect side for any meal.',
    price: 3.99,
    image: 'https://picsum.photos/600/400',
    'data-ai-hint': 'french fries',
    category: 'Sides',
    customizationOptions: [
        {
            id: 'seasoning',
            name: 'Seasoning',
            type: 'single',
            choices: [
                { name: 'Regular Salt', priceModifier: 0 },
                { name: 'Cajun Spice', priceModifier: 0.50 },
                { name: 'Garlic Parmesan', priceModifier: 0.75 },
            ],
        },
    ],
  },
  {
    id: '8',
    name: 'Onion Rings',
    description: 'Thick-cut onion rings, battered and fried until golden and crispy.',
    price: 4.99,
    image: 'https://picsum.photos/600/400',
    'data-ai-hint': 'onion rings',
    category: 'Sides',
  },
  {
    id: '9',
    name: 'House Salad',
    description: 'A fresh mix of greens, tomatoes, cucumbers, and croutons with your choice of dressing.',
    price: 5.99,
    image: 'https://picsum.photos/600/400',
    'data-ai-hint': 'house salad',
    category: 'Sides',
  },
  {
    id: '10',
    name: 'Cola',
    description: 'A refreshing can of classic cola.',
    price: 1.99,
    image: 'https://picsum.photos/600/400',
    'data-ai-hint': 'cola drink',
    category: 'Drinks',
    customizationOptions: [
        {
            id: 'size',
            name: 'Size',
            type: 'single',
            choices: [
                { name: 'Can (12oz)', priceModifier: 0 },
                { name: 'Bottle (20oz)', priceModifier: 0.80 },
            ],
        },
    ],
  },
  {
    id: '11',
    name: 'Lemonade',
    description: 'Freshly squeezed lemonade, perfectly sweet and tart.',
    price: 2.49,
    image: 'https://picsum.photos/600/400',
    'data-ai-hint': 'lemonade drink',
    category: 'Drinks',
    customizationOptions: [
        {
            id: 'size',
            name: 'Size',
            type: 'single',
            choices: [
                { name: 'Regular (16oz)', priceModifier: 0 },
                { name: 'Large (24oz)', priceModifier: 1.00 },
            ],
        },
    ],
  },
  {
    id: '12',
    name: 'Iced Tea',
    description: 'Brewed fresh daily, available sweetened or unsweetened.',
    price: 2.29,
    image: 'https://picsum.photos/600/400',
    'data-ai-hint': 'iced tea',
    category: 'Drinks',
    customizationOptions: [
        {
            id: 'size',
            name: 'Size',
            type: 'single',
            choices: [
                { name: 'Regular (16oz)', priceModifier: 0 },
                { name: 'Large (24oz)', priceModifier: 1.00 },
            ],
        },
    ],
  },
];
