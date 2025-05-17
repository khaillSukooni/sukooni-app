
import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import Logo from "@/components/ui/Logo";

interface MobileSidebarProps {
  navigationItems: {
    label: string;
    icon: React.ElementType;
    path: string;
  }[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSignOut: () => Promise<void>;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  navigationItems,
  isOpen,
  setIsOpen,
  handleSignOut
}) => {
  const navigate = useNavigate();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="p-2 md:hidden">
        {/* Trigger is handled by parent component */}
      </SheetTrigger>
      <SheetContent side="left" className="w-64 sm:max-w-none p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Logo />
          </div>
          <nav className="flex-1 p-2 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                className="flex items-center gap-3 px-3 py-2 w-full rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md hover:bg-gray-100 text-red-600 transition-colors"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
