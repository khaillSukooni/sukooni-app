
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Menu, X, LogOut, LayoutDashboard, FileText, Shield, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserProfile } from "@/lib/types/auth";
import UserAvatar from "./UserAvatar";

interface NavItem {
  title: string;
  path: string;
  isAnchorLink?: boolean;
}

interface MobileMenuProps {
  navLinks: NavItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  profile: UserProfile | null;
  user: any | null;
  isAuthenticated: boolean;
  showProfileLoading: boolean;
  getInitials: () => string;
  getFullName: () => string;
  getDashboardRoute: () => string;
  handleHowItWorksClick: (e: React.MouseEvent) => void;
  closeMobileMenu: () => void;
  handleSignOut: (e: React.MouseEvent) => void;
}

const MobileMenu = ({ 
  navLinks, 
  isOpen, 
  setIsOpen,
  profile,
  user,
  isAuthenticated,
  showProfileLoading,
  getInitials,
  getFullName,
  getDashboardRoute,
  handleHowItWorksClick,
  closeMobileMenu,
  handleSignOut
}: MobileMenuProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          className="p-1.5 text-brand-gray-600 hover:text-brand-blue hover:bg-transparent focus:bg-transparent focus:outline-none"
          aria-label="Menu"
        >
          <Menu className="h-7 w-7" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-full px-0 sm:max-w-full pt-16 border-none"
        hideCloseButton={true}
      >
        <div className="h-full flex flex-col">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-md text-brand-gray-600 hover:text-brand-blue hover:bg-transparent focus:bg-transparent focus:outline-none"
            aria-label="Close menu"
          >
            <X className="h-7 w-7" />
          </button>
          
          <div className="flex-1 overflow-auto px-6">
            <div className="flex flex-col py-6 space-y-3">
              {navLinks.map((link, index) => 
                link.isAnchorLink ? (
                  <a 
                    key={index}
                    href={link.path}
                    className="text-brand-gray-700 hover:text-brand-blue transition-colors px-3 py-3 rounded-md text-base font-medium"
                    onClick={handleHowItWorksClick}
                  >
                    {link.title}
                  </a>
                ) : (
                  <Link 
                    key={index}
                    to={link.path} 
                    className="text-brand-gray-700 hover:text-brand-blue transition-colors px-3 py-3 rounded-md text-base font-medium"
                    onClick={closeMobileMenu}
                  >
                    {link.title}
                  </Link>
                )
              )}
            </div>
          </div>
          
          <div className="border-t border-brand-gray-200 bg-brand-gray-50/70 p-6 mt-auto">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  {showProfileLoading ? (
                    <>
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gray-200 flex items-center justify-center">
                          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Loading profile...</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <UserAvatar isLoading={false} profile={profile} getInitials={getInitials} />
                      <div>
                        <p className="font-medium">{getFullName()}</p>
                        <p className="text-sm text-brand-gray-600">{profile?.email || user?.email || ""}</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="grid gap-3">
                  <Button className="w-full justify-start gap-2" asChild onClick={closeMobileMenu}>
                    <Link to={getDashboardRoute()}>
                      <LayoutDashboard className="h-4 w-4" />
                      My Dashboard
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2 text-red-600" 
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                  <Separator className="my-2" />
                  <div className="text-xs text-muted-foreground flex justify-center">
                    <Link to="/terms" className="hover:underline flex items-center" onClick={closeMobileMenu}>
                      <FileText className="mr-1 h-3 w-3" />
                      Terms
                    </Link>
                    <span className="mx-1"> • </span>
                    <Link to="/privacy" className="hover:underline flex items-center" onClick={closeMobileMenu}>
                      <Shield className="mr-1 h-3 w-3" />
                      Privacy
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="grid gap-3">
                <Button className="w-full text-base py-5" asChild onClick={closeMobileMenu}>
                  <Link to="/signup">Join Now</Link>
                </Button>
                <Button variant="outline" className="w-full text-base py-5" asChild onClick={closeMobileMenu}>
                  <Link to="/login">Log In</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
