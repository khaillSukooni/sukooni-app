
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthUser, UserProfile } from "@/lib/types/auth";
import { getUserProfile } from "@/lib/utils/auth";
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  isLoading: boolean;
  authInitialized: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isClient: boolean;
  isTherapist: boolean;
  isAdmin: boolean;
  getDashboardRoute: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const userProfile = await getUserProfile(userId);
      setProfile(userProfile);
      console.log("Profile fetched:", userProfile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }, []);

  // Initialize auth state and set up listeners
  useEffect(() => {
    console.log("AuthContext: Initializing auth state");
    setIsLoading(true);
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event, session?.user?.id);
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser?.id) {
        await fetchUserProfile(currentUser.id);
      } else {
        setProfile(null);
      }
      
      setIsLoading(false);
    });

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Initial session:", session?.user?.id);
        
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser?.id) {
          await fetchUserProfile(currentUser.id);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
      } finally {
        setIsLoading(false);
        setAuthInitialized(true);
      }
    };

    initializeAuth();

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
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      const currentUser = data?.user;
      if (currentUser?.id) {
        setUser(currentUser);
        await fetchUserProfile(currentUser.id);
      }

      toast.success("Logged in successfully!");
    } catch (error: any) {
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
        authInitialized,
        signUp,
        signIn,
        signOut,
        isClient,
        isTherapist,
        isAdmin,
        getDashboardRoute,
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
