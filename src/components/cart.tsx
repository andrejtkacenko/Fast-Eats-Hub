
"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <>
      <SheetHeader className="pr-6">
        <SheetTitle className="font-headline">My Cart</SheetTitle>
      </SheetHeader>
      <Separator />
      {cartItems.length > 0 ? (
        <>
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-6 p-4 sm:p-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="rounded-md object-cover"
                        />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-sm sm:text-base">{item.name}</h3>
                       <div className="text-sm text-muted-foreground">
                        <p>${item.price.toFixed(2)}</p>
                        {item.customizations && item.customizations.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                                {item.customizations.map(cust => (
                                    <Badge key={`${cust.option}-${cust.choice}`} variant="secondary" className="text-xs">
                                        {cust.choice}
                                    </Badge>
                                ))}
                            </div>
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-5 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground shrink-0"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <Separator />
          <SheetFooter className="p-4 sm:p-6 bg-background">
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex justify-between items-center text-lg font-medium">
                    <span>Total:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                <SheetClose asChild>
                    <Link href="/checkout" className="w-full">
                        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                            Checkout
                        </Button>
                    </Link>
                </SheetClose>
            </div>
          </SheetFooter>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center p-4">
            <ShoppingCart className="h-16 w-16 sm:h-20 sm:w-20 text-muted-foreground" />
          <h3 className="text-xl font-semibold font-headline">Your cart is empty</h3>
          <p className="text-muted-foreground text-sm sm:text-base">Add some delicious food to get started!</p>
        </div>
      )}
    </>
  );
}
