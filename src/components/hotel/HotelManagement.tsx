import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RoomBooking } from "./RoomBooking";
import { RoomStats } from "./RoomStats";
import { RoomGrid } from "./RoomGrid";
import { BookingsList } from "./BookingsList";
import { getStatusColor, filterRooms } from "./utils";
import AddnewRoom from "./AddnewRoom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const HotelManagement = () => {
  const [activeTab, setActiveTab] = useState("rooms");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [rooms, setRooms] = useState([
    { id: "R101", type: "Standard", status: "Available", price: 120, guest: null, floor: 1 },
    { id: "R102", type: "Deluxe", status: "Occupied", price: 180, guest: "John Smith", floor: 1 },
    { id: "R103", type: "Suite", status: "Maintenance", price: 300, guest: null, floor: 1 },
    { id: "R201", type: "Standard", status: "Available", price: 120, guest: null, floor: 2 },
    { id: "R202", type: "Premium", status: "Occupied", price: 220, guest: "Sarah Johnson", floor: 2 },
    { id: "R203", type: "Deluxe", status: "Reserved", price: 180, guest: "Mike Wilson", floor: 2 },
  ]);

  const [bookings, setBookings] = useState([
    { 
      id: "BK001", 
      guest: "John Smith", 
      room: "R102", 
      checkIn: "2024-01-15", 
      checkOut: "2024-01-18", 
      status: "Active",
      amount: 540,
      adults: 2,
      children: 0
    },
    { 
      id: "BK002", 
      guest: "Sarah Johnson", 
      room: "R202", 
      checkIn: "2024-01-16", 
      checkOut: "2024-01-20", 
      status: "Active",
      amount: 880,
      adults: 1,
      children: 0
    },
    { 
      id: "BK003", 
      guest: "Mike Wilson", 
      room: "R203", 
      checkIn: "2024-01-17", 
      checkOut: "2024-01-19", 
      status: "Confirmed",
      amount: 360,
      adults: 2,
      children: 1
    },
  ]);

  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({
    id: "",
    type: "",
    status: "Available",
    price: "",
    guest: "",
    floor: "",
  });

  const filteredRooms = filterRooms(rooms, searchTerm, filterStatus);

  const handleRoomStatusChange = (roomId: string, newStatus: string) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, status: newStatus } : room
    ));
  };

  const handleCheckIn = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status: "Active" } : booking
    ));
    console.log(`Checking in booking ${bookingId}`);
  };

  const handleCheckOut = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status: "Completed" } : booking
    ));
    console.log(`Checking out booking ${bookingId}`);
  };

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    setRooms(prev => [
      ...prev,
      {
        ...newRoom,
        price: Number(newRoom.price) || 0,
        floor: Number(newRoom.floor) || 0,
        guest: newRoom.guest || null,
      },
    ]);
    setShowAddRoom(false);
    setNewRoom({
      id: "",
      type: "",
      status: "Available",
      price: "",
      guest: "",
      floor: "",
    });
  };

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Hotel Management</h2>
          <p className="text-gray-600 text-sm sm:text-base">Manage rooms, bookings, and occupancy</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 ml-0 md:ml-auto">
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto"
            onClick={() => setShowAddRoom(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add NewRoom
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto"
            onClick={() => setActiveTab("booking")}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Booking
          </Button>
        </div>
      </div>

      {/* Add Room Dialog */}
      <Dialog open={showAddRoom} onOpenChange={setShowAddRoom}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Room</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddRoom} className="space-y-4">
            <div>
              <Label htmlFor="id">Room ID</Label>
              <Input
                id="id"
                value={newRoom.id}
                onChange={e => setNewRoom(r => ({ ...r, id: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                value={newRoom.type}
                onChange={e => setNewRoom(r => ({ ...r, type: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={newRoom.price}
                onChange={e => setNewRoom(r => ({ ...r, price: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="floor">Floor</Label>
              <Input
                id="floor"
                type="number"
                value={newRoom.floor}
                onChange={e => setNewRoom(r => ({ ...r, floor: e.target.value }))}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">Add Room</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Quick Stats */}
      <div className="mb-2">
        <RoomStats rooms={rooms} onFilterChange={setFilterStatus} />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-lg w-full sm:w-fit">
        <Button
          variant={activeTab === "rooms" ? "default" : "ghost"}
          className={activeTab === "rooms" ? "bg-gray-300 shadow-sm" : ""}
          onClick={() => setActiveTab("rooms")}
        >
          Room Status
        </Button>
        <Button
          variant={activeTab === "bookings" ? "default" : "ghost"}
          className={activeTab === "bookings" ? "bg-gray-300 shadow-sm" : ""}
          onClick={() => setActiveTab("bookings")}
        >
          Bookings
        </Button>
        <Button
          variant={activeTab === "booking" ? "default" : "ghost"}
          className={activeTab === "booking" ? "bg-gray-300 shadow-sm" : ""}
          onClick={() => setActiveTab("booking")}
        >
          New Booking
        </Button>
      </div>

      {/* Content */}
      {activeTab === "rooms" && (
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-lg sm:text-xl">Room Status Overview</CardTitle>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rooms</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search rooms..." 
                    className="pl-9 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RoomGrid 
              rooms={filteredRooms} 
              onStatusChange={handleRoomStatusChange}
              getStatusColor={getStatusColor}
            />
          </CardContent>
        </Card>
      )}

      {activeTab === "bookings" && (
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-lg sm:text-xl">Recent Bookings</CardTitle>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search bookings..." className="pl-9 w-full" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <BookingsList 
              bookings={bookings}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              getStatusColor={getStatusColor}
            />
          </CardContent>
        </Card>
      )}

      {activeTab === "booking" && <RoomBooking />}
    </div>
  );
};
