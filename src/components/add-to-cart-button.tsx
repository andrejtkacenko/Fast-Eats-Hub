"use client";

import { useCart } from "@/hooks/use-cart";
import type { MenuItemType } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function AddToCartButton({ item }: { item: MenuItemType }) {
    const { addToCart } = useCart();
    return (
        <Button onClick={() => addToCart(item)} size="lg" className="w-full text-lg py-6">
            Add to Cart
        </Button>
    );
}
