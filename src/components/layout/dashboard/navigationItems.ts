
import { 
  LayoutDashboard, 
  Search,
  ClipboardCheck,
  Calendar, 
  MessageSquare,
  User
} from "lucide-react";

export const navigationItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/client" },
  { label: "Find Therapists", icon: Search, path: "/dashboard/client/find-therapists" },
  { label: "Check-ins", icon: ClipboardCheck, path: "/dashboard/client/check-ins" },
  { label: "My Sessions", icon: Calendar, path: "/dashboard/client/appointments" },
  { label: "Messages", icon: MessageSquare, path: "/dashboard/client/messages" },
  { label: "Profile", icon: User, path: "/dashboard/client/profile" },
];
