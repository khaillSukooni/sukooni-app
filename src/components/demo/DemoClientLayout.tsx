import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import DashboardHeader from "../layout/dashboard/DashboardHeader";
import DesktopSidebar from "../layout/dashboard/DesktopSidebar";
import MobileSidebar from "../layout/dashboard/MobileSidebar";
import { navigationItems } from "../layout/dashboard/navigationItems";

const DemoClientLayout = () => {
  const { demoProfile, exitDemoMode } = useDemo();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    exitDemoMode();
    navigate("/");
  };

  const getInitials = () => {
    if (!demoProfile) return "";
    
    const firstName = demoProfile.first_name || "";
    const lastName = demoProfile.last_name || "";
    
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    } else if (firstName) {
      return firstName.charAt(0).toUpperCase();
    } else if (demoProfile.email) {
      return demoProfile.email.charAt(0).toUpperCase();
    }
    return "";
  };

  const getFullName = () => {
    if (!demoProfile) return "";
    
    const firstName = demoProfile.first_name || "";
    const lastName = demoProfile.last_name || "";
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    }
    return demoProfile.email || "";
  };

  const getDashboardRoute = () => "/demo/client";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Demo Mode Indicator */}
      <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 flex items-center justify-between">
        <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
          Demo Mode - Client View
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="text-blue-700 hover:text-blue-900"
        >
          <X className="h-4 w-4 mr-1" />
          Exit Demo
        </Button>
      </div>

      <DashboardHeader 
        profile={demoProfile}
        getInitials={getInitials}
        getFullName={getFullName}
        handleSignOut={handleSignOut}
        getDashboardRoute={getDashboardRoute}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        <DesktopSidebar 
          navigationItems={navigationItems}
          handleSignOut={handleSignOut}
        />
        
        <MobileSidebar
          navigationItems={navigationItems}
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

export default DemoClientLayout;