"use client";

import { CheckoutForm } from "@/components/checkout-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";

export default function CheckoutPage() {
    const { cartItems, cartTotal } = useCart();

  return (
    <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">Checkout</h1>
            <p className="text-muted-foreground mt-2">Complete your order by providing your details below.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md"/>
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between items-center font-bold text-lg">
                            <p>Total</p>
                            <p>${cartTotal.toFixed(2)}</p>
                        </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div>
                <CheckoutForm />
            </div>
        </div>
    </div>
  );
}
