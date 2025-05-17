
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare,
  User, 
  Settings, 
  LogOut,
  Bell,
  ChevronDown, 
  Menu,
  X
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import Logo from "@/components/ui/Logo";

const ClientDashboardLayout = () => {
  const { user, profile, signOut, getDashboardRoute, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Always fetch fresh profile data on component mount
  useEffect(() => {
    if (user?.id) {
      console.log("ClientDashboardLayout: refreshing profile");
      refreshProfile();
    } else {
      console.log("ClientDashboardLayout: no user found, redirecting");
      navigate("/login");
    }
  }, [user?.id, refreshProfile, navigate]);

  // Redirect if no profile is found after a short delay
  useEffect(() => {
    if (user && !profile) {
      const timer = setTimeout(() => {
        console.log("ClientDashboardLayout: no profile found after delay, redirecting");
        navigate("/login");
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [user, profile, navigate]);

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
    } else {
      return "";
    }
  };

  const getFullName = () => {
    if (!profile) return "";
    
    const firstName = profile.first_name || "";
    const lastName = profile.last_name || "";
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (profile.email) {
      return profile.email;
    } else {
      return "";
    }
  };

  // If no user or profile, show loading
  if (!user || !profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading profile data...
      </div>
    );
  }

  const navigationItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/client" },
    { label: "Appointments", icon: Calendar, path: "/dashboard/client/appointments" },
    { label: "Secure Messaging", icon: MessageSquare, path: "/dashboard/client/messages" },
    { label: "Profile", icon: User, path: "/dashboard/client/profile" },
    { label: "Settings", icon: Settings, path: "/dashboard/client/settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2 md:hidden">
                  <Menu size={20} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 sm:max-w-none p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <Logo />
                  </div>
                  <nav className="flex-1 p-2 space-y-1">
                    {navigationItems.map((item) => (
                      <button
                        key={item.path}
                        className="flex items-center gap-3 px-3 py-2 w-full rounded-md hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          navigate(item.path);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </nav>
                  <div className="p-4 border-t">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md hover:bg-gray-100 text-red-600 transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="hidden md:block">
              <Logo />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Alert Icon */}
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
            </button>
            
            {/* Avatar with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 focus:outline-none">
                  <Avatar className="h-8 w-8 bg-brand-blue text-white">
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{getFullName()}</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">
                    {getFullName()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {profile.email || ""}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => navigate(getDashboardRoute())}
                  className="cursor-pointer"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>My Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleSignOut}
                  className="text-red-600 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="px-3 py-2 text-xs text-muted-foreground">
                  <a href="/terms" className="hover:underline">Terms & Conditions</a> • <a href="/privacy" className="hover:underline">Privacy Policy</a>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (hidden on mobile) */}
        <aside className="hidden md:flex md:w-64 flex-col bg-white border-r">
          <div className="flex-1 p-4 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                className="flex items-center gap-3 px-3 py-2 w-full rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => navigate(item.path)}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="p-4 border-t">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md hover:bg-gray-100 text-red-600 transition-colors"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientDashboardLayout;
