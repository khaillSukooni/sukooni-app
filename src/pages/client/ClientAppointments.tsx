
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Appointment {
  id: string;
  start_time: string;
  end_time: string;
  status: string;
  notes?: string;
  therapist: {
    first_name: string;
    last_name: string;
  };
}

const ClientAppointments = () => {
  const { profile } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data, error } = await supabase
          .from("appointments")
          .select(`
            id,
            start_time,
            end_time,
            status,
            notes,
            therapist:therapist_id(
              first_name:profiles(first_name),
              last_name:profiles(last_name)
            )
          `)
          .eq("client_id", profile?.id)
          .order("start_time", { ascending: false });

        if (error) throw error;
        
        setAppointments(data || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    if (profile?.id) {
      fetchAppointments();
    }
  }, [profile?.id]);

  const formatAppointmentTime = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    const dateStr = format(start, "EEEE, MMMM d, yyyy");
    const timeStr = `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;
    
    return { dateStr, timeStr };
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const isPastAppointment = (startTime: string) => {
    return new Date(startTime) < new Date();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all your therapy appointments
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="p-6 space-y-2">
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </Card>
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-6">
              <h3 className="text-lg font-medium mb-2">No appointments found</h3>
              <p className="text-muted-foreground">
                You don't have any appointments scheduled yet.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className={`overflow-hidden ${isPastAppointment(appointment.start_time) ? 'bg-gray-50' : ''}`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">
                    Session with Dr. {appointment.therapist.first_name} {appointment.therapist.last_name}
                  </h3>
                  {getStatusBadge(appointment.status)}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatAppointmentTime(appointment.start_time, appointment.end_time).dateStr}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{formatAppointmentTime(appointment.start_time, appointment.end_time).timeStr}</span>
                  </div>
                </div>

                {appointment.notes && (
                  <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                    <p>{appointment.notes}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientAppointments;
