
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
  const [needsPasswordSetup, setNeedsPasswordSetup] = useState(false);

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

  // Determine if a user needs to set a password
  // This is typically for users who signed up via magic link or OAuth
  const checkPasswordSetup = useCallback(async (currentUser: AuthUser | null) => {
    if (!currentUser) {
      setNeedsPasswordSetup(false);
      return false;
    }

    // Check if user was invited and has never set a password
    // For Supabase, we'll use the metadata to check this
    const isInvited = currentUser.email_confirmed_at && !currentUser.last_sign_in_at;
    const noPasswordHash = currentUser.app_metadata?.provider === 'email' && 
                          !currentUser.app_metadata?.password_hash;
    const needsSetup = isInvited || noPasswordHash;

    console.log("Password setup check:", {
      isInvited,
      noPasswordHash,
      needsSetup,
      provider: currentUser.app_metadata?.provider,
      hasPasswordHash: !!currentUser.app_metadata?.password_hash,
      email_confirmed_at: currentUser.email_confirmed_at,
      last_sign_in_at: currentUser.last_sign_in_at
    });

    setNeedsPasswordSetup(needsSetup);
    return needsSetup;
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
        await checkPasswordSetup(currentUser);
      } else {
        setProfile(null);
        setNeedsPasswordSetup(false);
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
      setUser(null);
      setProfile(null);
      setSession(null);
      setIsAuthenticated(false);
      setNeedsPasswordSetup(false);
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserProfile, checkPasswordSetup]);

  // Set up auth listener and get initial session
  useEffect(() => {
    console.log("Setting up auth state listener...");
    setIsLoading(true);
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("Auth state changed:", event, newSession ? "Session exists" : "No session");
      
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
            
            // Check if user needs password setup
            await checkPasswordSetup(newSession.user);
            
            setIsProfileLoading(false);
          }, 0);
        } catch (error) {
          console.error("Error fetching profile after auth change:", error);
          setProfile(null);
          setIsProfileLoading(false);
        }
      } else {
        setProfile(null);
        setNeedsPasswordSetup(false);
        setIsProfileLoading(false);
      }
      
      // For sign out events, ensure we clean up properly
      if (event === 'SIGNED_OUT') {
        setProfile(null);
        setUser(null);
        setSession(null);
        setIsAuthenticated(false);
        setNeedsPasswordSetup(false);
      }
      
      setIsLoading(false);
    });
    
    // Check initial session
    const checkInitialSession = async () => {
      try {
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
            
            // Check if user needs password setup
            await checkPasswordSetup(currentUser);
          } catch (error) {
            console.error("Error fetching initial profile:", error);
            setProfile(null);
          } finally {
            setIsProfileLoading(false);
          }
        } 
        
        setIsLoading(false);
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
  }, [checkPasswordSetup]);

  return {
    user,
    profile,
    session,
    isLoading,
    isAuthenticated,
    isProfileLoading,
    needsPasswordSetup,
    fetchUserProfile,
    refreshUserData,
    setUser,
    setProfile,
    setSession,
    setIsAuthenticated
  };
}
