
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type FormData = z.infer<typeof schema>;

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  
  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    toast({
      title: "Recovery email sent",
      description: "Check your inbox for password reset instructions",
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">Forgot Password</h1>
            <p className="text-muted-foreground">
              Enter your email to reset your password
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>
                We'll send you an email with a link to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-xl">Check Your Email</h3>
                  <p className="text-muted-foreground">
                    We've sent a password reset link to your email address
                  </p>
                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      className="mr-2"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Try different email
                    </Button>
                    <Link to="/sign-in">
                      <Button>Back to sign in</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? "Sending..." : "Send reset link"}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
            {!isSubmitted && (
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link to="/sign-in" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
