
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthUser, UserProfile } from "@/lib/types/auth";
import { getUserProfile } from "@/lib/utils/auth";
import { toast } from "@/components/ui/sonner";
import { Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  session: Session | null;
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
  isProfileLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  // Fetch user profile when we have a user ID
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      console.log("Fetching user profile for ID:", userId);
      setIsProfileLoading(true);
      const userProfile = await getUserProfile(userId);
      console.log("Fetched user profile:", userProfile ? "Profile found" : "No profile");
      
      if (userProfile) {
        setProfile(userProfile);
        return userProfile;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setProfile(null);
      return null;
    } finally {
      setIsProfileLoading(false);
    }
  }, []);

  // Refresh user session and profile data
  const refreshUserData = useCallback(async () => {
    console.log("Refreshing user data...");
    setIsLoading(true);
    
    try {
      const { data } = await supabase.auth.getSession();
      const currentSession = data.session;
      const currentUser = currentSession?.user ?? null;
      
      setSession(currentSession);
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
      setSession(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserProfile]);

  // Set up auth listener and get initial session
  useEffect(() => {
    // Set initial loading state
    setIsLoading(true);
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("Auth state changed:", event, newSession ? "Session exists" : "No session");
      
      const currentUser = newSession?.user ?? null;
      
      // Synchronously update basic auth state
      setSession(newSession);
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
      
      // If we have a user, fetch their profile asynchronously
      if (currentUser?.id) {
        try {
          setIsProfileLoading(true);
          const userProfile = await getUserProfile(currentUser.id);
          console.log("Profile after auth change:", userProfile ? "Profile found" : "No profile");
          setProfile(userProfile);
        } catch (error) {
          console.error("Error fetching profile after auth change:", error);
          setProfile(null);
        } finally {
          setIsProfileLoading(false);
          setIsLoading(false);
        }
      } else {
        setProfile(null);
        setIsLoading(false);
      }
    });
    
    // Check initial session
    const checkInitialSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        // Update session state
        const currentUser = initialSession?.user ?? null;
        
        setSession(initialSession);
        setUser(currentUser);
        setIsAuthenticated(!!currentUser);
        
        if (currentUser?.id) {
          try {
            setIsProfileLoading(true);
            const userProfile = await getUserProfile(currentUser.id);
            setProfile(userProfile);
          } catch (error) {
            console.error("Error fetching initial profile:", error);
            setProfile(null);
          } finally {
            setIsProfileLoading(false);
          }
        }
      } catch (error) {
        console.error("Error checking initial session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkInitialSession();
    
    // Clean up subscription on unmount
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

      // Success will be handled by the auth state change listener
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
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      // Clear auth state
      setUser(null);
      setProfile(null);
      setSession(null);
      setIsAuthenticated(false);
      
      toast.success("Logged out successfully!");
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast.error(error.message || "Error signing out.");
    } finally {
      setIsLoading(false);
    }
  };

  // Role-based helpers
  const isClient = profile?.role === "client";
  const isTherapist = profile?.role === "therapist";
  const isAdmin = profile?.role === "admin";

  const getDashboardRoute = useCallback(() => {
    if (isClient) return "/dashboard/client";
    if (isTherapist) return "/dashboard/therapist";
    if (isAdmin) return "/dashboard/admin";
    // If authenticated but role not determined yet, default to client dashboard
    return isAuthenticated ? "/dashboard/client" : "/dashboard";
  }, [isClient, isTherapist, isAdmin, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
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
        isProfileLoading,
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
