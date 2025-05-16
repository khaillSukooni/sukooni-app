
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

interface Appointment {
  id: string;
  start_time: string;
  end_time: string;
  status: string;
  therapist: {
    first_name: string;
    last_name: string;
  };
}

const ClientDashboard = () => {
  const { profile } = useAuth();
  const [nextAppointment, setNextAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNextAppointment = async () => {
      try {
        const { data, error } = await supabase
          .from("appointments")
          .select(`
            id, 
            start_time, 
            end_time, 
            status,
            therapist:therapist_id(
              profiles(first_name, last_name)
            )
          `)
          .eq("client_id", profile?.id)
          .eq("status", "scheduled")
          .gte("start_time", new Date().toISOString())
          .order("start_time")
          .limit(1)
          .single();

        if (error) throw error;
        
        // Transform the data to match the expected Appointment type
        if (data) {
          const therapistProfiles = data.therapist?.profiles || {};
          const appointmentData = {
            ...data,
            therapist: {
              first_name: therapistProfiles.first_name || '',
              last_name: therapistProfiles.last_name || ''
            }
          };
          
          setNextAppointment(appointmentData);
        }
      } catch (error) {
        console.error("Error fetching next appointment:", error);
        setNextAppointment(null);
      } finally {
        setLoading(false);
      }
    };

    if (profile?.id) {
      fetchNextAppointment();
    }
  }, [profile?.id]);

  const formatAppointmentTime = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    const dateStr = format(start, "EEEE, MMMM d, yyyy");
    const timeStr = `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;
    
    return { dateStr, timeStr };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {profile?.first_name || "Client"}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of your therapy journey
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Next Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : nextAppointment ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatAppointmentTime(nextAppointment.start_time, nextAppointment.end_time).dateStr}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formatAppointmentTime(nextAppointment.start_time, nextAppointment.end_time).timeStr}</span>
                </div>
                <div className="text-sm font-medium">
                  with Dr. {nextAppointment.therapist.first_name} {nextAppointment.therapist.last_name}
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                No upcoming appointments. Would you like to schedule one?
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional cards can be added here */}
      </div>
    </div>
  );
};

export default ClientDashboard;
