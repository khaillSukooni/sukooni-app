import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthUser, UserProfile } from "@/lib/types/auth";
import { getUserProfile } from "@/lib/utils/auth";
import { Session } from "@supabase/supabase-js";
import { toast } from "@/components/ui/sonner";

export function useAuthState() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  // Check if we're in a password reset flow
  const isPasswordResetFlow = () => {
    if (window.location.pathname !== '/reset-password') return false;
    
    const hash = window.location.hash;
    if (!hash) return false;
    
    const hashParams = new URLSearchParams(hash.substring(1));
    const type = hashParams.get("type");
    
    return type === "recovery";
  };

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
      
      console.log("Current session:", currentSession ? "Session exists" : "No session");
      
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
    console.log("Setting up auth state listener...");
    setIsLoading(true);
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("Auth state changed:", event, newSession ? "Session exists" : "No session");
      
      // If we're in a password reset flow, completely ignore all auth state changes
      if (isPasswordResetFlow()) {
        console.log("In password reset flow, ignoring ALL auth state changes");
        setIsLoading(false);
        return;
      }
      
      // Synchronously update basic auth state
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setIsAuthenticated(!!newSession?.user);
      
      // If we have a user, fetch their profile asynchronously
      if (newSession?.user?.id) {
        try {
          setIsProfileLoading(true);
          // Use setTimeout to avoid potential deadlocks with Supabase auth
          setTimeout(async () => {
            const userProfile = await getUserProfile(newSession.user.id);
            console.log("Profile after auth change:", userProfile ? "Profile found" : "No profile");
            setProfile(userProfile);
            setIsProfileLoading(false);
          }, 0);
        } catch (error) {
          console.error("Error fetching profile after auth change:", error);
          setProfile(null);
          setIsProfileLoading(false);
        }
      } else {
        setProfile(null);
        setIsProfileLoading(false);
      }
      
      // For sign out events, ensure we clean up properly
      if (event === 'SIGNED_OUT') {
        setProfile(null);
        setUser(null);
        setSession(null);
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    });
    
    // Check initial session
    const checkInitialSession = async () => {
      try {
        // If we're in password reset flow, don't check for existing session
        if (isPasswordResetFlow()) {
          console.log("In password reset flow, skipping initial session check");
          setIsLoading(false);
          return;
        }

        const { data: { session: initialSession } } = await supabase.auth.getSession();
        console.log("Initial session check:", initialSession ? "Session exists" : "No session");
        
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
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking initial session:", error);
        setIsLoading(false);
      }
    };
    
    checkInitialSession();
    
    // Clean up subscription on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    profile,
    session,
    isLoading,
    isAuthenticated,
    isProfileLoading,
    fetchUserProfile,
    refreshUserData,
    setUser,
    setProfile,
    setSession,
    setIsAuthenticated
  };
}
