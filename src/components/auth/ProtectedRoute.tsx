
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserRole } from "@/lib/types/auth";
import { Loader2 } from "lucide-react";

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
  const { user, profile, isLoading, isAuthenticated, getDashboardRoute } = useAuth();
  const location = useLocation();

  // Show loading indicator only while still checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-muted-foreground">Verifying access...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />;
  }

  // If no roles specified, any authenticated user is allowed
  if (allowedRoles.length === 0) {
    return children ? <>{children}</> : <Outlet />;
  }
  
  // If we have a user but no profile yet, redirect to dashboard
  if (user && !profile) {
    return <Navigate to={getDashboardRoute()} replace />;
  }

  // Check if user has an allowed role
  const hasAllowedRole = profile && allowedRoles.includes(profile.role as UserRole);
  
  if (!hasAllowedRole) {
    // Redirect to appropriate dashboard if user doesn't have the right role
    return <Navigate to={getDashboardRoute()} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
