
import React from "react";
import NavLink from "./NavLink";

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
  return (
    <div className="hidden md:flex items-center space-x-1">
      {links.map((link, index) => 
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
  );
};

export default NavLinks;
