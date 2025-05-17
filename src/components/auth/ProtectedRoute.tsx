
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "@/lib/types/auth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles = [],
  redirectTo = "/login",
}) => {
  const { user, profile, isLoading, getDashboardRoute } = useAuth();

  // If authentication is still loading, show loading indicator
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // If user is not logged in, redirect to login
  if (!user) {
    console.log("User not authenticated, redirecting to:", redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  // If allowedRoles is empty, allow any authenticated user
  if (allowedRoles.length === 0) {
    return <Outlet />;
  }

  // Check if profile exists and user has an allowed role
  if (!profile) {
    console.log("Profile not found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // Check if user has an allowed role
  const hasAllowedRole = allowedRoles.includes(profile.role as UserRole);
  
  if (!hasAllowedRole) {
    console.log("User doesn't have required role, redirecting to their dashboard");
    // Get appropriate dashboard route based on user's role
    const dashboardRoute = getDashboardRoute();
    return <Navigate to={dashboardRoute} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
