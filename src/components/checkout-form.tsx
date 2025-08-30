
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  address: z.string().min(10, {
    message: "Please enter a valid address.",
  }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number.",
  }),
  'card-number': z.string().regex(/^\d{16}$/, "Invalid card number."),
  'expiry-date': z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)."),
  'cvv': z.string().regex(/^\d{3,4}$/, "Invalid CVV."),
});

export function CheckoutForm() {
  const { toast } = useToast();
  const { clearCart } = useCart();
  const router = useRouter();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      "card-number": "",
      "expiry-date": "",
      "cvv": "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user.displayName || "");
    }
  }, [user, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const orderId = Math.random().toString(36).substr(2, 9);
    
    toast({
      title: "Order Placed!",
      description: "Your food is on the way. You can track your order now.",
    });

    clearCart();
    router.push(`/order/${orderId}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
            <h3 className="text-2xl font-bold font-headline">Delivery Details</h3>
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                    <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Delivery Address</FormLabel>
                <FormControl>
                    <Input placeholder="123 Main St, Anytown, USA" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <div className="space-y-4">
             <h3 className="text-2xl font-bold font-headline">Payment Information</h3>
            <FormField
            control={form.control}
            name="card-number"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                    <Input placeholder="•••• •••• •••• ••••" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="expiry-date"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                        <Input placeholder="•••" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
        </div>

        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6">
          Place Order
        </Button>
      </form>
    </Form>
  );
}
