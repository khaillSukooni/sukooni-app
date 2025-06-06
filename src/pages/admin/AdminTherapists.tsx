import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Mail, RotateCcw, X } from "lucide-react";
import AddTherapistForm from "@/components/admin/AddTherapistForm";
import { useTherapistInvitations } from "@/hooks/useTherapistInvitations";
import { CreateTherapistInvitationRequest, TherapistInvitation } from "@/lib/types/invitation";

const mockTherapists = [
  {
    id: "1",
    name: "Dr. Emily Smith",
    email: "emily.smith@clinic.com",
    specialization: "Anxiety & Depression",
    clients: 15,
    joinDate: "2023-06-15",
    status: "Active",
    rating: 4.9
  },
  {
    id: "2",
    name: "Dr. John Wilson",
    email: "john.wilson@clinic.com",
    specialization: "Trauma Therapy",
    clients: 12,
    joinDate: "2023-08-20",
    status: "Active",
    rating: 4.8
  },
  {
    id: "3",
    name: "Dr. Lisa Anderson",
    email: "lisa.anderson@clinic.com",
    specialization: "Family Therapy",
    clients: 18,
    joinDate: "2023-05-10",
    status: "Active",
    rating: 4.7
  },
  {
    id: "4",
    name: "Dr. Michael Thompson",
    email: "michael.thompson@clinic.com",
    specialization: "Cognitive Behavioral Therapy",
    clients: 14,
    joinDate: "2023-09-05",
    status: "Active",
    rating: 4.9
  },
  {
    id: "5",
    name: "Dr. Sarah Davis",
    email: "sarah.davis@clinic.com",
    specialization: "Addiction Counseling",
    clients: 8,
    joinDate: "2024-01-12",
    status: "On Leave",
    rating: 4.6
  }
];

const AdminTherapists = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [invitations, setInvitations] = useState<TherapistInvitation[]>([]);
  const { createInvitation, getInvitations, resendInvitation, revokeInvitation, isLoading } = useTherapistInvitations();

  useEffect(() => {
    loadInvitations();
  }, []);

  const loadInvitations = async () => {
    const data = await getInvitations();
    setInvitations(data);
  };

  const handleCreateInvitation = async (data: CreateTherapistInvitationRequest) => {
    try {
      await createInvitation(data);
      setIsDialogOpen(false);
      loadInvitations(); // Refresh the invitations list
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleResendInvitation = async (invitationId: string) => {
    try {
      await resendInvitation(invitationId);
      loadInvitations(); // Refresh the invitations list
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleRevokeInvitation = async (invitationId: string) => {
    try {
      await revokeInvitation(invitationId);
      loadInvitations(); // Refresh the invitations list
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-600 bg-green-100";
      case "On Leave":
        return "text-yellow-600 bg-yellow-100";
      case "Inactive":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getInvitationStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "revoked":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Therapists Management</h1>
          <p className="text-gray-600">View and manage all therapists on the platform.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-blue hover:bg-brand-dark-blue">
              <Plus className="w-4 h-4 mr-2" />
              Add Therapist
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Invite New Therapist</DialogTitle>
            </DialogHeader>
            <AddTherapistForm
              onSubmit={handleCreateInvitation}
              isLoading={isLoading}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Pending Invitations */}
      {invitations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Invitations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations.map((invitation) => (
                  <TableRow key={invitation.id}>
                    <TableCell className="font-medium">
                      {invitation.first_name} {invitation.last_name}
                    </TableCell>
                    <TableCell>{invitation.email}</TableCell>
                    <TableCell>
                      <Badge className={getInvitationStatusColor(invitation.status)}>
                        {invitation.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(invitation.created_at)}</TableCell>
                    <TableCell>{formatDate(invitation.expires_at)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {invitation.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleResendInvitation(invitation.id)}
                              disabled={isLoading}
                            >
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRevokeInvitation(invitation.id)}
                              disabled={isLoading}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Active Therapists */}
      <Card>
        <CardHeader>
          <CardTitle>Active Therapists</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Active Clients</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTherapists.map((therapist) => (
                <TableRow key={therapist.id}>
                  <TableCell className="font-medium">{therapist.name}</TableCell>
                  <TableCell>{therapist.email}</TableCell>
                  <TableCell>{therapist.specialization}</TableCell>
                  <TableCell>{therapist.clients}</TableCell>
                  <TableCell>{therapist.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{therapist.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(therapist.status)}`}>
                      {therapist.status}
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

export default AdminTherapists;
