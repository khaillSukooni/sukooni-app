import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SetPassword from "./pages/SetPassword";
import Therapists from "./pages/Therapists";
import ClientMessages from "./pages/client/ClientMessages";

import ClientDashboardLayout from "./components/layout/ClientDashboardLayout";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientAppointments from "./pages/client/ClientAppointments";
import ClientProfile from "./pages/client/ClientProfile";
import ClientSettings from "./pages/client/ClientSettings";
import AuthGuard from "./components/auth/AuthGuard";
import DashboardRedirect from "./components/auth/DashboardRedirect";

// Admin imports
import AdminDashboardLayout from "./components/layout/AdminDashboardLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminClients from "./pages/admin/AdminClients";
import AdminTherapists from "./pages/admin/AdminTherapists";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route path="/about" element={<NotFound />} />
            <Route path="/services" element={<NotFound />} />
            <Route path="/resources" element={<NotFound />} />
            <Route path="/contact" element={<NotFound />} />
            <Route path="/faq" element={<NotFound />} />
            <Route path="/therapists" element={<Therapists />} />
            <Route path="/therapists/:id" element={<NotFound />} />
            <Route path="/organizations" element={<NotFound />} />
            <Route path="/terms" element={<NotFound />} />
            <Route path="/privacy" element={<NotFound />} />
            
            {/* Dashboard redirect route with auth guard - this is a special component that handles profile loading */}
            <Route path="/dashboard" element={<AuthGuard><DashboardRedirect /></AuthGuard>} />
            <Route path="/profile" element={<AuthGuard><NotFound /></AuthGuard>} />

            {/* Client-specific routes */}
            <Route path="/dashboard/client" element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ClientDashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<ClientDashboard />} />
              <Route path="appointments" element={<ClientAppointments />} />
              <Route path="profile" element={<ClientProfile />} />
              <Route path="settings" element={<ClientSettings />} />
              <Route path="messages" element={<ClientMessages />} />
            </Route>

            {/* Therapist-specific routes */}
            <Route path="/dashboard/therapist" element={
              <ProtectedRoute allowedRoles={["therapist"]}>
                <NotFound />
              </ProtectedRoute>
            } />
            
            {/* Admin-specific routes */}
            <Route path="/dashboard/admin" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="appointments" element={<AdminAppointments />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="therapists" element={<AdminTherapists />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
