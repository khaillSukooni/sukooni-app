
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Dashboard = () => {
  const { user, profile, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.first_name || "User"}!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {profile?.first_name} {profile?.last_name}</p>
              <p><span className="font-medium">Email:</span> {profile?.email}</p>
              <p><span className="font-medium">Role:</span> {profile?.role}</p>
            </div>
          </div>

          {profile?.role === "client" && (
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white rounded-md py-2 px-4">
                  Book an Appointment
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md py-2 px-4">
                  View Upcoming Sessions
                </button>
              </div>
            </div>
          )}

          {profile?.role === "therapist" && (
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white rounded-md py-2 px-4">
                  View Schedule
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md py-2 px-4">
                  Manage Clients
                </button>
              </div>
            </div>
          )}

          {profile?.role === "admin" && (
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
              <div className="space-y-4">
                <button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white rounded-md py-2 px-4">
                  Manage Therapists
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md py-2 px-4">
                  View All Appointments
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
