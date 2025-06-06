
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const mockAppointments = [
  {
    id: "1",
    clientName: "Sarah Johnson",
    therapistName: "Dr. Emily Smith",
    date: "2024-06-10",
    time: "10:00 AM",
    type: "Video",
    status: "Scheduled"
  },
  {
    id: "2",
    clientName: "Mike Davis",
    therapistName: "Dr. John Wilson",
    date: "2024-06-10",
    time: "2:00 PM",
    type: "Audio",
    status: "Completed"
  },
  {
    id: "3",
    clientName: "Emma Brown",
    therapistName: "Dr. Lisa Anderson",
    date: "2024-06-11",
    time: "11:30 AM",
    type: "Video",
    status: "Scheduled"
  },
  {
    id: "4",
    clientName: "Alex Chen",
    therapistName: "Dr. Michael Thompson",
    date: "2024-06-11",
    time: "3:15 PM",
    type: "Audio",
    status: "Cancelled"
  },
  {
    id: "5",
    clientName: "Jessica Martinez",
    therapistName: "Dr. Emily Smith",
    date: "2024-06-12",
    time: "9:00 AM",
    type: "Video",
    status: "Scheduled"
  }
];

const AdminAppointments = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "text-blue-600 bg-blue-100";
      case "Completed":
        return "text-green-600 bg-green-100";
      case "Cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments Management</h1>
          <p className="text-gray-600">View and manage all appointments across the platform.</p>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-dark-blue">
          Export Data
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Therapist</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.clientName}</TableCell>
                  <TableCell>{appointment.therapistName}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {appointment.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAppointments;
