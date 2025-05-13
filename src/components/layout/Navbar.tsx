
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link 
    to={to} 
    className="text-brand-gray-600 hover:text-brand-blue transition-colors px-3 py-2 rounded-md text-sm font-medium"
    onClick={onClick}
  >
    {children}
  </Link>
);

// Smooth scroll function to navigate to section by ID
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  
  const isLoggedIn = !!user;
  
  // Prevent background scroll when mobile menu is open
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
  
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-brand-gray-200">
      <div className="container-tight py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/">Home</NavLink>
            <a 
              href="#how-it-works" 
              className="text-brand-gray-600 hover:text-brand-blue transition-colors px-3 py-2 rounded-md text-sm font-medium"
              onClick={handleHowItWorksClick}
            >
              How It Works
            </a>
            <NavLink to="/therapists">Our Therapists</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/about">About Us</NavLink>
            
            {/* Show dashboard link if user is logged in */}
            {isLoggedIn && (
              <NavLink to="/dashboard">Dashboard</NavLink>
            )}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-brand-gray-600">
                  {profile?.first_name || 'User'}
                </span>
                <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                  <Link to="/profile">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={signOut}>
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
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
          
          {/* Mobile Menu Button */}
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
                // Remove the default close button from SheetContent
                hideCloseButton={true}
              >
                <div className="h-full flex flex-col">
                  {/* Custom close button - positioned more precisely */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-md text-brand-gray-600 hover:text-brand-blue hover:bg-transparent focus:bg-transparent focus:outline-none"
                    aria-label="Close menu"
                  >
                    <X className="h-7 w-7" />
                  </button>
                  
                  {/* Navigation Links */}
                  <div className="flex-1 overflow-auto px-6">
                    <div className="flex flex-col py-6 space-y-3">
                      <Link 
                        to="/" 
                        className="text-brand-gray-700 hover:text-brand-blue transition-colors px-3 py-3 rounded-md text-base font-medium"
                        onClick={closeMobileMenu}
                      >
                        Home
                      </Link>
                      <a 
                        href="#how-it-works" 
                        className="text-brand-gray-700 hover:text-brand-blue transition-colors px-3 py-3 rounded-md text-base font-medium"
                        onClick={handleHowItWorksClick}
                      >
                        How It Works
                      </a>
                      <Link 
                        to="/therapists" 
                        className="text-brand-gray-700 hover:text-brand-blue transition-colors px-3 py-3 rounded-md text-base font-medium"
                        onClick={closeMobileMenu}
                      >
                        Our Therapists
                      </Link>
                      <Link 
                        to="/pricing" 
                        className="text-brand-gray-700 hover:text-brand-blue transition-colors px-3 py-3 rounded-md text-base font-medium"
                        onClick={closeMobileMenu}
                      >
                        Pricing
                      </Link>
                      <Link 
                        to="/about" 
                        className="text-brand-gray-700 hover:text-brand-blue transition-colors px-3 py-3 rounded-md text-base font-medium"
                        onClick={closeMobileMenu}
                      >
                        About Us
                      </Link>
                      {isLoggedIn && (
                        <Link 
                          to="/dashboard" 
                          className="text-brand-gray-700 hover:text-brand-blue transition-colors px-3 py-3 rounded-md text-base font-medium"
                          onClick={closeMobileMenu}
                        >
                          Dashboard
                        </Link>
                      )}
                    </div>
                  </div>
                  
                  {/* Auth Buttons */}
                  <div className="border-t border-brand-gray-200 bg-brand-gray-50/70 p-6 mt-auto">
                    {isLoggedIn ? (
                      <>
                        <div className="flex items-center gap-3 mb-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{profile?.first_name?.[0] || 'U'}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{profile?.first_name || 'User'}</p>
                            <p className="text-sm text-brand-gray-600">{profile?.email}</p>
                          </div>
                        </div>
                        <div className="grid gap-3">
                          <Button variant="outline" className="w-full justify-start gap-2" asChild onClick={closeMobileMenu}>
                            <Link to="/profile">
                              <User className="h-4 w-4" />
                              Profile
                            </Link>
                          </Button>
                          <Button variant="outline" className="w-full justify-start gap-2" onClick={() => { signOut(); closeMobileMenu(); }}>
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </Button>
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
