
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserRole } from "@/lib/types/auth";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  redirectTo?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles = [],
  redirectTo = "/login",
  children,
}) => {
  const { 
    user, 
    profile, 
    isLoading, 
    isAuthenticated, 
    getDashboardRoute, 
    isProfileLoading, 
    refreshUserData 
  } = useAuth();
  const location = useLocation();

  // Attempt to refresh user data if authenticated but no profile
  useEffect(() => {
    if (isAuthenticated && user && !profile && !isProfileLoading) {
      console.log("Protected route: User authenticated but no profile. Refreshing user data...");
      refreshUserData();
    }
  }, [isAuthenticated, user, profile, isProfileLoading, refreshUserData]);

  console.log("Protected route state:", {
    isAuthenticated,
    isLoading,
    isProfileLoading,
    hasUser: !!user,
    hasProfile: !!profile,
    allowedRoles,
    currentPath: location.pathname
  });

  // Show loading indicator while checking authentication or fetching profile
  if (isLoading || (isAuthenticated && isProfileLoading)) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-muted-foreground">
          {isProfileLoading ? "Loading profile data..." : "Verifying access..."}
        </p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />;
  }

  // If no roles specified, any authenticated user is allowed
  if (allowedRoles.length === 0) {
    return children ? <>{children}</> : <Outlet />;
  }
  
  // If we have a user but no profile yet, show loading state or redirect
  if (user && !profile) {
    // Give the system another chance to load the profile for a specific amount of time
    console.log("User authenticated but profile not loaded yet");
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-muted-foreground">Loading profile data...</p>
      </div>
    );
  }

  // Check if user has an allowed role
  const hasAllowedRole = profile && allowedRoles.includes(profile.role as UserRole);
  
  if (!hasAllowedRole) {
    // Redirect to appropriate dashboard if user doesn't have the right role
    console.log("User doesn't have required role. Redirecting to appropriate dashboard.");
    return <Navigate to={getDashboardRoute()} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
