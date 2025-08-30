
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator } from "firebase/auth";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid E.164 phone number (e.g., +1234567890)." }),
});

type SignupFormValues = z.infer<typeof formSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { signup, loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isEnrollingMfa, setIsEnrollingMfa] = useState(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const mfaForm = useForm<{ code: string }>({
    resolver: zodResolver(z.object({ code: z.string().length(6) })),
  });


  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const user = await signup(data.email, data.password, data.name);
      
      if (user) {
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
        });
        
        const session = await multiFactor(user).getSession();
        const phoneInfoOptions = {
            phoneNumber: data.phone,
            session: session
        };

        const phoneAuthProvider = new PhoneAuthProvider(auth);
        const newVerificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
        setVerificationId(newVerificationId);
        setIsEnrollingMfa(true);
        toast({
            title: "Verification Code Sent",
            description: "A code has been sent to your phone. Please enter it to enable MFA.",
        });
      }

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const onMfaSubmit: SubmitHandler<{code: string}> = async (data) => {
    setIsLoading(true);
    if (!verificationId) {
        toast({ title: "Error", description: "Verification ID is missing.", variant: "destructive" });
        setIsLoading(false);
        return;
    }

    try {
        const cred = PhoneAuthProvider.credential(verificationId, data.code);
        const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

        if (auth.currentUser) {
            await multiFactor(auth.currentUser).enroll(multiFactorAssertion, `My Phone`);
            toast({
                title: "MFA Enabled!",
                description: "You have successfully enabled multi-factor authentication.",
            });
            router.push("/login");
        } else {
             toast({ title: "Error", description: "No user is signed in.", variant: "destructive" });
        }
    } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  }
  
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast({
        title: "Success",
        description: "You have successfully logged in with Google.",
      });
      router.push('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isEnrollingMfa) {
    return (
        <div className="flex items-center justify-center py-12 px-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-headline">Enable MFA</CardTitle>
                    <CardDescription>Enter the code sent to your phone.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...mfaForm}>
                        <form onSubmit={mfaForm.handleSubmit(onMfaSubmit)} className="space-y-4">
                            <FormField
                                control={mfaForm.control}
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
                                {isLoading ? "Enrolling..." : "Enable MFA"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
  }


  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div id="recaptcha-container"></div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
          <CardDescription>Enter your information to create a new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create an account"}
              </Button>
            </form>
          </Form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
            Sign up with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline text-primary">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

