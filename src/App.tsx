
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Therapists from "./pages/Therapists";

import ClientDashboardLayout from "./components/layout/ClientDashboardLayout";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientAppointments from "./pages/client/ClientAppointments";
import ClientProfile from "./pages/client/ClientProfile";
import ClientSettings from "./pages/client/ClientSettings";

const queryClient = new QueryClient();

// Helper component to redirect to the appropriate dashboard
const DashboardRedirect = () => {
  const { getDashboardRoute, user, isLoading } = useAuth();
  
  console.log("DashboardRedirect rendering:", { user, isLoading });
  
  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }
  
  if (!user) {
    console.log("DashboardRedirect: No user, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  const route = getDashboardRoute();
  console.log("DashboardRedirect: Redirecting to", route);
  return <Navigate to={route} replace />;
};

// Define routes for future pages
const AppRoutes = () => {
  const { isLoading } = useAuth();
  
  console.log("AppRoutes rendering, isLoading:", isLoading);
  
  // Show a loading indicator while initial auth check is in progress
  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <p>Loading authentication...</p>
      </div>
    );
  }
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        {/* Dashboard redirect */}
        <Route path="/dashboard" element={<DashboardRedirect />} />
      </Route>

      {/* Client-specific routes */}
      <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
        <Route path="/dashboard/client" element={<ClientDashboardLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="appointments" element={<ClientAppointments />} />
          <Route path="profile" element={<ClientProfile />} />
          <Route path="settings" element={<ClientSettings />} />
          <Route path="messages" element={<NotFound />} />
        </Route>
      </Route>

      {/* Therapist-specific routes */}
      <Route element={<ProtectedRoute allowedRoles={["therapist"]} />}>
        <Route path="/schedule" element={<NotFound />} />
        <Route path="/clients" element={<NotFound />} />
        <Route path="/dashboard/therapist" element={<NotFound />} />
      </Route>

      {/* Admin-specific routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin/therapists" element={<NotFound />} />
        <Route path="/admin/clients" element={<NotFound />} />
        <Route path="/admin/appointments" element={<NotFound />} />
        <Route path="/dashboard/admin" element={<NotFound />} />
      </Route>
      
      {/* Content pages */}
      <Route path="/about" element={<NotFound />} />
      <Route path="/services" element={<NotFound />} />
      <Route path="/resources" element={<NotFound />} />
      <Route path="/contact" element={<NotFound />} />
      <Route path="/faq" element={<NotFound />} />
      <Route path="/therapists" element={<Therapists />} />
      <Route path="/therapists/:id" element={<NotFound />} />
      <Route path="/organizations" element={<NotFound />} />
      
      {/* Legal pages */}
      <Route path="/terms" element={<NotFound />} />
      <Route path="/privacy" element={<NotFound />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  console.log("App component rendering");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
