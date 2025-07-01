import React, { useState } from "react";
import { format, parseISO, isThisMonth, isPast, addMonths, isAfter } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Calendar, Clock, Video, Mic, MoreVertical } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";

// Mock appointment data
const generateMockAppointments = () => {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  // Helper to create appointment dates
  const createDate = (monthOffset, day, hour, minute) => {
    const date = new Date(thisYear, thisMonth - monthOffset, day);
    date.setHours(hour, minute);
    return date;
  };

  // Create appointments: 4 this month, 2 last month, 2 the month before
  return [
    // This month - 4 appointments
    {
      id: 1,
      startTime: createDate(0, 10, 10, 0),
      endTime: createDate(0, 10, 11, 0),
      title: "50min video session with Dr. Emma Taylor",
      type: "Video",
      status: "upcoming",
      participants: [
        { 
          name: "Dr. Emma Taylor", 
          avatar: "/placeholder.svg",
          role: "Therapist"
        },
        { 
          name: "John Doe", 
          avatar: "/placeholder.svg",
          role: "Client"
        }
      ]
    },
    {
      id: 2,
      startTime: createDate(0, 15, 14, 30),
      endTime: createDate(0, 15, 15, 20),
      title: "50min video session with Dr. Michael Johnson",
      type: "Video",
      status: "upcoming",
      participants: [
        { 
          name: "Dr. Michael Johnson", 
          avatar: "/male.jpg",
          role: "Therapist"
        },
        { 
          name: "John Doe", 
          avatar: "/placeholder.svg",
          role: "Client"
        }
      ]
    },
    {
      id: 3,
      startTime: createDate(0, 20, 11, 0),
      endTime: createDate(0, 20, 12, 0),
      title: "60min audio session with Dr. Sarah Williams",
      type: "Audio",
      status: "upcoming",
      participants: [
        { 
          name: "Dr. Sarah Williams", 
          avatar: "/femlae.jpg", // Note: there's a typo in the file name
          role: "Therapist"
        },
        { 
          name: "John Doe", 
          avatar: "/placeholder.svg",
          role: "Client"
        }
      ]
    },
    {
      id: 4,
      startTime: createDate(0, 25, 16, 0),
      endTime: createDate(0, 25, 16, 50),
      title: "50min video session with Dr. Emma Taylor",
      type: "Video",
      status: "cancelled",
      participants: [
        { 
          name: "Dr. Emma Taylor", 
          avatar: "/placeholder.svg",
          role: "Therapist"
        },
        { 
          name: "John Doe", 
          avatar: "/placeholder.svg",
          role: "Client"
        }
      ]
    },

    // Last month - 2 appointments
    {
      id: 5,
      startTime: createDate(1, 12, 9, 0),
      endTime: createDate(1, 12, 10, 0),
      title: "60min video session with Dr. Michael Johnson",
      type: "Video",
      status: "completed",
      participants: [
        { 
          name: "Dr. Michael Johnson", 
          avatar: "/male.jpg",
          role: "Therapist"
        },
        { 
          name: "John Doe", 
          avatar: "/placeholder.svg",
          role: "Client"
        }
      ]
    },
    {
      id: 6,
      startTime: createDate(1, 25, 13, 0),
      endTime: createDate(1, 25, 14, 0),
      title: "60min audio session with Dr. Sarah Williams",
      type: "Audio",
      status: "completed",
      participants: [
        { 
          name: "Dr. Sarah Williams", 
          avatar: "/femlae.jpg", // Note: there's a typo in the file name
          role: "Therapist"
        },
        { 
          name: "John Doe", 
          avatar: "/placeholder.svg",
          role: "Client"
        }
      ]
    },

    // Two months ago - 2 appointments
    {
      id: 7,
      startTime: createDate(2, 5, 10, 0),
      endTime: createDate(2, 5, 11, 0),
      title: "60min video session with Dr. Emma Taylor",
      type: "Video",
      status: "completed",
      participants: [
        { 
          name: "Dr. Emma Taylor", 
          avatar: "/placeholder.svg",
          role: "Therapist"
        },
        { 
          name: "John Doe", 
          avatar: "/placeholder.svg",
          role: "Client"
        }
      ]
    },
    {
      id: 8,
      startTime: createDate(2, 18, 15, 0),
      endTime: createDate(2, 18, 16, 0),
      title: "60min audio session with Dr. Michael Johnson",
      type: "Audio",
      status: "completed",
      participants: [
        { 
          name: "Dr. Michael Johnson", 
          avatar: "/male.jpg",
          role: "Therapist"
        },
        { 
          name: "John Doe", 
          avatar: "/placeholder.svg",
          role: "Client"
        }
      ]
    },
  ];
};

