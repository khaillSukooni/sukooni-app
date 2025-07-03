import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Users, Shield } from "lucide-react";

// Import dashboard layouts
import ClientDashboardLayout from "@/components/layout/ClientDashboardLayout";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";

// Import dashboard pages
import ClientDashboard from "@/pages/client/ClientDashboard";
import ClientAppointments from "@/pages/client/ClientAppointments";
import ClientCheckIns from "@/pages/client/ClientCheckIns";
import ClientProfile from "@/pages/client/ClientProfile";
import ClientMessages from "@/pages/client/ClientMessages";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminAppointments from "@/pages/admin/AdminAppointments";
import AdminClients from "@/pages/admin/AdminClients";
import AdminTherapists from "@/pages/admin/AdminTherapists";

type UserRole = "client" | "therapist" | "admin";
type ViewType = "dashboard" | "appointments" | "checkins" | "profile" | "messages" | "clients" | "therapists";

const DemoSwitcher = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("client");
  const [selectedView, setSelectedView] = useState<ViewType>("dashboard");

  const roles = [
    { id: "client" as UserRole, label: "Client", icon: User, color: "bg-blue-500" },
    { id: "therapist" as UserRole, label: "Therapist", icon: Users, color: "bg-green-500" },
    { id: "admin" as UserRole, label: "Admin", icon: Shield, color: "bg-purple-500" },
  ];

  const getAvailableViews = (role: UserRole) => {
    switch (role) {
      case "client":
        return [
          { id: "dashboard" as ViewType, label: "Dashboard" },
          { id: "appointments" as ViewType, label: "My Sessions" },
          { id: "checkins" as ViewType, label: "Check-ins" },
          { id: "profile" as ViewType, label: "Profile" },
          { id: "messages" as ViewType, label: "Messages" },
        ];
      case "therapist":
        return [
          { id: "dashboard" as ViewType, label: "Dashboard" },
        ];
      case "admin":
        return [
          { id: "dashboard" as ViewType, label: "Dashboard" },
          { id: "appointments" as ViewType, label: "Appointments" },
          { id: "clients" as ViewType, label: "Clients" },
          { id: "therapists" as ViewType, label: "Therapists" },
        ];
      default:
        return [];
    }
  };

  const renderContent = () => {
    if (selectedRole === "therapist") {
      return (
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <div className="text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Therapist Dashboard</h3>
            <p className="text-gray-600">Therapist interface coming soon</p>
          </div>
        </div>
      );
    }

    if (selectedRole === "client") {
      switch (selectedView) {
        case "dashboard":
          return <ClientDashboard />;
        case "appointments":
          return <ClientAppointments />;
        case "checkins":
          return <ClientCheckIns />;
        case "profile":
          return <ClientProfile />;
        case "messages":
          return <ClientMessages />;
        default:
          return <ClientDashboard />;
      }
    }

    if (selectedRole === "admin") {
      switch (selectedView) {
        case "dashboard":
          return <AdminDashboard />;
        case "appointments":
          return <AdminAppointments />;
        case "clients":
          return <AdminClients />;
        case "therapists":
          return <AdminTherapists />;
        default:
          return <AdminDashboard />;
      }
    }

    return null;
  };

  const availableViews = getAvailableViews(selectedRole);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Controls */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">Demo Dashboard</h1>
                <p className="text-gray-600">Switch between different user roles to see the interface</p>
              </div>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Demo Mode
              </Badge>
            </div>

            {/* Role Switcher */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User Role</label>
                <div className="flex gap-2">
                  {roles.map((role) => (
                    <Button
                      key={role.id}
                      variant={selectedRole === role.id ? "default" : "outline"}
                      onClick={() => {
                        setSelectedRole(role.id);
                        setSelectedView("dashboard");
                      }}
                      className="flex items-center gap-2"
                    >
                      <role.icon className="h-4 w-4" />
                      {role.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* View Switcher */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Page View</label>
                <div className="flex flex-wrap gap-2">
                  {availableViews.map((view) => (
                    <Button
                      key={view.id}
                      variant={selectedView === view.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedView(view.id)}
                    >
                      {view.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative">
        {renderContent()}
      </div>
    </div>
  );
};

export default DemoSwitcher;