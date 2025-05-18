
import React from "react";
import NavLink from "./NavLink";
import { useNavigate } from "react-router-dom";

interface NavItem {
  title: string;
  path: string;
  isAnchorLink?: boolean;
}

interface NavLinksProps {
  links: NavItem[];
  handleHowItWorksClick: (e: React.MouseEvent) => void;
}

const NavLinks = ({ links, handleHowItWorksClick }: NavLinksProps) => {
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    
    // If it's the therapists link, navigate directly without scrolling
    if (path === "/therapists") {
      navigate(path);
      window.scrollTo(0, 0);
    } else if (path.startsWith("#")) {
      // For anchor links like "How it works"
      handleHowItWorksClick(e);
    } else {
      // For other regular links
      navigate(path);
    }
  };

  return (
    <div className="hidden md:flex items-center space-x-1">
      {links.map((link, index) => (
        <a 
          key={index}
          href={link.path} 
          className="text-brand-gray-600 hover:text-brand-blue transition-colors px-3 py-2 rounded-md text-sm font-medium"
          onClick={(e) => handleNavClick(e, link.path)}
        >
          {link.title}
        </a>
      ))}
    </div>
  );
};

export default NavLinks;