const ClientAppointments = () => {
  const [appointments] = useState(generateMockAppointments());
  const [activeTab, setActiveTab] = useState("upcoming");

  // Filter appointments based on active tab
  const filteredAppointments = appointments.filter(appointment => {
    if (activeTab === "upcoming") {
      return appointment.status === "upcoming";
    } else if (activeTab === "past") {
      return appointment.status === "completed";
    } else if (activeTab === "cancelled") {
      return appointment.status === "cancelled";
    }
    return true;
  });

  // Group appointments by month
  const groupByMonth = (appointments) => {
    const grouped = {};
    
    appointments.forEach(appointment => {
      const monthYear = format(appointment.startTime, 'MMMM yyyy');
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(appointment);
    });
    
    // Sort months chronologically
    return Object.keys(grouped)
      .sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateB.getTime() - dateA.getTime(); // Most recent first
      })
      .map(month => ({
        month,
        appointments: grouped[month].sort((a, b) => a.startTime - b.startTime)
      }));
  };

  const groupedAppointments = groupByMonth(filteredAppointments);
  
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Sessions
            </h1>
            <p className="text-gray-600">
              View and manage your therapy sessions
            </p>
          </div>
          
          <div className="border-b pb-2">
            <ToggleGroup type="single" value={activeTab} onValueChange={(value) => value && setActiveTab(value)} className="flex justify-start">
              <ToggleGroupItem value="upcoming" className="rounded-full data-[state=on]:bg-brand-blue data-[state=on]:text-white">
                Upcoming
              </ToggleGroupItem>
              <ToggleGroupItem value="past" className="rounded-full data-[state=on]:bg-brand-blue data-[state=on]:text-white">
                Past
              </ToggleGroupItem>
              <ToggleGroupItem value="cancelled" className="rounded-full data-[state=on]:bg-brand-blue data-[state=on]:text-white">
                Cancelled
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          {groupedAppointments.length > 0 ? (
            <div className="space-y-8">
              {groupedAppointments.map(({month, appointments}) => (
                <div key={month} className="space-y-4">
                  <h2 className="text-xl font-semibold">{month}</h2>
                  
                  <div className="space-y-4">
                    {appointments.map((appointment) => {
                      const isVideoSession = appointment.type === "Video";
                      
                      return (
                        <Card key={appointment.id} className="overflow-hidden shadow-md border-0 bg-white">
                          <div className="flex flex-col sm:flex-row">
                            {/* Date column */}
                            <div className="bg-gray-50 p-4 text-center sm:w-24 flex flex-row sm:flex-col justify-center items-center">
                              <div className="text-brand-blue font-medium">
                                {format(appointment.startTime, 'EEE')}
                              </div>
                              <div className="text-3xl font-bold ml-2 sm:ml-0">
                                {format(appointment.startTime, 'd')}
                              </div>
                            </div>
                            
                            {/* Appointment details */}
                            <div className="flex-1 p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2 text-sm">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span>
                                    {format(appointment.startTime, 'h:mm a')} - {format(appointment.endTime, 'h:mm a')}
                                  </span>
                                </div>
                                
                                {/* Actions dropdown - Moved to the top right */}
                                {appointment.status !== "cancelled" && appointment.status !== "completed" && (
                                  <div className="-mt-1 -mr-2">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreVertical className="h-4 w-4" />
                                          <span className="sr-only">Actions</span>
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          Reschedule appointment
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-500">
                                          Cancel appointment
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                )}
                              </div>
                              
                              <h3 className="font-medium mt-1">{appointment.title}</h3>
                              
                              {/* Badge and avatars container - Fixed alignment for desktop */}
                              <div className="flex flex-wrap items-center mt-2 gap-2">
                                <div className="flex items-center gap-2">
                                  {isVideoSession ? (
                                    <Badge variant="outline" className="flex items-center gap-1 bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                                      <Video className="h-3 w-3" />
                                      <span>Video</span>
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="flex items-center gap-1 bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                                      <Mic className="h-3 w-3" />
                                      <span>Audio</span>
                                    </Badge>
                                  )}
                                  
                                  {appointment.status === "cancelled" && (
                                    <Badge variant="outline" className="bg-red-50 text-red-500 border-red-100">
                                      Cancelled
                                    </Badge>
                                  )}
                                  
                                  {/* Participant avatars - Now part of the same flex container */}
                                  <div className="flex -space-x-2 ml-2">
                                    {appointment.participants.map((participant, i) => (
                                      <Avatar key={i} className="border-2 border-white h-7 w-7">
                                        <AvatarImage src={participant.avatar} alt={participant.name} />
                                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium mb-2">No appointments found</h3>
              <p className="text-muted-foreground">
                {activeTab === "upcoming" 
                  ? "You don't have any upcoming appointments."
                  : activeTab === "past"
                    ? "You don't have any past appointments."
                    : "You don't have any cancelled appointments."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientAppointments;
