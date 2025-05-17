
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/contexts/AuthContext";
import NavLinks from "./navbar/NavLinks";
import UserMenuDesktop from "./navbar/UserMenuDesktop";
import AuthButtons from "./navbar/AuthButtons";
import MobileMenu from "./navbar/MobileMenu";

// Helper function for smooth scrolling
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
          <NavLinks links={navLinks} handleHowItWorksClick={handleHowItWorksClick} />
          
          <div className="hidden md:flex items-center space-x-4">
            {/* Always show appropriate authentication UI */}
            {isAuthenticated ? (
              <UserMenuDesktop 
                profile={profile}
                user={user}
                isLoading={isLoading}
                showProfileLoading={showProfileLoading}
                getInitials={getInitials}
                getFullName={getFullName}
                getDashboardRoute={getDashboardRoute}
                handleSignOut={handleSignOut}
              />
            ) : (
              <AuthButtons />
            )}
          </div>
          
          {/* Mobile Menu Button - always visible regardless of loading state */}
          <div className="md:hidden">
            <MobileMenu 
              navLinks={navLinks}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              profile={profile}
              user={user}
              isAuthenticated={isAuthenticated}
              showProfileLoading={showProfileLoading}
              getInitials={getInitials}
              getFullName={getFullName}
              getDashboardRoute={getDashboardRoute}
              handleHowItWorksClick={handleHowItWorksClick}
              closeMobileMenu={closeMobileMenu}
              handleSignOut={handleSignOut}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
