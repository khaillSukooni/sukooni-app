
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

import DashboardHeader from "./dashboard/DashboardHeader";
import DesktopSidebar from "./dashboard/DesktopSidebar";
import MobileSidebar from "./dashboard/MobileSidebar";
import { adminNavigationItems } from "./dashboard/adminNavigationItems";

const AdminDashboardLayout = () => {
  const { user, profile, signOut, getDashboardRoute, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Verify authentication on component mount
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        console.log("No authenticated user found in admin dashboard layout, redirecting to login");
        navigate("/login");
      }
    };
    
    checkAuth();
  }, [navigate]);

  // If no authenticated user, show nothing
  if (!isAuthenticated || !user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const getInitials = () => {
    if (!profile) return "";
    
    const firstName = profile.first_name || "";
    const lastName = profile.last_name || "";
    
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    } else if (firstName) {
      return firstName.charAt(0).toUpperCase();
    } else if (profile.email) {
      return profile.email.charAt(0).toUpperCase();
    }
    return "";
  };

  const getFullName = () => {
    if (!profile) return "";
    
    const firstName = profile.first_name || "";
    const lastName = profile.last_name || "";
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    }
    return profile.email || "";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader 
        profile={profile}
        getInitials={getInitials}
        getFullName={getFullName}
        handleSignOut={handleSignOut}
        getDashboardRoute={getDashboardRoute}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        <DesktopSidebar 
          navigationItems={adminNavigationItems}
          handleSignOut={handleSignOut}
        />
        
        <MobileSidebar
          navigationItems={adminNavigationItems}
          isOpen={isMobileMenuOpen}
          setIsOpen={setIsMobileMenuOpen}
          handleSignOut={handleSignOut}
        />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
