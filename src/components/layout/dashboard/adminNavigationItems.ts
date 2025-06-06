
import { 
  Calendar, 
  Users, 
  User
} from "lucide-react";

export const adminNavigationItems = [
  { label: "Appointments", icon: Calendar, path: "/dashboard/admin/appointments" },
  { label: "Clients", icon: Users, path: "/dashboard/admin/clients" },
  { label: "Therapists", icon: User, path: "/dashboard/admin/therapists" },
];
