
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthUser, UserProfile } from "@/lib/types/auth";
import { getUserProfile } from "@/lib/utils/auth";
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isClient: boolean;
  isTherapist: boolean;
  isAdmin: boolean;
  getDashboardRoute: () => string;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Function to refresh the user profile data
  const refreshProfile = async () => {
    if (!user?.id) return;
    
    try {
      console.log("Refreshing profile for user:", user.id);
      const userProfile = await getUserProfile(user.id);
      console.log("Refreshed profile data:", userProfile);
      setProfile(userProfile);
    } catch (error) {
      console.error("Error refreshing user profile:", error);
    }
  };

  // Initialize auth state on mount
  useEffect(() => {
    console.log("AuthProvider: Initializing auth state");
    setIsLoading(true);
    
    // First check for current session
    const initAuth = async () => {
      try {
        console.log("AuthProvider: Fetching current session");
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Error fetching session:", sessionError);
          setUser(null);
          setProfile(null);
          setIsLoading(false);
          return;
        }
        
        const currentUser = sessionData?.session?.user ?? null;
        console.log("AuthProvider: Current user from session:", currentUser?.id);
        
        if (currentUser) {
          setUser(currentUser);
          try {
            const userProfile = await getUserProfile(currentUser.id);
            console.log("AuthProvider: Initial profile loaded:", userProfile);
            setProfile(userProfile);
          } catch (profileError) {
            console.error("Error fetching initial profile:", profileError);
            setProfile(null);
          }
        } else {
          console.log("AuthProvider: No current user found");
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error("AuthProvider: Error initializing auth:", error);
      } finally {
        console.log("AuthProvider: Auth initialization complete");
        setIsLoading(false);
      }
    };
    
    initAuth();
    
    // Then set up the auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, "User ID:", session?.user?.id);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser?.id) {
        try {
          const userProfile = await getUserProfile(currentUser.id);
          console.log("Profile updated from auth change event:", userProfile);
          setProfile(userProfile);
        } catch (profileError) {
          console.error("Error fetching profile on auth change:", profileError);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
    });
    
    return () => {
      console.log("AuthProvider: Cleaning up auth listener");
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with email:", email);
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }

      const currentUser = data?.user;
      if (currentUser?.id) {
        console.log("Sign in successful for user:", currentUser.id);
        setUser(currentUser);
        const userProfile = await getUserProfile(currentUser.id);
        console.log("Profile loaded after sign in:", userProfile);
        setProfile(userProfile);
        toast.success("Logged in successfully!");
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(error.message || "Invalid login credentials.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      console.log("User signed out");
      setUser(null);
      setProfile(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isClient = profile?.role === "client";
  const isTherapist = profile?.role === "therapist";
  const isAdmin = profile?.role === "admin";

  const getDashboardRoute = useCallback(() => {
    if (!profile?.role) return "/login";
    
    switch(profile.role) {
      case "client": 
        return "/dashboard/client";
      case "therapist": 
        return "/dashboard/therapist";
      case "admin": 
        return "/dashboard/admin";
      default:
        return "/login";
    }
  }, [profile?.role]);

  const value = {
    user,
    profile,
    isLoading,
    signUp,
    signIn,
    signOut,
    isClient,
    isTherapist,
    isAdmin,
    getDashboardRoute,
    refreshProfile,
  };

  console.log("AuthProvider rendering with state:", { 
    user: user ? "User exists" : "No user", 
    profile: profile ? "Profile exists" : "No profile", 
    isLoading 
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
