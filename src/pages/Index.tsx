
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ValueSection from "@/components/home/ValueSection";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import TherapistCarouselSection from "@/components/home/TherapistCarouselSection";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const { needsPasswordSetup, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if we have a hash in the URL which might contain an access token
    const hash = window.location.hash;
    
    if (hash && hash.includes("access_token") && hash.includes("type=invite")) {
      console.log("Detected invite link with access token in URL");
      
      // Handle the URL auth session
      const handleAuthSession = async () => {
        try {
          // This will set the session from the URL
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("Error getting session from URL:", error);
            return;
          }
          
          if (data.session) {
            console.log("Successfully retrieved session from URL");
            // Force redirect to reset password page with isSetPassword flag
            navigate("/reset-password", { state: { isSetPassword: true } });
          }
        } catch (err) {
          console.error("Error processing auth session from URL:", err);
        }
      };
      
      handleAuthSession();
    } else if (isAuthenticated && !isLoading) {
      // If user is already authenticated but visiting the homepage,
      // redirect them to their dashboard
      if (needsPasswordSetup) {
        navigate("/reset-password", { state: { isSetPassword: true } });
      } else {
        navigate("/dashboard");
      }
    }
  }, [navigate, isAuthenticated, isLoading, needsPasswordSetup]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ValueSection />
        <TherapistCarouselSection />
        <HowItWorks />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
