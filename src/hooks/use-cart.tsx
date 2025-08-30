
"use client";

import React, { createContext, useContext, useState, useMemo } from 'react';
import type { CartItemType, MenuItemType } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (item: Omit<CartItemType, 'quantity' | 'id'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId:string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  pointsDiscount: number;
  applyPointsDiscount: (points: number) => void;
  removePointsDiscount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper function to generate a unique ID for a cart item based on its customizations
const generateCartId = (productId: string, customizations: { option: string; choice: string }[] = []) => {
  const sortedCustomizations = customizations.slice().sort((a, b) => a.option.localeCompare(b.option) || a.choice.localeCompare(b.choice));
  return `${productId}-${sortedCustomizations.map(c => `${c.option}:${c.choice}`).join('-')}`;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [pointsDiscount, setPointsDiscount] = useState(0); // in points
  const { toast } = useToast();

  const applyPointsDiscount = (points: number) => {
    setPointsDiscount(points);
  };
  
  const removePointsDiscount = () => {
    setPointsDiscount(0);
  }

  const addToCart = (item: Omit<CartItemType, 'quantity' | 'id'>) => {
    const cartId = generateCartId(item.productId, item.customizations);
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === cartId);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === cartId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, id: cartId, quantity: 1 }];
      }
    });
    toast({
      title: "Added to cart",
      description: `${item.name} is now in your cart.`,
    })
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setPointsDiscount(0);
  }

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);
  
  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, pointsDiscount, applyPointsDiscount, removePointsDiscount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
