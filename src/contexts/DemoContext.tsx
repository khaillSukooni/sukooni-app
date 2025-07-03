import React, { createContext, useContext, useState } from "react";
import { UserProfile } from "@/lib/types/auth";

interface DemoContextType {
  isDemoMode: boolean;
  demoRole: "client" | "therapist" | "admin" | null;
  demoProfile: UserProfile | null;
  enterDemoMode: (role: "client" | "therapist" | "admin") => void;
  exitDemoMode: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const mockProfiles: Record<"client" | "therapist" | "admin", UserProfile> = {
  client: {
    id: "demo-client-id",
    email: "demo.client@sukooni.com",
    first_name: "Sarah",
    last_name: "Johnson",
    role: "client",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  therapist: {
    id: "demo-therapist-id",
    email: "demo.therapist@sukooni.com",
    first_name: "Dr. Michael",
    last_name: "Smith",
    role: "therapist",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  admin: {
    id: "demo-admin-id",
    email: "demo.admin@sukooni.com",
    first_name: "Admin",
    last_name: "User",
    role: "admin",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
};

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoRole, setDemoRole] = useState<"client" | "therapist" | "admin" | null>(null);
  const [demoProfile, setDemoProfile] = useState<UserProfile | null>(null);

  const enterDemoMode = (role: "client" | "therapist" | "admin") => {
    setIsDemoMode(true);
    setDemoRole(role);
    setDemoProfile(mockProfiles[role]);
  };

  const exitDemoMode = () => {
    setIsDemoMode(false);
    setDemoRole(null);
    setDemoProfile(null);
  };

  return (
    <DemoContext.Provider
      value={{
        isDemoMode,
        demoRole,
        demoProfile,
        enterDemoMode,
        exitDemoMode,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
};