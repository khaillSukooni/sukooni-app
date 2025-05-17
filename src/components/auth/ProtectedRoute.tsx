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
  const [checkTimeout, setCheckTimeout] = useState(false);

  // Add safety timeout to prevent indefinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isChecking) {
        console.log("ProtectedRoute: Auth check timeout reached, forcing state update");
        setCheckTimeout(true);
        setIsChecking(false);
      }
    }, 3000); // 3 second safety timeout
    
    return () => clearTimeout(timer);
  }, [isChecking]);

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
    checkTimeout,
    path: location.pathname,
    hasUser: !!user,
    hasProfile: !!profile,
    allowedRoles
  });

  // If authentication check timed out or is no longer checking and not authenticated, redirect
  if (!isLoading && !isChecking && !isAuthenticated) {
    console.log("Protected route: User not authenticated, redirecting to", redirectTo);
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />;
  }

  // If authentication is still loading or checking and hasn't timed out, show loading indicator
  if ((isLoading || isChecking) && !checkTimeout) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Checking authentication...</h2>
          <p className="text-gray-600">Please wait while we verify your access.</p>
        </div>
      </div>
    );
  }

  // If we have a user but no profile yet, and we're not checking anymore, let them proceed 
  // (profile might be loading or missing but we'll let components handle that)
  if (isAuthenticated && user && !profile && !isChecking) {
    // If roles are required but we have no profile to check, redirect to dashboard
    if (allowedRoles.length > 0) {
      console.log("Protected route: User has no profile but roles are required, redirecting to dashboard");
      return <Navigate to={getDashboardRoute()} replace />;
    }
    // Otherwise allow access with just user
    return <Outlet />;
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
