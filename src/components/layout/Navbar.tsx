
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { Menu, X } from "lucide-react";

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className="text-brand-gray-600 hover:text-brand-blue transition-colors px-3 py-2 rounded-md text-sm font-medium"
  >
    {children}
  </Link>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <NavLink to="/about">About</NavLink>
            <NavLink to="/therapists">Our Therapists</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/organizations">Organizations</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-gray-600 hover:text-brand-blue focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/about">About</NavLink>
            <NavLink to="/therapists">Our Therapists</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/organizations">Organizations</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-brand-gray-200">
            <div className="px-2 space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
