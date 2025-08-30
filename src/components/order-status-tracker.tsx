"use client";

import { useState, useEffect } from "react";
import { PartyPopper, Package, ChefHat, Bike, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const statuses = [
  { name: "Order Confirmed", icon: Package },
  { name: "Preparing", icon: ChefHat },
  { name: "Out for Delivery", icon: Bike },
  { name: "Delivered", icon: CheckCircle },
];

export function OrderStatusTracker() {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatusIndex((prevIndex) => {
        if (prevIndex < statuses.length - 1) {
          return prevIndex + 1;
        }
        clearInterval(interval);
        return prevIndex;
      });
    }, 3000); // 3 seconds for demonstration

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center relative mb-8">
        <div className="absolute left-0 top-1/2 w-full h-1 bg-muted -translate-y-1/2"></div>
        <div 
          className="absolute left-0 top-1/2 h-1 bg-primary -translate-y-1/2 transition-all duration-500" 
          style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
        ></div>
        {statuses.map((status, index) => {
          const isActive = index <= currentStatusIndex;
          return (
            <div key={status.name} className="relative z-10 flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500",
                  isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                <status.icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold font-headline text-primary">{statuses[currentStatusIndex].name}</p>
        {currentStatusIndex === statuses.length - 1 && (
            <div className="mt-6 flex flex-col items-center gap-2">
                <PartyPopper className="w-12 h-12 text-accent"/>
                <p className="text-lg font-semibold">Enjoy your meal!</p>
            </div>
        )}
      </div>
    </div>
  );
}
