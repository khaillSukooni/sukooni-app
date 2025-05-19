
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
import { Loader2 } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);
  const [isSetPassword, setIsSetPassword] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  // Check if we're on this page from an invite link or password reset
  useEffect(() => {
    const checkTokenAndType = async () => {
      setIsLoading(true);
      console.log("Checking token type");
      console.log("Current URL hash:", window.location.hash);
      console.log("Location state:", location.state);

      // Check if the URL contains hash params from Supabase
      const hash = window.location.hash;
      const isInviteFlow = hash && hash.includes("type=invite");
      const isResetFlow = hash && hash.includes("type=recovery");
      const hasAccessToken = hash && hash.includes("access_token");
      const comesFromState = location.state?.isSetPassword === true;
      
      console.log({
        isInviteFlow,
        isResetFlow,
        hasAccessToken,
        comesFromState
      });

      // Process the auth session from URL if there's an access token
      if (hasAccessToken) {
        try {
          // Get session from the hash params
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("Auth session error:", error);
            setTokenError(error.message || "Error validating authentication token");
            setHasToken(false);
            setIsLoading(false);
            return;
          }
          
          if (data.session) {
            console.log("Valid session found from URL");
            setHasToken(true);
            
            // Determine if this is password set or reset
            if (isInviteFlow) {
              setIsSetPassword(true);
              console.log("Invite flow detected from URL");
            } else {
              setIsSetPassword(false);
              console.log("Recovery flow detected from URL");
            }
          } else {
            console.error("No session found despite access token in URL");
            setTokenError("Invalid or expired authentication link");
            setHasToken(false);
          }
        } catch (error: any) {
          console.error("Token validation error:", error);
          setTokenError(error.message || "An error occurred while validating your session");
          setHasToken(false);
        }
      } 
      // Handle case where user was redirected programmatically
      else if (comesFromState) {
        console.log("User redirected here by app logic due to password setup need");
        setHasToken(true);
        setIsSetPassword(true);
      } 
      // No token or state passed, we shouldn't be on this page
      else {
        console.log("No token or state found, invalid access");
        setTokenError("Invalid access. Please request a password reset or use a valid invitation link.");
        setHasToken(false);
      }
      
      setIsLoading(false);
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
      console.log("Updating password");
      
      const { error } = await supabase.auth.updateUser({
        password: values.password
      });
      
      if (error) {
        throw error;
      }
      
      toast.success(isSetPassword 
        ? "Password has been set successfully!" 
        : "Password has been reset successfully!");
      
      // Short delay before redirect to ensure the toast is visible
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("Password update error:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Verifying your session...</p>
        </div>
      </div>
    );
  }

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
