
import { UserProfile } from "@/lib/types/auth";
import { useCallback } from "react";

export function useUserRoles(profile: UserProfile | null) {
  // Role-based helpers
  const isClient = profile?.role === "client";
  const isTherapist = profile?.role === "therapist";
  const isAdmin = profile?.role === "admin";

  const getDashboardRoute = useCallback((isUserAuthenticated: boolean) => {
    if (isClient) return "/dashboard/client";
    if (isTherapist) return "/dashboard/therapist";
    if (isAdmin) return "/dashboard/admin";
    // If authenticated but role not determined yet, default to client dashboard
    return isUserAuthenticated ? "/dashboard/client" : "/dashboard";
  }, [isClient, isTherapist, isAdmin]);

  return {
    isClient,
    isTherapist,
    isAdmin,
    getDashboardRoute
  };
}
