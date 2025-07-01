
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface ProfileFormData {
  age: string;
  gender: string;
  timezone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
}

const ClientProfile = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");

  const { register, handleSubmit, setValue, watch } = useForm<ProfileFormData>({
    defaultValues: {
      age: "28",
      gender: "male",
      timezone: "PST",
      emergencyContactName: "Jane Smith",
      emergencyContactPhone: "+1 (555) 234-5678",
      emergencyContactRelationship: "Sister"
    }
  });

  const getInitials = () => {
    if (!profile) return "U";
    
    const firstName = profile.first_name || "";
    const lastName = profile.last_name || "";
    
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    } else if (firstName) {
      return firstName.charAt(0).toUpperCase();
    } else if (profile.email) {
      return profile.email.charAt(0).toUpperCase();
    } else {
      return "U";
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    console.log("Form submitted:", data);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
            <p className="text-gray-600">
              Manage your personal information and emergency contacts
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="personal" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Personal
              </TabsTrigger>
              <TabsTrigger value="therapy" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Therapy
              </TabsTrigger>
              <TabsTrigger value="account" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Account
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Privacy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information Card */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar className="h-20 w-20 text-xl bg-primary text-white">
                          <AvatarFallback className="bg-primary text-white text-xl">
                            {getInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <Button
                          type="button"
                          size="sm"
                          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary hover:bg-primary/90 text-white p-0"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {profile?.first_name} {profile?.last_name}
                        </h3>
                        <p className="text-gray-600">{profile?.email}</p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                          Age
                        </Label>
                        <Input
                          id="age"
                          type="number"
                          {...register("age")}
                          className="h-10"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                          Gender
                        </Label>
                        <Select value={watch("gender")} onValueChange={(value) => setValue("gender", value)}>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone" className="text-sm font-medium text-gray-700">
                          Timezone
                        </Label>
                        <Select value={watch("timezone")} onValueChange={(value) => setValue("timezone", value)}>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
                            <SelectItem value="MST">Mountain Standard Time (MST)</SelectItem>
                            <SelectItem value="CST">Central Standard Time (CST)</SelectItem>
                            <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                            <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact Card */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      Emergency Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactName" className="text-sm font-medium text-gray-700">
                          Full Name
                        </Label>
                        <Input
                          id="emergencyContactName"
                          {...register("emergencyContactName")}
                          className="h-10"
                          placeholder="Enter full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactPhone" className="text-sm font-medium text-gray-700">
                          Phone Number
                        </Label>
                        <Input
                          id="emergencyContactPhone"
                          {...register("emergencyContactPhone")}
                          className="h-10"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactRelationship" className="text-sm font-medium text-gray-700">
                        Relationship
                      </Label>
                      <Input
                        id="emergencyContactRelationship"
                        {...register("emergencyContactRelationship")}
                        className="h-10"
                        placeholder="e.g., Sister, Mother, Friend"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-2 h-10"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="therapy" className="space-y-6">
              <Card className="shadow-lg border-0 bg-white">
                <CardContent className="p-8">
                  <div className="text-center text-gray-500">
                    <p>Therapy preferences and history will be available here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <Card className="shadow-lg border-0 bg-white">
                <CardContent className="p-8">
                  <div className="text-center text-gray-500">
                    <p>Account settings and security options will be available here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card className="shadow-lg border-0 bg-white">
                <CardContent className="p-8">
                  <div className="text-center text-gray-500">
                    <p>Privacy settings and data management options will be available here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
