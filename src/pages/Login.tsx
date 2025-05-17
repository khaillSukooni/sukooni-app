
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/lib/validation/auth";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

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
import Logo from "@/components/ui/Logo";
import { Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, isAuthenticated, isLoading, isProfileLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect to dashboard or previous page if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading && !isProfileLoading) {
      const redirectPath = location.state?.from || "/dashboard";
      console.log(`Login: Redirecting to ${redirectPath}`);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, isLoading, isProfileLoading, navigate, location.state]);

  // Log the auth state for debugging
  useEffect(() => {
    console.log("Login page auth state:", {
      isAuthenticated,
      isLoading,
      isProfileLoading,
      redirectPath: location.state?.from || "/dashboard"
    });
  }, [isAuthenticated, isLoading, isProfileLoading, location.state]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      await signIn(values.email, values.password);
      // Redirect handled by useEffect
      toast.success("Login successful! Redirecting to dashboard...");
    } catch (error) {
      console.error("Login error:", error);
      // Error toast is already handled in the signIn function
    } finally {
      setIsSubmitting(false);
    }
  };

  // If already authenticated and no redirect, show loading indicator
  if (isAuthenticated && (!isLoading && !isSubmitting)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-muted-foreground">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <Link to="/">
            <Logo size="lg" />
          </Link>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-center text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || isLoading || isProfileLoading}
              >
                {isSubmitting || isLoading || isProfileLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isSubmitting ? "Signing in..." : "Loading..."}
                  </span>
                ) : "Sign in"}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
