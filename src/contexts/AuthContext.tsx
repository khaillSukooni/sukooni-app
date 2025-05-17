
import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthUser, UserProfile } from "@/lib/types/auth";
import { getUserProfile } from "@/lib/utils/auth";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";

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
    const initAuth = async () => {
      try {
        setIsLoading(true);
        
        // First set up the auth state change listener
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log("Auth state changed:", event);
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
          
          setIsLoading(false);
        });
        
        // Then explicitly check the current session
        const { data: sessionData } = await supabase.auth.getSession();
        const currentUser = sessionData.session?.user ?? null;
        setUser(currentUser);
        
        if (currentUser?.id) {
          try {
            const userProfile = await getUserProfile(currentUser.id);
            console.log("Initial profile loaded:", userProfile);
            setProfile(userProfile);
          } catch (profileError) {
            console.error("Error fetching initial profile:", profileError);
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
        
        setIsLoading(false);
        
        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error initializing auth:", error);
        setIsLoading(false);
      }
    };
    
    initAuth();
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
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }

      const currentUser = data?.user;
      if (currentUser?.id) {
        setUser(currentUser);
        const userProfile = await getUserProfile(currentUser.id);
        console.log("Profile loaded after sign in:", userProfile);
        setProfile(userProfile);
        toast.success("Logged in successfully!");
      }
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
    if (!profile) return "/login";
    
    if (profile.role === "client") return "/dashboard/client";
    if (profile.role === "therapist") return "/dashboard/therapist";
    if (profile.role === "admin") return "/dashboard/admin";
    
    // Default fallback in case of invalid or missing role
    return "/login";
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
        refreshProfile,
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
