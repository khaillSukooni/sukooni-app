
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ClientProfile = () => {
  const { profile, refreshProfile, user } = useAuth();

  // Refresh profile data on component mount
  useEffect(() => {
    if (user?.id) {
      console.log("ClientProfile: refreshing profile");
      refreshProfile();
    }
  }, [user?.id, refreshProfile]);

  const getInitials = () => {
    if (!profile) return "";
    
    const firstName = profile.first_name || "";
    const lastName = profile.last_name || "";
    
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    } else if (firstName) {
      return firstName.charAt(0).toUpperCase();
    } else if (profile.email) {
      return profile.email.charAt(0).toUpperCase();
    } else {
      return "";
    }
  };

  if (!profile) {
    return <div className="flex justify-center items-center p-8">Loading profile data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your personal information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <Avatar className="h-24 w-24 text-2xl bg-brand-blue text-white">
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>

            <div className="space-y-3 text-center sm:text-left">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                <p className="text-lg">{profile.first_name || ""} {profile.last_name || ""}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <p className="text-lg">{profile.email || ""}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Account Type</h3>
                <p className="text-lg capitalize">{profile.role || ""}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Joined On</h3>
                <p className="text-lg">
                  {profile.created_at ? new Date(profile.created_at).toLocaleDateString("en-US", { 
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientProfile;
