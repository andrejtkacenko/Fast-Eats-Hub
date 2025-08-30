"use client";

import { useEffect, useState, useTransition } from "react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

import { useCart } from "@/hooks/use-cart";
import { getRecommendationsAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { MenuItemType } from "@/lib/types";

export function AiRecommendations() {
  const { cartItems, addToCart } = useCart();
  const [recommendations, setRecommendations] = useState<MenuItemType[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (cartItems.length > 0) {
      startTransition(async () => {
        const itemNames = cartItems.map(item => item.name);
        const result = await getRecommendationsAction(itemNames);
        // @ts-ignore
        setRecommendations(result);
      });
    } else {
      setRecommendations([]);
    }
  }, [cartItems]);

  if (cartItems.length === 0) return null;

  return (
    <div className="mt-6">
      <h4 className="text-lg font-medium font-headline">You might also like...</h4>
      {isPending ? (
        <div className="space-y-4 mt-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        </div>
      ) : recommendations.length > 0 ? (
        <div className="mt-4 space-y-4">
          {recommendations.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
                <div>
                  <h5 className="font-medium">{item.name}</h5>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" onClick={() => addToCart(item)}>
                <PlusCircle className="h-6 w-6 text-primary" />
                <span className="sr-only">Add to cart</span>
              </Button>
            </div>
          ))}
        </div>
      ) : (
         !isPending && <p className="text-sm text-muted-foreground mt-2">No recommendations available right now.</p>
      )}
    </div>
  );
}
