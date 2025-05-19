
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const DashboardRedirect = () => {
  const { 
    user, 
    profile, 
    isProfileLoading, 
    getDashboardRoute, 
    refreshUserData, 
    isAuthenticated 
  } = useAuth();

  // If we don't have a profile yet but do have a user, try to fetch the profile
  useEffect(() => {
    if (isAuthenticated && user && !profile && !isProfileLoading) {
      console.log("DashboardRedirect: User authenticated but no profile. Refreshing user data...");
      refreshUserData();
    }
  }, [user, profile, isProfileLoading, refreshUserData, isAuthenticated]);

  console.log("DashboardRedirect state:", {
    isAuthenticated,
    hasUser: !!user,
    hasProfile: !!profile,
    isProfileLoading,
    dashboardRoute: getDashboardRoute(),
  });

  // If not authenticated at all, redirect to login
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // If profile is still loading, show loading indicator
  if (isProfileLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-muted-foreground">Loading your dashboard...</p>
      </div>
    );
  }

  // Once we have the profile, or determined we won't get one after sufficient time,
  // redirect to the appropriate dashboard
  const route = getDashboardRoute();
  console.log(`Redirecting to ${route}`);
  return <Navigate to={route} replace />;
};

export default DashboardRedirect;
