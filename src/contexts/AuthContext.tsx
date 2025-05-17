
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
  isAuthenticated: boolean;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch user profile when we have a user ID
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const userProfile = await getUserProfile(userId);
      console.log("Fetched user profile:", userProfile ? "Profile found" : "No profile");
      setProfile(userProfile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setProfile(null);
    }
  }, []);

  // Refresh user session and profile data
  const refreshUserData = useCallback(async () => {
    console.log("Refreshing user data...");
    setIsLoading(true);
    
    try {
      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user ?? null;
      
      console.log("Session refresh result:", currentUser ? "Session found" : "No session");
      
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);

      if (currentUser?.id) {
        await fetchUserProfile(currentUser.id);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserProfile]);

  // Get initial session + profile on mount
  useEffect(() => {
    const getInitialSession = async () => {
      try {
        console.log("Checking initial auth session...");
        setIsLoading(true);
        
        // Get current session from Supabase
        const { data } = await supabase.auth.getSession();
        const currentUser = data.session?.user ?? null;
        
        console.log("Initial auth check result:", currentUser ? "User found" : "No user");
        
        setUser(currentUser);
        setIsAuthenticated(!!currentUser);

        if (currentUser?.id) {
          await fetchUserProfile(currentUser.id);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session ? "Session exists" : "No session");
      
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);

      if (currentUser?.id) {
        await fetchUserProfile(currentUser.id);
      } else {
        setProfile(null);
      }

      setIsLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [fetchUserProfile]);

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
      setIsLoading(true);
      console.log("AuthContext: Attempting to sign in with email and password...");
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      const currentUser = data?.user;
      if (currentUser?.id) {
        // Immediately update auth state
        console.log("AuthContext: Login successful, updating state...");
        setUser(currentUser);
        setIsAuthenticated(true);
        
        // Fetch user profile
        await fetchUserProfile(currentUser.id);
      }

      toast.success("Logged in successfully!");
    } catch (error: any) {
      console.error("AuthContext: Login error:", error);
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
      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
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

  const getDashboardRoute = () => {
    if (isClient) return "/dashboard/client";
    if (isTherapist) return "/dashboard/therapist";
    if (isAdmin) return "/dashboard/admin";
    return "/dashboard";
  };

  return (
    <AuthContext.Provider
      value={{
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
        isAuthenticated,
        refreshUserData,
      }}
    >
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
