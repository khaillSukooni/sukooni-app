
import React from "react";
import { Link } from "react-router-dom";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, FileText, Shield, Loader2 } from "lucide-react";
import { UserProfile } from "@/lib/types/auth";
import UserAvatar from "./UserAvatar";

interface UserMenuDesktopProps {
  profile: UserProfile | null;
  user: any | null;
  isLoading: boolean;
  showProfileLoading: boolean;
  getInitials: () => string;
  getFullName: () => string;
  getDashboardRoute: () => string;
  handleSignOut: (e: React.MouseEvent) => void;
}

const UserMenuDesktop = ({ 
  profile, 
  user, 
  isLoading, 
  showProfileLoading, 
  getInitials,
  getFullName, 
  getDashboardRoute, 
  handleSignOut 
}: UserMenuDesktopProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100">
          <div className="flex items-center gap-2">
            {showProfileLoading ? (
              <>
                <UserAvatar isLoading={true} profile={null} getInitials={getInitials} />
                <span className="text-sm text-muted-foreground">Loading...</span>
              </>
            ) : (
              <>
                <UserAvatar isLoading={false} profile={profile} getInitials={getInitials} />
                <span className="text-sm text-brand-gray-600">
                  {getFullName()}
                </span>
              </>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2">
          {showProfileLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p className="text-sm font-medium">Loading profile...</p>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium">{getFullName()}</p>
              <p className="text-xs text-muted-foreground">
                {profile?.email || user?.email || ""}
              </p>
            </>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={getDashboardRoute()} className="cursor-pointer flex items-center">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            My Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="px-2 py-2 text-xs text-muted-foreground flex justify-center">
          <Link to="/terms" className="hover:underline flex items-center">
            <FileText className="mr-1 h-3 w-3" />
            Terms
          </Link>
          <span className="mx-1"> • </span>
          <Link to="/privacy" className="hover:underline flex items-center">
            <Shield className="mr-1 h-3 w-3" />
            Privacy
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuDesktop;
