
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { Menu, X, LogOut, LayoutDashboard, FileText, Shield, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const NavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link 
    to={to} 
    className="text-brand-gray-600 hover:text-brand-blue transition-colors px-3 py-2 rounded-md text-sm font-medium"
    onClick={onClick}
  >
    {children}
  </Link>
);

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { 
    user, 
    profile, 
    signOut, 
    getDashboardRoute, 
    isAuthenticated, 
    isLoading, 
    isProfileLoading 
  } = useAuth();
  
  // Add debug logging to see what's happening with auth state
  useEffect(() => {
    console.log("Navbar rendered with auth state:", { 
      isAuthenticated, 
      hasUser: !!user, 
      hasProfile: !!profile,
      isLoading,
      isProfileLoading,
      path: window.location.pathname
    });
  }, [isAuthenticated, user, profile, isLoading, isProfileLoading]);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMobileMenu = () => setIsOpen(false);

  const handleHowItWorksClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('how-it-works');
    closeMobileMenu();
  };

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default link behavior
    console.log("Sign out clicked");
    signOut();
    closeMobileMenu();
  };
  
  // Get user initials for avatar
  const getInitials = () => {
    if (!isAuthenticated || !profile) return "";
    
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

  // Common navigation links for both desktop and mobile views
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "How It Works", path: "#how-it-works", isAnchorLink: true },
    { title: "Our Therapists", path: "/therapists" },
    { title: "Pricing", path: "/pricing" },
    { title: "About Us", path: "/about" },
  ];
  
  // Get full name display
  const getFullName = () => {
    if (!isAuthenticated || !profile) return "";
    
    const firstName = profile.first_name || "";
    const lastName = profile.last_name || "";
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    }
    return profile.email || "";
  };

  // Determine if we should show loading state
  const showProfileLoading = isAuthenticated && (isProfileLoading || !profile);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-brand-gray-200">
      <div className="container-tight py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          
          {/* Desktop Menu - always visible regardless of loading state */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => 
              link.isAnchorLink ? (
                <a 
                  key={index}
                  href={link.path} 
                  className="text-brand-gray-600 hover:text-brand-blue transition-colors px-3 py-2 rounded-md text-sm font-medium"
                  onClick={handleHowItWorksClick}
                >
                  {link.title}
                </a>
              ) : (
                <NavLink key={index} to={link.path}>
                  {link.title}
                </NavLink>
              )
            )}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {/* Always show appropriate authentication UI */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none" asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      {showProfileLoading ? (
                        <>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gray-200">
                              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">Loading...</span>
                        </>
                      ) : (
                        <>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-brand-blue text-white text-sm">
                              {getInitials()}
                            </AvatarFallback>
                          </Avatar>
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
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Join Now</Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button - always visible regardless of loading state */}
          <div className="md:hidden">
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
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-brand-blue text-white">
                                  {getInitials()}
                                </AvatarFallback>
                              </Avatar>
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
          </div>
        </div>
      </div>
    </nav>
  );
}
