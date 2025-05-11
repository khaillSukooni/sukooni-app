
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Define routes for future pages
// These will be implemented in future iterations
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    
    {/* Auth routes - to be implemented */}
    <Route path="/login" element={<NotFound />} />
    <Route path="/signup" element={<NotFound />} />
    <Route path="/forgot-password" element={<NotFound />} />
    <Route path="/reset-password" element={<NotFound />} />
    
    {/* Client routes - to be implemented */}
    <Route path="/therapists" element={<NotFound />} />
    <Route path="/therapists/:id" element={<NotFound />} />
    <Route path="/book/:therapistId" element={<NotFound />} />
    <Route path="/dashboard" element={<NotFound />} />
    <Route path="/appointments" element={<NotFound />} />
    <Route path="/profile" element={<NotFound />} />
    
    {/* Content pages - to be implemented */}
    <Route path="/about" element={<NotFound />} />
    <Route path="/services" element={<NotFound />} />
    <Route path="/resources" element={<NotFound />} />
    <Route path="/contact" element={<NotFound />} />
    <Route path="/faq" element={<NotFound />} />
    
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
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
