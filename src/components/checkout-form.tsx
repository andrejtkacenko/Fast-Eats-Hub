
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
import { useEffect, useState } from "react";
import { usePoints } from "@/hooks/use-points";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Award } from "lucide-react";

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
  usePoints: z.boolean().default(false),
  pointsToUse: z.coerce.number().int().min(0).optional(),
});

export function CheckoutForm() {
  const { toast } = useToast();
  const { clearCart, cartTotal, applyPointsDiscount, removePointsDiscount } = useCart();
  const router = useRouter();
  const { user } = useAuth();
  const { points, spendPoints, addPoints } = usePoints();
  const [pointsError, setPointsError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      "card-number": "",
      "expiry-date": "",
      "cvv": "",
      usePoints: false,
      pointsToUse: 0,
    },
  });

  const usePointsValue = form.watch('usePoints');
  const pointsToUseValue = form.watch('pointsToUse');

  useEffect(() => {
    if (user) {
      form.setValue("name", user.displayName || "");
    }
  }, [user, form]);
  
  useEffect(() => {
    if (usePointsValue && pointsToUseValue) {
      if (pointsToUseValue > points) {
        setPointsError("You don't have enough points.");
        removePointsDiscount();
      } else if (pointsToUseValue * 0.1 > cartTotal) {
        setPointsError("You cannot apply more points than the order total.");
        removePointsDiscount();
      }
      else {
        setPointsError(null);
        applyPointsDiscount(pointsToUseValue);
      }
    } else {
        setPointsError(null);
        removePointsDiscount();
    }
  }, [usePointsValue, pointsToUseValue, points, applyPointsDiscount, removePointsDiscount, cartTotal]);


  function onSubmit(values: z.infer<typeof formSchema>) {
    const orderId = Math.random().toString(36).substr(2, 9);
    
    // Handle points
    if (values.usePoints && values.pointsToUse && !pointsError) {
        spendPoints(values.pointsToUse);
    }
    
    // Award points (e.g. 10% of cart total)
    const pointsAwarded = Math.floor(cartTotal * 0.1);
    addPoints(pointsAwarded);


    toast({
      title: "Order Placed!",
      description: `Your food is on the way. You earned ${pointsAwarded} points!`,
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
        
        {user && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-headline">Loyalty Points</h3>
            <Alert>
              <Award className="h-4 w-4" />
              <AlertTitle>You have {points} points!</AlertTitle>
              <AlertDescription>
                You can use your points to get a discount on your order (10 points = $1).
              </AlertDescription>
            </Alert>
            <div className="flex items-center space-x-2">
                <FormField
                control={form.control}
                name="usePoints"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={points === 0}
                            />
                        </FormControl>
                        <FormLabel>
                            Use my points
                        </FormLabel>
                    </FormItem>
                )}
                />
            </div>
            {usePointsValue && (
                 <FormField
                    control={form.control}
                    name="pointsToUse"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Points to use</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="0" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}/>
                        </FormControl>
                        {pointsError && <p className="text-sm font-medium text-destructive">{pointsError}</p>}
                        </FormItem>
                    )}
                />
            )}
          </div>
        )}

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

        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6" disabled={!!pointsError}>
          Place Order
        </Button>
      </form>
    </Form>
  );
}
