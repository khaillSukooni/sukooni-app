
import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronDown, Menu } from "lucide-react";

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

import Logo from "@/components/ui/Logo";
import { UserProfile } from "@/lib/types/auth";

interface DashboardHeaderProps {
  profile: UserProfile | null;
  getInitials: () => string;
  getFullName: () => string;
  handleSignOut: () => Promise<void>;
  getDashboardRoute: () => string;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  profile,
  getInitials,
  getFullName,
  handleSignOut,
  getDashboardRoute,
  setIsMobileMenuOpen,
}) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-4">
          <button 
            className="p-2 md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
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
                  {profile?.email || ""}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => navigate(getDashboardRoute())}
                className="cursor-pointer"
              >
                <div className="mr-2 h-4 w-4">
                  {/* Icon is passed from parent */}
                </div>
                <span>My Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleSignOut}
                className="text-red-600 cursor-pointer"
              >
                <div className="mr-2 h-4 w-4">
                  {/* Icon is passed from parent */}
                </div>
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
  );
};

export default DashboardHeader;
