
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const mockClients = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    therapist: "Dr. Emily Smith",
    joinDate: "2024-01-15",
    status: "Active",
    totalSessions: 12
  },
  {
    id: "2",
    name: "Mike Davis",
    email: "mike.davis@email.com",
    therapist: "Dr. John Wilson",
    joinDate: "2024-02-20",
    status: "Active",
    totalSessions: 8
  },
  {
    id: "3",
    name: "Emma Brown",
    email: "emma.brown@email.com",
    therapist: "Dr. Lisa Anderson",
    joinDate: "2024-03-10",
    status: "Active",
    totalSessions: 15
  },
  {
    id: "4",
    name: "Alex Chen",
    email: "alex.chen@email.com",
    therapist: "Dr. Michael Thompson",
    joinDate: "2024-01-05",
    status: "Inactive",
    totalSessions: 3
  },
  {
    id: "5",
    name: "Jessica Martinez",
    email: "jessica.martinez@email.com",
    therapist: "Dr. Emily Smith",
    joinDate: "2024-04-12",
    status: "Active",
    totalSessions: 6
  }
];

const AdminClients = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-600 bg-green-100";
      case "Inactive":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients Management</h1>
          <p className="text-gray-600">View and manage all registered clients.</p>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-dark-blue">
          Add Client
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Assigned Therapist</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Total Sessions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.therapist}</TableCell>
                  <TableCell>{client.joinDate}</TableCell>
                  <TableCell>{client.totalSessions}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      {client.status}
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

export default AdminClients;
