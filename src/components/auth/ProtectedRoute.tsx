
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserRole } from "@/lib/types/auth";
import { useEffect } from "react";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles = [],
  redirectTo = "/login",
}) => {
  const { user, profile, isLoading, isAuthenticated, getDashboardRoute } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("Protected route check:", {
      isAuthenticated,
      isLoading,
      path: location.pathname,
      hasUser: !!user,
      hasProfile: !!profile
    });
  }, [isAuthenticated, isLoading, user, profile, location.pathname]);

  // If authentication is still loading, show loading indicator
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // If user is not logged in, redirect to login with current path as return URL
  if (!isAuthenticated || !user) {
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
    return <Navigate to={getDashboardRoute()} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
