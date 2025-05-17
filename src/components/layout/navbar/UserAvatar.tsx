
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { UserProfile } from "@/lib/types/auth";

interface UserAvatarProps {
  profile: UserProfile | null;
  isLoading: boolean;
  getInitials: () => string;
}

export const UserAvatar = ({ profile, isLoading, getInitials }: UserAvatarProps) => {
  if (isLoading) {
    return (
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-gray-200">
          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar className="h-8 w-8">
      <AvatarFallback className="bg-brand-blue text-white text-sm">
        {getInitials()}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
