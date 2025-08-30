
"use client";

import { useCart } from "@/hooks/use-cart";
import type { CartItemType } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function AddToCartButton({ item }: { item: Omit<CartItemType, 'quantity' | 'id'> }) {
    const { addToCart } = useCart();
    return (
        <Button onClick={() => addToCart(item)} size="lg" className="w-full text-lg py-6">
            Add to Cart
        </Button>
    );
}
