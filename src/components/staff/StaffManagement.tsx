import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import {
  Users, UserPlus, Calendar as CalendarIcon, Clock, DollarSign,
  TrendingUp, Award, PhoneCall, Mail, MapPin, Star
} from "lucide-react";

interface Staff {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  salary: number;
  status: "active" | "leave" | "training";
  performance: number;
  joinDate: string;
  shifts: string[];
}

export const StaffManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [staff] = useState<Staff[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      position: "Front Desk Manager",
      department: "Reception",
      email: "sarah@hotel.com",
      phone: "+1-555-0123",
      salary: 4500,
      status: "active",
      performance: 92,
      joinDate: "2023-01-15",
      shifts: ["Morning", "Evening"]
    },
    {
      id: "2", 
      name: "Mike Chen",
      position: "Head Chef",
      department: "Restaurant",
      email: "mike@hotel.com",
      phone: "+1-555-0124",
      salary: 5500,
      status: "active",
      performance: 88,
      joinDate: "2022-08-20",
      shifts: ["Afternoon", "Evening"]
    },
    {
      id: "3",
      name: "Emma Davis",
      position: "Housekeeping Supervisor",
      department: "Housekeeping",
      email: "emma@hotel.com", 
      phone: "+1-555-0125",
      salary: 3800,
      status: "leave",
      performance: 85,
      joinDate: "2023-03-10",
      shifts: ["Morning"]
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      position: "Maintenance Technician",
      department: "Maintenance",
      email: "alex@hotel.com",
      phone: "+1-555-0126",
      salary: 4200,
      status: "active",
      performance: 90,
      joinDate: "2022-11-05",
      shifts: ["Morning", "Afternoon"]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "leave": return "bg-yellow-100 text-yellow-800";
      case "training": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const StaffCard = ({ member }: { member: Staff }) => (
    <Card className="hover:shadow-lg transition-all duration-300 border border-gray-100">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600">
              <AvatarFallback className="text-white font-semibold">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.position}</p>
              <p className="text-xs text-gray-500">{member.department}</p>
            </div>
          </div>
          <Badge className={getStatusColor(member.status)}>
            {member.status}
          </Badge>
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Performance</span>
            <span className="font-semibold">{member.performance}%</span>
          </div>
          <Progress value={member.performance} className="h-2" />
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="truncate">{member.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <PhoneCall className="w-4 h-4" />
              <span>{member.phone}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-green-600">
              ${member.salary.toLocaleString()}/month
            </span>
            <div className="flex space-x-1">
              {member.shifts.map((shift, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {shift}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Staff</p>
                <p className="text-3xl font-bold">{staff.length}</p>
              </div>
              <Users className="w-10 h-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Active Staff</p>
                <p className="text-3xl font-bold">{staff.filter(s => s.status === 'active').length}</p>
              </div>
              <Award className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Avg Performance</p>
                <p className="text-3xl font-bold">
                  {Math.round(staff.reduce((acc, s) => acc + s.performance, 0) / staff.length)}%
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Monthly Payroll</p>
                <p className="text-3xl font-bold">
                  ${staff.reduce((acc, s) => acc + s.salary, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Staff Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Staff Directory</h2>
              <p className="text-gray-600">Manage your team members</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Staff Member
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member) => (
              <StaffCard key={member.id} member={member} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Staff Schedule
              </CardTitle>
              <CardDescription>Manage work schedules and shifts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <Calendar mode="single" className="rounded-md border" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Today's Schedule</h3>
                  {staff.filter(s => s.status === 'active').map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-gray-600">{member.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex space-x-1">
                          {member.shifts.map((shift, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {shift}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Payroll Management
              </CardTitle>
              <CardDescription>Manage salaries and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staff.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.position}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">${member.salary.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">per month</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Performance Analytics
              </CardTitle>
              <CardDescription>Track and analyze staff performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {staff.map((member) => (
                  <div key={member.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-gray-600">{member.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{member.performance}%</p>
                        <p className="text-xs text-gray-600">Performance Score</p>
                      </div>
                    </div>
                    <Progress value={member.performance} className="h-3" />
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                      <span>Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
                      <span className={member.performance >= 90 ? "text-green-600 font-semibold" : 
                                     member.performance >= 80 ? "text-yellow-600 font-semibold" : "text-red-600 font-semibold"}>
                        {member.performance >= 90 ? "Excellent" : 
                         member.performance >= 80 ? "Good" : "Needs Improvement"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};