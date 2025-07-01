
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Calendar, 
  TrendingUp, 
  Target, 
  Flame,
  Plus,
  Clock,
  Smile,
  Meh,
  Frown
} from "lucide-react";
import { format } from "date-fns";

const ClientCheckIns = () => {
  const [activeTab, setActiveTab] = useState("timeline");

  // Mock data matching the dashboard
  const mockStats = {
    streak: 7,
    totalSessions: 12,
    moodImprovement: 8,
    goalsThisWeek: 5
  };

  // Mock check-in data
  const mockCheckIns = [
    {
      id: 1,
      date: "2024-01-15",
      time: "09:30",
      mood: "good",
      moodScore: 7,
      energy: 6,
      anxiety: 3,
      notes: "Feeling more optimistic today. Had a good session with Dr. Johnson yesterday.",
      goals: ["Exercise for 30 minutes", "Practice mindfulness"],
      completed: true
    },
    {
      id: 2,
      date: "2024-01-14",
      time: "10:15",
      mood: "neutral",
      moodScore: 5,
      energy: 5,
      anxiety: 5,
      notes: "Average day, some work stress but manageable.",
      goals: ["Read for 20 minutes", "Call a friend"],
      completed: true
    },
    {
      id: 3,
      date: "2024-01-13",
      time: "08:45",
      mood: "challenging",
      moodScore: 3,
      energy: 3,
      anxiety: 7,
      notes: "Difficult morning. Feeling overwhelmed with work deadlines.",
      goals: ["Take breaks every hour", "Practice breathing exercises"],
      completed: true
    }
  ];

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "good":
        return <Smile className="h-5 w-5 text-green-500" />;
      case "neutral":
        return <Meh className="h-5 w-5 text-yellow-500" />;
      case "challenging":
        return <Frown className="h-5 w-5 text-red-500" />;
      default:
        return <Meh className="h-5 w-5 text-gray-500" />;
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "good":
        return "bg-green-100 text-green-800";
      case "neutral":
        return "bg-yellow-100 text-yellow-800";
      case "challenging":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Check-ins
            </h1>
            <p className="text-gray-600">
              Track your mental health journey over time
            </p>
          </div>

          {/* Progress Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="shadow-md border-0 bg-white">
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

            <Card className="shadow-md border-0 bg-white">
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

            <Card className="shadow-md border-0 bg-white">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Mood Improvement</p>
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">+{mockStats.moodImprovement}%</div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-0 bg-white">
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

          {/* Tab Navigation and Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Recent Check-ins</h2>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  New Check-in
                </Button>
              </div>

              <div className="space-y-4">
                {mockCheckIns.map((checkIn) => (
                  <Card key={checkIn.id} className="shadow-md border-0 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getMoodIcon(checkIn.mood)}
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {format(new Date(checkIn.date), "EEEE, MMMM d")}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-3 w-3" />
                              {checkIn.time}
                            </div>
                          </div>
                        </div>
                        <Badge className={getMoodColor(checkIn.mood)}>
                          {checkIn.mood}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{checkIn.moodScore}</div>
                          <div className="text-sm text-gray-600">Mood</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{checkIn.energy}</div>
                          <div className="text-sm text-gray-600">Energy</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{checkIn.anxiety}</div>
                          <div className="text-sm text-gray-600">Anxiety</div>
                        </div>
                      </div>

                      {checkIn.notes && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                          <p className="text-gray-600 text-sm">{checkIn.notes}</p>
                        </div>
                      )}

                      {checkIn.goals && checkIn.goals.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Daily Goals</h4>
                          <div className="flex flex-wrap gap-2">
                            {checkIn.goals.map((goal, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {goal}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card className="shadow-md border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Mental Health Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center py-12">
                      <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Insights Coming Soon</h3>
                      <p className="text-gray-600">
                        We're working on detailed insights to help you understand your mental health patterns better.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <Card className="shadow-md border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Check-in Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar View Coming Soon</h3>
                      <p className="text-gray-600">
                        View your check-ins in a calendar format to track your progress over time.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientCheckIns;
