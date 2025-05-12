
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

// Define routes for future pages
// These will be implemented in future iterations
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    
    {/* Auth routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    
    {/* Protected routes */}
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<NotFound />} />
    </Route>

    {/* Client-specific routes */}
    <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
      <Route path="/appointments" element={<NotFound />} />
      <Route path="/book/:therapistId" element={<NotFound />} />
    </Route>

    {/* Therapist-specific routes */}
    <Route element={<ProtectedRoute allowedRoles={["therapist"]} />}>
      <Route path="/schedule" element={<NotFound />} />
      <Route path="/clients" element={<NotFound />} />
    </Route>

    {/* Admin-specific routes */}
    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
      <Route path="/admin/therapists" element={<NotFound />} />
      <Route path="/admin/clients" element={<NotFound />} />
      <Route path="/admin/appointments" element={<NotFound />} />
    </Route>
    
    {/* Content pages - to be implemented */}
    <Route path="/about" element={<NotFound />} />
    <Route path="/services" element={<NotFound />} />
    <Route path="/resources" element={<NotFound />} />
    <Route path="/contact" element={<NotFound />} />
    <Route path="/faq" element={<NotFound />} />
    <Route path="/therapists" element={<NotFound />} />
    <Route path="/therapists/:id" element={<NotFound />} />
    <Route path="/organizations" element={<NotFound />} />
    
    {/* Legal pages - to be implemented */}
    <Route path="/terms" element={<NotFound />} />
    <Route path="/privacy" element={<NotFound />} />
    
    {/* Catch-all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
