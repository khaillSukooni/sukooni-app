
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Extract token from URL if present
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    // Verify the token is valid
    const verifyToken = async () => {
      if (!token) {
        setError("No password reset token provided");
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: "recovery" // or "invite" depending on context
        });

        if (error) {
          console.error("Token verification failed:", error);
          setError("Invalid or expired token. Please request a new invitation.");
        }
      } catch (err) {
        console.error("Token verification error:", err);
        setError("An error occurred while verifying your token.");
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  const handleSetPassword = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Update user's password
      const { data, error } = await supabase.auth.updateUser({
        password
      });

      if (error) {
        throw error;
      }

      // Success - password was updated
      toast({
        title: "Password set successfully",
        description: "You can now log in with your new password.",
      });

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Error setting password:", err);
      setError(err.message || "An error occurred while setting your password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Set Your Password</CardTitle>
          <CardDescription>
            Create a password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="********"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-brand-blue hover:bg-brand-blue/90" 
            onClick={handleSetPassword}
            disabled={loading}
          >
            {loading ? "Setting Password..." : "Set Password"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SetPassword;
