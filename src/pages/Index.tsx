
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ValueSection from "@/components/home/ValueSection";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import TherapistCarouselSection from "@/components/home/TherapistCarouselSection";

const Index = () => {
  const { isAuthenticated, getDashboardRoute } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is authenticated, redirect to their dashboard
    if (isAuthenticated) {
      const dashboardRoute = getDashboardRoute();
      if (dashboardRoute) {
        navigate(dashboardRoute);
      }
    }
  }, [isAuthenticated, navigate, getDashboardRoute]);

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
