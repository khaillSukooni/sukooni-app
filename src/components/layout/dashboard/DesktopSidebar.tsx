
import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

interface DesktopSidebarProps {
  navigationItems: {
    label: string;
    icon: React.ElementType;
    path: string;
  }[];
  handleSignOut: () => Promise<void>;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ 
  navigationItems,
  handleSignOut
}) => {
  const navigate = useNavigate();
  
  return (
    <aside className="hidden md:flex md:w-64 flex-col bg-white border-r">
      <div className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => (
          <button
            key={item.path}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => navigate(item.path)}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <div className="p-4 border-t">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md hover:bg-gray-100 text-red-600 transition-colors"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
