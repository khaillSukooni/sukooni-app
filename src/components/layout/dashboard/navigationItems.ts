
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare,
  User, 
  Settings
} from "lucide-react";

export const navigationItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/client" },
  { label: "Appointments", icon: Calendar, path: "/dashboard/client/appointments" },
  { label: "Secure Messaging", icon: MessageSquare, path: "/dashboard/client/messages" },
  { label: "Profile", icon: User, path: "/dashboard/client/profile" },
  { label: "Settings", icon: Settings, path: "/dashboard/client/settings" },
];
