"use client";

import Image from "next/image";
import type { MenuItemType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";

interface MenuItemCardProps {
  item: MenuItemType;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
    const { addToCart } = useCart();
    const aiHint = item['data-ai-hint'] || "food item";

  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
            <Image 
                src={item.image} 
                alt={item.name} 
                fill 
                className="object-cover" 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={aiHint}
            />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline">{item.name}</CardTitle>
        <CardDescription className="mt-2 text-sm text-muted-foreground">{item.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-semibold text-primary">${item.price.toFixed(2)}</p>
        <Button onClick={() => addToCart(item)} variant="default">Add to cart</Button>
      </CardFooter>
    </Card>
  );
}
