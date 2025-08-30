
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  code: z.string().length(6, { message: "Verification code must be 6 digits." }),
});

type MfaFormValues = z.infer<typeof formSchema>;

export default function MfaPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { completeMfaSignIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const phoneHint = searchParams.get('phoneHint');


  const form = useForm<MfaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit: SubmitHandler<MfaFormValues> = async (data) => {
    setIsLoading(true);
    try {
      await completeMfaSignIn(data.code);
      toast({
        title: "Success",
        description: "You have successfully logged in.",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Two-Factor Authentication</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your phone number ending in {phoneHint}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input placeholder="123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
