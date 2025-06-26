
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Calendar, 
  Clock, 
  Star, 
  TrendingUp, 
  Target, 
  MessageCircle,
  Video,
  BookOpen,
  Award,
  Phone
} from "lucide-react";
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

  // Mock data for dashboard
  const mockStats = {
    streak: 12,
    totalSessions: 8,
    moodImprovement: 75,
    goalsCompleted: 3
  };

  const mockTherapist = {
    name: "Dr. Sarah Johnson",
    title: "Licensed Clinical Psychologist",
    specialization: "Anxiety & Depression",
    rating: 4.9,
    avatar: "/placeholder.svg",
    yearsExperience: 8
  };

  const mockUpcomingSession = {
    date: "2024-01-15",
    time: "2:00 PM - 3:00 PM",
    type: "Video Session",
    therapist: mockTherapist
  };

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

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Good morning, {profile?.first_name || "Client"}! 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Ready to continue your wellness journey today?
            </p>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Daily Check-in and Progress */}
            <div className="lg:col-span-2 space-y-6">
              {/* Daily Check-in Card */}
              <Card className="bg-gradient-to-br from-brand-blue to-brand-dark-blue text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">Daily Check-in</h3>
                      <p className="text-blue-100">How are you feeling today?</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                      <Heart className="h-8 w-8" />
                    </div>
                  </div>
                  <Button className="mt-4 bg-white text-brand-blue hover:bg-gray-100">
                    Start Check-in
                  </Button>
                </CardContent>
              </Card>

              {/* Progress Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <TrendingUp className="h-5 w-5 text-orange-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">{mockStats.streak}</div>
                    <p className="text-sm text-muted-foreground">Day Streak</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{mockStats.totalSessions}</div>
                    <p className="text-sm text-muted-foreground">Sessions</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Heart className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{mockStats.moodImprovement}%</div>
                    <p className="text-sm text-muted-foreground">Mood ↑</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Target className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{mockStats.goalsCompleted}</div>
                    <p className="text-sm text-muted-foreground">Goals</p>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Session */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Session
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Tomorrow, {mockUpcomingSession.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Video className="h-4 w-4 text-brand-blue" />
                        <span className="font-medium">{mockUpcomingSession.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        with {mockUpcomingSession.therapist.name}
                      </p>
                    </div>
                    <Button className="bg-brand-blue hover:bg-brand-dark-blue">
                      Join Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Therapist and Quick Actions */}
            <div className="space-y-6">
              {/* Your Therapist Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Therapist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mockTherapist.avatar} alt={mockTherapist.name} />
                      <AvatarFallback className="bg-brand-blue text-white">
                        {mockTherapist.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{mockTherapist.name}</h4>
                      <p className="text-sm text-muted-foreground">{mockTherapist.title}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs">
                      {mockTherapist.specialization}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{mockTherapist.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        • {mockTherapist.yearsExperience} years exp.
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book New Session
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Resources
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Award className="h-4 w-4 mr-2" />
                    Track Progress
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
