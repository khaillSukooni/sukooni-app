
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the admin panel. Use the navigation to manage your platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-blue">247</div>
            <p className="text-sm text-gray-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-blue">89</div>
            <p className="text-sm text-gray-600">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Therapists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-blue">24</div>
            <p className="text-sm text-gray-600">2 new this month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">New client registration: Sarah Johnson</span>
              <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Appointment scheduled: Dr. Smith with Mike Davis</span>
              <span className="text-xs text-gray-500 ml-auto">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Therapist profile updated: Dr. Emily White</span>
              <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
