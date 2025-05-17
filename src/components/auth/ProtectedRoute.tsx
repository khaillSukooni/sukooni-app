
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserRole } from "@/lib/types/auth";
import Logo from "@/components/ui/Logo";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles = [],
  redirectTo = "/login",
}) => {
  const { user, profile, isLoading, getDashboardRoute, refreshProfile } = useAuth();
  const navigate = useNavigate();

  console.log("Protected route rendering:", {
    userId: user?.id,
    profileRole: profile?.role,
    isLoading,
    allowedRoles
  });

  // Fetch fresh profile data on mount or when user changes
  useEffect(() => {
    if (user?.id) {
      console.log("Protected route: refreshing profile");
      refreshProfile();
    }
  }, [user?.id, refreshProfile]);

  // If authentication is still loading, show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Logo size="lg" className="mb-4" />
        <p>Checking authentication...</p>
      </div>
    );
  }

  // If user is not logged in, redirect to login
  if (!user) {
    console.log("Protected route: No user, redirecting to login");
    return <Navigate to={redirectTo} replace />;
  }

  // If profile is not loaded yet, show loading
  if (user && !profile) {
    console.log("Protected route: User exists but no profile, showing loading");
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Logo size="lg" className="mb-4" />
        <p>Loading profile data...</p>
      </div>
    );
  }

  // If allowedRoles is empty, allow any authenticated user
  if (allowedRoles.length === 0) {
    console.log("Protected route: No role restrictions, allowing access");
    return <Outlet />;
  }

  // Check if user has an allowed role
  const hasAllowedRole = profile && allowedRoles.includes(profile.role as UserRole);
  
  if (!hasAllowedRole) {
    // Redirect to appropriate dashboard if user doesn't have the right role
    console.log("Protected route: User doesn't have allowed role, redirecting to dashboard");
    const dashboardRoute = getDashboardRoute();
    console.log("Redirecting to:", dashboardRoute);
    return <Navigate to={dashboardRoute} replace />;
  }

  console.log("Protected route: Access granted");
  return <Outlet />;
};

export default ProtectedRoute;
