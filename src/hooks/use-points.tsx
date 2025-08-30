
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './use-auth';

interface PointsContextType {
  points: number;
  addPoints: (amount: number) => void;
  spendPoints: (amount: number) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

// This is a mock implementation. In a real app, points would be stored in a database.
const MOCK_STARTING_POINTS = 250;

export const PointsProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // In a real app, you would fetch the points from your backend.
      // For this demo, we'll just give them a starting balance.
      setPoints(MOCK_STARTING_POINTS);
    } else {
      setPoints(0);
    }
  }, [user]);

  const addPoints = (amount: number) => {
    setPoints(prevPoints => prevPoints + amount);
  };

  const spendPoints = (amount: number) => {
    setPoints(prevPoints => {
        if (prevPoints < amount) {
            // This should be handled by form validation, but as a safeguard:
            console.error("Not enough points to spend.");
            return prevPoints;
        }
        return prevPoints - amount;
    });
  };

  const value = {
    points,
    addPoints,
    spendPoints,
  };

  return (
    <PointsContext.Provider value={value}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};
