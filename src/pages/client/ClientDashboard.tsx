
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
  Phone,
  Flame
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

  // Mock data matching the screenshot
  const mockStats = {
    streak: 7,
    totalSessions: 12,
    moodImprovement: 8,
    goalsThisWeek: 5
  };

  const mockTherapist = {
    name: "Dr. Sarah Johnson", 
    title: "Licensed Therapist",
    rating: 4.9,
    avatar: "/placeholder.svg"
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
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back, {profile?.first_name || "John"}
            </h1>
            <p className="text-gray-600">
              Here's a look at your journey so far. Keep up the great work!
            </p>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Daily Check-in and Progress */}
            <div className="lg:col-span-2 space-y-6">
              {/* Daily Check-in Card */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="text-teal-500 text-sm font-medium">✨ Daily Check-in</div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Ready to continue your journey?</h3>
                      <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                        Take a moment to reflect on your feelings and connect with your therapist. Your mental health matters, and every step counts.
                      </p>
                      <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-6">
                        <Heart className="h-4 w-4 mr-2" />
                        Start Check-in
                      </Button>
                    </div>
                    <div className="bg-teal-500 p-4 rounded-xl">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-md border-0">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">Current Streak</p>
                        <Flame className="h-4 w-4 text-orange-500" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{mockStats.streak} days</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-0">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">Sessions Completed</p>
                        <Calendar className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{mockStats.totalSessions}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-0">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">Mood Improvement</p>
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">+{mockStats.moodImprovement}%</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-0">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">Goals This Week</p>
                        <Target className="h-4 w-4 text-purple-500" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{mockStats.goalsThisWeek}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Sessions */}
              <Card className="shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Calendar className="h-5 w-5" />
                    Upcoming Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-teal-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="bg-teal-100 text-teal-700 text-xs font-medium px-2 py-1 rounded-md inline-block">
                            Tomorrow
                          </div>
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4 text-gray-500" />
                            <span className="font-medium text-gray-900">Dr. Sarah Johnson</span>
                          </div>
                          <div className="text-sm text-gray-600">9:00 AM • video</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            60min
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <Button className="bg-teal-500 hover:bg-teal-600 text-white flex-1 mr-2">
                          <Video className="h-4 w-4 mr-2" />
                          Join Session
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Therapist and Quick Actions */}
            <div className="space-y-6">
              {/* Your Therapist Card */}
              <Card className="shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Your Therapist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={mockTherapist.avatar} alt={mockTherapist.name} />
                        <AvatarFallback className="bg-teal-500 text-white">
                          {mockTherapist.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-teal-500 rounded-full p-1">
                        <Heart className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{mockTherapist.name}</h4>
                      <p className="text-sm text-gray-600">{mockTherapist.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">(4.9)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button className="bg-teal-500 hover:bg-teal-600 text-white flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start text-left" variant="ghost">
                    <Calendar className="h-4 w-4 mr-3" />
                    Book New Session
                  </Button>
                  <Button className="w-full justify-start text-left" variant="ghost">
                    <MessageCircle className="h-4 w-4 mr-3" />
                    Send Message
                  </Button>
                  <Button className="w-full justify-start text-left" variant="ghost">
                    <Heart className="h-4 w-4 mr-3" />
                    Update Goals
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
