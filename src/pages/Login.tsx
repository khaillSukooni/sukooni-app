
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/lib/validation/auth";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, getDashboardRoute, isAuthenticated, isLoading, refreshUserData } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      console.log("Login: Checking authentication on mount...");
      try {
        const { data } = await supabase.auth.getUser();
        const hasSession = !!data.user;
        console.log("Login: Auth check complete, user exists:", hasSession);
        
        if (hasSession) {
          // Refresh user data to ensure we have the profile
          await refreshUserData();
        } 
      } catch (error) {
        console.error("Login: Error checking authentication:", error);
      } finally {
        // Always stop showing the loading state after checking
        setCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, [refreshUserData]);

  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading && !checkingAuth) {
      const redirectTo = location.state?.from || getDashboardRoute();
      console.log("Login: User is authenticated, redirecting to", redirectTo);
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, checkingAuth, getDashboardRoute, navigate, location.state]);

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
      
      // Redirect will happen via the useEffect above when isAuthenticated becomes true
      console.log("Login successful, auth state will update and trigger redirect");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state only while initially checking auth
  if (checkingAuth) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  // If we're still globally checking authentication (in AuthContext) but we've finished our local check
  // we'll show the form but disable submission
  const isPending = isLoading && !checkingAuth;

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
                disabled={isSubmitting || isPending}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
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
