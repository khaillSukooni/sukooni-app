
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserRole } from "@/lib/types/auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles = [],
  redirectTo = "/login",
}) => {
  const { user, profile, isLoading, isAuthenticated, getDashboardRoute, refreshUserData } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  // On first mount or route change, verify session is valid
  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Protected route: Checking session validity...");
        setIsChecking(true);
        
        // Get current user from Supabase
        const { data } = await supabase.auth.getUser();
        const hasSession = !!data.user;
        
        console.log("Protected route: Session check complete, user exists:", hasSession);
        
        if (hasSession && !isAuthenticated) {
          // We have a session but context doesn't know it yet - refresh
          console.log("Protected route: Session exists but not in context, refreshing data");
          await refreshUserData();
        }
        
        // No session or refresh complete
        setIsChecking(false);
      } catch (error) {
        console.error("Protected route: Error checking session:", error);
        setIsChecking(false);
      }
    };
    
    checkSession();
  }, [location.pathname, isAuthenticated, refreshUserData]);
  
  console.log("Protected route state:", {
    isAuthenticated,
    isLoading,
    isChecking,
    path: location.pathname,
    hasUser: !!user,
    hasProfile: !!profile,
    allowedRoles
  });

  // If authentication is still loading or checking, show loading indicator
  if (isLoading || isChecking) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // If user is not logged in, redirect to login with current path as return URL
  if (!isAuthenticated || !user) {
    console.log("Protected route: User not authenticated, redirecting to", redirectTo);
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />;
  }

  // If allowedRoles is empty, allow any authenticated user
  if (allowedRoles.length === 0) {
    return <Outlet />;
  }

  // Check if user has an allowed role
  const hasAllowedRole = profile && allowedRoles.includes(profile.role as UserRole);
  
  if (!hasAllowedRole) {
    // Redirect to appropriate dashboard if user doesn't have the right role
    console.log("Protected route: User doesn't have required role, redirecting to dashboard");
    return <Navigate to={getDashboardRoute()} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
