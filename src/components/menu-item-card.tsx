
"use client";

import Image from "next/image";
import type { MenuItemType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import { Eye, Plus } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItemType;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
    const { addToCart } = useCart();
    const aiHint = item['data-ai-hint'] || "food item";

    const handleAddToCart = () => {
        addToCart({
            productId: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            customizations: item.customizationOptions?.map(opt => ({
                option: opt.name,
                choice: opt.choices[0].name
            })) || []
        });
    };

    // If item has customizations, link to the item page. Otherwise, add to cart directly.
    const hasCustomizations = item.customizationOptions && item.customizationOptions.length > 0;
    const CardLinkWrapper = ({ children }: { children: React.ReactNode }) => 
        hasCustomizations ? <Link href={`/item/${item.id}`} className="block">{children}</Link> : <>{children}</>;


  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-md hover:shadow-xl transition-shadow duration-300 group">
        <CardLinkWrapper>
            <CardHeader className="p-0 relative">
            <div className="relative h-48 w-full">
                <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    data-ai-hint={aiHint}
                />
                {hasCustomizations && (
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Eye className="h-10 w-10 text-white" />
                    </div>
                )}
            </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
            <CardTitle className="text-lg font-headline">{item.name}</CardTitle>
            <CardDescription className="mt-2 text-sm text-muted-foreground">{item.description}</CardDescription>
            </CardContent>
        </CardLinkWrapper>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-semibold text-primary">${item.price.toFixed(2)}</p>
        {hasCustomizations ? (
            <Button asChild variant="default">
                <Link href={`/item/${item.id}`}>Customize</Link>
            </Button>
        ) : (
            <Button onClick={handleAddToCart} variant="default">Add to cart</Button>
        )}
      </CardFooter>
    </Card>
  );
}
