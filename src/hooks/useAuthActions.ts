
import { useCallback } from "react";
import { supabase, clearAuthState } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export function useAuthActions() {
  const signUp = useCallback(async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string
  ) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) throw error;
      toast.success("Account created successfully! Please check your email.");
    } catch (error: any) {
      toast.error(error.message || "An error occurred during sign up.");
      throw error;
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      console.log("AuthContext: Attempting to sign in with email and password...");
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      // Success will be handled by the auth state change listener
      toast.success("Logged in successfully!");
    } catch (error: any) {
      console.error("AuthContext: Login error:", error);
      toast.error(error.message || "Invalid login credentials.");
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      console.log("AuthContext: Signing out user...");
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      // Force clean local storage to ensure complete signout
      clearAuthState();
      
      // Show success message
      toast.success("Logged out successfully!");
      
      // Force page reload to ensure clean state
      window.location.href = '/';
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast.error(error.message || "Error signing out.");
      
      // Even if there's an error, clear local state and force reload
      clearAuthState();
      window.location.href = '/';
    }
  }, []);

  return {
    signUp,
    signIn,
    signOut
  };
}
