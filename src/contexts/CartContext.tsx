'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { message } from 'antd';

interface CartItem {
  id: string;
  title: string;
  description?: string;
  investment_amount?: number;
  status: string;
  added_at: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (project: any) => void;
  removeFromCart: (projectId: string) => void;
  clearCart: () => void;
  isInCart: (projectId: string) => boolean;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export { CartContext };

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('project_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('project_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (project: any) => {
    const cartItem: CartItem = {
      id: project.id,
      title: project.title,
      description: project.description,
      investment_amount: project.investment_amount,
      status: project.status,
      added_at: new Date().toISOString(),
    };

    setItems(prevItems => {
      // Check if item already exists
      const existingItem = prevItems.find(item => item.id === project.id);
      if (existingItem) {
        message.warning('این پروژه قبلاً به کارتابل اضافه شده است');
        return prevItems;
      }

      const newItems = [...prevItems, cartItem];
      message.success('پروژه به کارتابل اضافه شد');
      return newItems;
    });
  };

  const removeFromCart = (projectId: string) => {
    setItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== projectId);
      message.success('پروژه از کارتابل حذف شد');
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    message.success('کارتابل خالی شد');
  };

  const isInCart = (projectId: string) => {
    return items.some(item => item.id === projectId);
  };

  const getCartCount = () => {
    return items.length;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        getCartCount,
      }}
    >
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
