"use client";

import { CheckoutForm } from "@/components/checkout-form";
import { Container } from "@/components/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function CheckoutPage() {
    const { cartItems, cartTotal, pointsDiscount } = useCart();
    const finalTotal = cartTotal - (pointsDiscount * 0.1);

  return (
    <Container className="py-12">
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
                            <div key={item.id} className="flex justify-between items-start">
                                <div className="flex items-start gap-4">
                                    <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md"/>
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
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
                                </div>
                                <p className="font-medium text-right">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between items-center font-semibold">
                            <p>Subtotal</p>
                            <p>${cartTotal.toFixed(2)}</p>
                        </div>
                        {pointsDiscount > 0 && (
                             <div className="flex justify-between items-center font-semibold text-primary">
                                <p>Points Discount ({pointsDiscount} pts)</p>
                                <p>-${(pointsDiscount * 0.1).toFixed(2)}</p>
                            </div>
                        )}
                        <Separator />
                        <div className="flex justify-between items-center font-bold text-lg">
                            <p>Total</p>
                            <p>${finalTotal.toFixed(2)}</p>
                        </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div>
                <CheckoutForm />
            </div>
        </div>
    </Container>
  );
}
