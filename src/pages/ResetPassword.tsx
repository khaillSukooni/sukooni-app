import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const resetPasswordSchema = z.object({
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

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasResetToken, setHasResetToken] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateResetToken = async () => {
      // Check if the URL contains the access_token parameter from Supabase
      const hash = window.location.hash;
      
      if (!hash || !hash.includes("access_token")) {
        toast.error("Invalid or expired password reset link.");
        navigate("/forgot-password");
        return;
      }

      // Extract the hash parameters
      const hashParams = new URLSearchParams(hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      const type = hashParams.get("type");

      if (!accessToken || !refreshToken || type !== "recovery") {
        toast.error("Invalid password reset link.");
        navigate("/forgot-password");
        return;
      }

      // Validate the session but don't set it in the auth context yet
      try {
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        });

        if (error) {
          throw error;
        }

        // Immediately sign out to prevent auto-login but keep the tokens for password reset
        await supabase.auth.signOut();
        
        // Store tokens temporarily for password reset
        sessionStorage.setItem('reset_access_token', accessToken);
        sessionStorage.setItem('reset_refresh_token', refreshToken);
        
        setHasResetToken(true);
      } catch (error: any) {
        console.error("Token validation error:", error);
        toast.error("Invalid or expired password reset link.");
        navigate("/forgot-password");
      } finally {
        setIsValidating(false);
      }
    };

    validateResetToken();
  }, [navigate]);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Get the stored tokens
      const accessToken = sessionStorage.getItem('reset_access_token');
      const refreshToken = sessionStorage.getItem('reset_refresh_token');
      
      if (!accessToken || !refreshToken) {
        throw new Error("Reset session expired. Please request a new password reset link.");
      }

      // Temporarily set the session to update the password
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });

      if (sessionError) {
        throw sessionError;
      }

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: values.password
      });

      if (updateError) {
        throw updateError;
      }

      // Sign out immediately after password update
      await supabase.auth.signOut();
      
      // Clean up stored tokens
      sessionStorage.removeItem('reset_access_token');
      sessionStorage.removeItem('reset_refresh_token');
      
      toast.success("Password has been reset successfully! Please log in with your new password.");
      navigate("/login");
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast.error(error.message || "An error occurred. Please try again.");
      
      // Clean up on error
      sessionStorage.removeItem('reset_access_token');
      sessionStorage.removeItem('reset_refresh_token');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isValidating) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Validating reset token...</p>
        </div>
      </div>
    );
  }

  if (!hasResetToken) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Invalid or expired reset link</p>
          <Link to="/forgot-password" className="text-primary hover:underline">
            Request a new password reset
          </Link>
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
          <h1 className="text-3xl font-bold">Set New Password</h1>
          <p className="text-center text-muted-foreground">
            Please create a new password for your account
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
                    <FormLabel>New Password</FormLabel>
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
                    <FormLabel>Confirm New Password</FormLabel>
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
                {isSubmitting ? "Updating password..." : "Set new password"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-4 text-center text-sm text-muted-foreground">
            After setting your new password, you'll need to log in again.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
