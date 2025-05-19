
import React, { createContext, useContext, useState } from "react";
import { AuthUser, UserProfile } from "@/lib/types/auth";
import { Session } from "@supabase/supabase-js";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthActions } from "@/hooks/useAuthActions";
import { useUserRoles } from "@/hooks/useUserRoles";

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
  needsPasswordSetup: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    user, 
    profile, 
    session, 
    isLoading, 
    isAuthenticated, 
    isProfileLoading,
    needsPasswordSetup,
    refreshUserData 
  } = useAuthState();
  
  const { signUp, signIn, signOut } = useAuthActions();
  const { isClient, isTherapist, isAdmin, getDashboardRoute: getRoute } = useUserRoles(profile);

  // Wrapper for getDashboardRoute to provide isAuthenticated
  const getDashboardRoute = () => getRoute(isAuthenticated);

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
        needsPasswordSetup,
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
