import { ReactNode, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle } from "lucide-react";
import Dashboardlive from "../dashboard/Dashboardlive";

import {
  Home,
  Calendar,
  Settings,
  Users,
  Menu,
  BarChart3,
  Bell,
  TrendingUp,
  UserCheck,
  Shirt,
  FileText,
  CreditCard,
  Calculator,
  Mail,
  Activity,
  Star,
  Send,
  Building,
  X,
  ChevronDown,
  User,
  Package,
  Wrench,
  PartyPopper,
  Headphones,
  Briefcase,
  TrendingDown,
  LogOutIcon,
  LogInIcon,
  SettingsIcon,

} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
}

export const DashboardLayout = ({
  children,
  activeView,
  setActiveView,
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "hotel", label: "Hotel", icon: Calendar },
    { id: "restaurant", label: "Restaurant", icon: Menu },
    { id: "staff", label: "Staff", icon: Users },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "events", label: "Events", icon: PartyPopper },
    { id: "guest-services", label: "Guest Services", icon: Headphones },
    { id: "crm", label: "CRM", icon: UserCheck },
    { id: "laundry", label: "Laundry", icon: Shirt },
    { id: "cms", label: "CMS", icon: FileText },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "accounting", label: "Accounting", icon: Calculator },
    { id: "marketing", label: "Marketing", icon: TrendingUp },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "activities", label: "Activities", icon: Activity },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "communications", label: "Communications", icon: Send },
    { id: "pos", label: "POS System", icon: Calculator },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  //  alert button

  const alerts = [
    { id: 1, message: "Low inventory: Towels (12 remaining)", type: "warning" },
    { id: 2, message: "Kitchen equipment maintenance due", type: "info" },
    { id: 3, message: "Payment gateway offline", type: "error" },
  ];

  const MobileNavContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Building className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              HotelMaster Pro
            </h1>
            <p className="text-blue-300 text-sm font-medium">
              Management Suite
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start h-12 px-4 rounded-xl transition-all duration-300 text-left ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => {
                  setActiveView(item.id);
                  setSidebarOpen(false);
                }}
              >
                <Icon
                  className={`w-5 h-5 mr-3 ${
                    isActive ? "text-white" : "text-blue-300"
                  }`}
                />
                <span className="font-medium">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center space-x-3 text-blue-200">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Admin User</p>
            <p className="text-xs">Online</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Top Header with Logo and User */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-lg sticky top-0 z-50">
        <div className="px-2 sm:px-4 py-2 sm:py-3 border-b border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  HotelMaster Pro
                </h1>
                <p className="text-blue-200 text-xs font-medium hidden sm:block">
                  Management Suite
                </p>
              </div>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-white">
                  Welcome, Admin!
                </p>
                <p className="text-xs text-blue-200">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="relative group">
                {/* Bell icon */}
                <button className="relative bg-white/10 border border-white/20 text-white p-2 rounded-md hover:bg-white/20">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Alert dropdown on hover */}
                <div className="absolute right-0 mt-2 w-72 bg-white text-gray-800 rounded-xl shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 translate-y-2 transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="p-3 border-b font-semibold text-sm flex items-center space-x-2 text-amber-800">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span> System Alerts ({alerts.length})</span>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`px-4 py-3 text-sm border-b last:border-none rounded-lg m-2 ${
                          alert.type === "error"
                            ? "bg-red-50 text-red-800"
                            : alert.type === "warning"
                            ? "bg-yellow-50 text-yellow-800"
                            : "bg-blue-50 text-blue-800"
                        }`}
                      >
                        {alert.message}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* <div className="hidden sm:flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                <User className="w-4 h-4 text-blue-200" />
                <span className="text-sm font-medium">Admin</span>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div> */}

              <div
                className="relative"
                onMouseEnter={(e) => {
                  e.currentTarget
                    .querySelector(".dropdown")
                    .classList.remove("invisible", "opacity-0");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget
                    .querySelector(".dropdown")
                    .classList.add("invisible", "opacity-0");
                }}
              >
                {/* Admin section */}
                <div className="hidden sm:flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2 cursor-pointer">
                  <User className="w-4 h-4 text-blue-200" />
                  <span className="text-sm font-medium">Admin</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>

                {/* Dropdown */}
                <div className="dropdown invisible opacity-0 transition-all duration-200 absolute right-0 top-full mt-2 bg-white text-black rounded-lg shadow-lg p-4 w-40 z-50 space-y-2">
                  <div className="border-b-2">
                    <p className=" flex gap-1 text-sm text-blue-300">
                      
                      WelCome Admin
                    </p>
                  </div>
                  <button className="flex items-center gap-2 w-full text-left px-3 py-1  text-gray-400">
                  <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button className="flex items-center gap-2 w-full text-left px-3 py-1  text-gray-400 ">
                    <SettingsIcon className="w-4 h-4" />
                    Settings
                  </button>
                  <button className="flex items-center gap-2 w-full text-left px-3 py-1 text-red-600 hover:underline ">
                    <LogOutIcon className="w-4 h-4"/>
                    Logout
                  </button>
                </div>
              </div>
              {/* </div> */}

              {/* Mobile Menu Toggle */}
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="md:hidden bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64 sm:w-80">
                  <MobileNavContent />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation */}
        <nav className="hidden md:block bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 border-t border-white/10 ">
          <ScrollArea className="w-full">
            <div className="flex items-center px-2 sm:px-4 py-2 space-x-1 ">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    className={`whitespace-nowrap h-10 px-2 sm:px-4 rounded-sm transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                        : "text-blue-100 hover:bg-white/10 hover:text-white"
                    }`}
                    onClick={() => setActiveView(item.id)}
                  >
                    <Icon
                      className={`w-4 h-4 mr-2 ${
                        isActive ? "text-white" : "text-blue-300"
                      }`}
                    />
                    <span className="font-medium text-xs sm:text-sm">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </nav>
      </header>

      {/* Main Content */}
      <main className="min-h-screen">
        {/* Page Header only on Dashboard */}
        {activeView === "dashboard" && (
          <div className="bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100/50">
            <div className="px-2 sm:px-4 md:px-8 py-2">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                    {getPageTitle(activeView)}
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1 font-medium">
                    {getPageDescription(activeView)}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <Dashboardlive />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Content Area */}
        <div className="p-2 sm:p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
};

const getPageTitle = (activeView: string) => {
  const titles = {
    // dashboardlive: "Dashbord live", 
    dashboard: "Dashboard Overview",
    hotel: "Hotel Management",
    restaurant: "Restaurant Management",
    staff: "Staff Management",
    inventory: "Inventory Management",
    maintenance: "Maintenance & Housekeeping",
    events: "Event Management",
    "guest-services": "Guest Services",
    crm: "Customer Relationship Management",
    laundry: "Laundry Management",
    cms: "Content Management System",
    billing: "Billing & Invoicing",
    accounting: "Accounting & Finance",
    marketing: "Marketing Hub",
    analytics: "Analytics & Reports",
    activities: "Real-time Activities",
    reviews: "Reviews & Ratings",
    communications: "Communications Center",
    pos: "POS System",
    settings: "System Settings",
  };
  return titles[activeView as keyof typeof titles] || "Management";
};

const getPageDescription = (activeView: string) => {
  const descriptions = {
    dashboard: "Overview of all hotel operations and key metrics",
    hotel: "Manage rooms, bookings, and hotel services",
    restaurant: "Handle dining reservations and restaurant operations",
    staff: "Manage employees, schedules, and performance",
    inventory: "Track stock levels, suppliers, and procurement",
    maintenance: "Facility maintenance and housekeeping operations",
    events: "Organize conferences, banquets, and special events",
    "guest-services": "Concierge services and guest experience",
    crm: "Manage customer relationships and profiles",
    laundry: "Track and manage laundry services",
    cms: "Manage website content and information",
    billing: "Handle invoicing and payment processing",
    accounting: "Financial management and reporting",
    marketing: "Online & offline marketing campaigns",
    analytics: "Business insights and data analysis",
    activities: "Monitor real-time system activities",
    reviews: "Manage customer reviews and feedback",
    communications: "Email, WhatsApp, and SMS communications",
    pos: "Point of Sale system for restaurant orders",
    settings: "System configuration and preferences",
  };

  return (
    descriptions[activeView as keyof typeof descriptions] ||
    "Manage your operations"
  );
};