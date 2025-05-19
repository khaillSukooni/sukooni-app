
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
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
import { Alert, AlertDescription } from "@/components/ui/alert";

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [isSetPassword, setIsSetPassword] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  useEffect(() => {
    const checkTokenAndType = async () => {
      // Check if the URL contains the access_token parameter from Supabase
      const hash = window.location.hash;
      
      if (hash && hash.includes("access_token")) {
        setHasToken(true);
        
        // Determine if this is a password reset or initial password setup
        // If coming from state (DashboardRedirect sent the user here), it's a password setup
        const isPasswordSetup = location.state?.isSetPassword === true;
        setIsSetPassword(isPasswordSetup);

        // For users who need to set a password, we don't need to validate the token the same way
        if (!isPasswordSetup) {
          try {
            // Verify token is valid by attempting to get user session
            const { data, error } = await supabase.auth.getSession();
            if (error) {
              throw error;
            }
            
            // If no session found despite having an access_token in URL, the token is invalid
            if (!data.session) {
              setTokenError("Invalid or expired password reset link.");
              setHasToken(false);
            }
          } catch (error: any) {
            console.error("Token validation error:", error);
            setTokenError(error.message || "Invalid or expired password reset link.");
            setHasToken(false);
          }
        }
      } else if (location.state?.isSetPassword === true) {
        // User was redirected here programmatically with isSetPassword state
        setHasToken(true);
        setIsSetPassword(true);
      } else {
        setTokenError("Invalid or expired password reset link.");
        setHasToken(false);
      }
    };

    checkTokenAndType();
  }, [navigate, location.state]);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: PasswordFormValues) => {
    try {
      setIsSubmitting(true);
      const { error } = await supabase.auth.updateUser({
        password: values.password
      });
      
      if (error) {
        throw error;
      }
      
      toast.success(isSetPassword 
        ? "Password has been set successfully!" 
        : "Password has been reset successfully!");
      
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasToken) {
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4 text-center">
          <Alert variant="destructive">
            <AlertDescription>{tokenError || "Invalid token. Please try again."}</AlertDescription>
          </Alert>
          <Button asChild>
            <Link to="/forgot-password">Back to Password Recovery</Link>
          </Button>
        </div>
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
          <h1 className="text-3xl font-bold">
            {isSetPassword ? "Set Your Password" : "Reset Password"}
          </h1>
          <p className="text-center text-muted-foreground">
            {isSetPassword 
              ? "Please create a secure password for your account" 
              : "Please create a new password for your account"}
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isSetPassword ? "New Password" : "New Password"}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? (isSetPassword ? "Setting password..." : "Updating password...") 
                  : (isSetPassword ? "Set password" : "Reset password")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
