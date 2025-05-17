
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Mail, UserCircle } from "lucide-react";
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
            therapist_id,
            therapist:therapist_id(first_name, last_name)
          `)
          .eq("client_id", profile?.id)
          .eq("status", "scheduled")
          .gte("start_time", new Date().toISOString())
          .order("start_time")
          .limit(1)
          .single();

        if (error) throw error;
        
        if (data) {
          setNextAppointment(data as unknown as Appointment);
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
    } else {
      setLoading(false);
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
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{profile?.first_name} {profile?.last_name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{profile?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <UserCircle className="h-4 w-4 text-muted-foreground" />
                <span className="capitalize">{profile?.role}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Appointment Card */}
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

        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white">
                Book an Appointment
              </Button>
              <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800">
                View Upcoming Sessions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;
