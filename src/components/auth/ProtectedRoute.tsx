
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserRole } from "@/lib/types/auth";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles = [],
  redirectTo = "/login",
}) => {
  const { user, profile, isLoading, authInitialized, getDashboardRoute } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute state:", {
    path: location.pathname,
    isLoading,
    authInitialized,
    hasUser: !!user,
    userRole: profile?.role,
    allowedRoles
  });

  // If authentication is still initializing, show loading state
  if (!authInitialized || isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-8 w-48 mx-auto" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Loading authentication...
          </div>
        </div>
      </div>
    );
  }

  // If user is not logged in, redirect to login
  if (!user) {
    console.log("No user found, redirecting to login");
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // If allowedRoles is empty, allow any authenticated user
  if (allowedRoles.length === 0) {
    console.log("No roles required, allowing access");
    return <Outlet />;
  }

  // Check if user has an allowed role
  const hasAllowedRole = profile && allowedRoles.includes(profile.role as UserRole);
  
  if (!hasAllowedRole) {
    console.log("User doesn't have allowed role, redirecting to dashboard");
    // Redirect to appropriate dashboard if user doesn't have the right role
    return <Navigate to={getDashboardRoute()} replace />;
  }

  console.log("Access granted to protected route");
  return <Outlet />;
};

export default ProtectedRoute;
