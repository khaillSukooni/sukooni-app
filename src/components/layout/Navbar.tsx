import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{profile?.first_name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-sm">{profile?.first_name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/client">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/client/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
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
              <SheetContent side="right" className="w-full px-0 sm:max-w-full pt-16 border-none" hideCloseButton>
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
                      <NavLink to="/" onClick={closeMobileMenu}>Home</NavLink>
                      <a href="#how-it-works" onClick={handleHowItWorksClick}>How It Works</a>
                      <NavLink to="/therapists" onClick={closeMobileMenu}>Our Therapists</NavLink>
                      <NavLink to="/pricing" onClick={closeMobileMenu}>Pricing</NavLink>
                      <NavLink to="/about" onClick={closeMobileMenu}>About Us</NavLink>
                      {isLoggedIn && <NavLink to="/dashboard/client" onClick={closeMobileMenu}>Dashboard</NavLink>}
                    </div>
                  </div>

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
                            <Link to="/dashboard/client/profile">
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
