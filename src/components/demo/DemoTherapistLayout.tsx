import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Users } from "lucide-react";

import DashboardHeader from "../layout/dashboard/DashboardHeader";

const DemoTherapistLayout = () => {
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

  const getDashboardRoute = () => "/demo/therapist";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Demo Mode Indicator */}
      <div className="bg-green-50 border-b border-green-200 px-4 py-2 flex items-center justify-between">
        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
          Demo Mode - Therapist View
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="text-green-700 hover:text-green-900"
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

      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <Users className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Therapist Dashboard</h3>
          <p className="text-gray-600 max-w-md">
            The therapist interface is coming soon. This will include session management, 
            client communication tools, and practice analytics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoTherapistLayout;