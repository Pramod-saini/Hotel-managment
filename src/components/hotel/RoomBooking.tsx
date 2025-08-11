
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Users, Bed, Star, Wifi, Car, Coffee, Tv } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Room {
  id: string;
  type: string;
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
  available: boolean;
  rating: number;
  description: string;
}

export const RoomBooking = () => {
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState("1");
  const [rooms, setRooms] = useState("1");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    idType: "",
    idNumber: "",
    specialRequests: ""
  });

  const availableRooms: Room[] = [
    {
      id: "R101",
      type: "Standard Room",
      price: 120,
      capacity: 2,
      amenities: ["Wifi", "TV", "AC", "Room Service"],
      images: ["/placeholder.svg"],
      available: true,
      rating: 4.2,
      description: "Comfortable standard room with city view"
    },
    {
      id: "R201",
      type: "Deluxe Room",
      price: 180,
      capacity: 3,
      amenities: ["Wifi", "TV", "AC", "Mini Bar", "Balcony"],
      images: ["/placeholder.svg"],
      available: true,
      rating: 4.5,
      description: "Spacious deluxe room with premium amenities"
    },
    {
      id: "R301",
      type: "Executive Suite",
      price: 350,
      capacity: 4,
      amenities: ["Wifi", "TV", "AC", "Mini Bar", "Jacuzzi", "Butler Service"],
      images: ["/placeholder.svg"],
      available: true,
      rating: 4.8,
      description: "Luxury suite with separate living area"
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'tv': return <Tv className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'coffee': return <Coffee className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const roomPrice = selectedRoom ? selectedRoom.price : 0;
    const roomCount = parseInt(rooms);
    return nights * roomPrice * roomCount;
  };

  const handleSearch = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates");
      return;
    }
    setBookingStep(2);
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setBookingStep(3);
  };

  const handleBookingSubmit = () => {
    if (!selectedRoom || !checkInDate || !checkOutDate) return;
    
    const booking = {
      room: selectedRoom,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: parseInt(guests),
      rooms: parseInt(rooms),
      guestInfo,
      total: calculateTotal(),
      nights: calculateNights()
    };
    
    console.log("Booking submitted:", booking);
    alert("Booking confirmed! Confirmation details will be sent to your email.");
    setBookingStep(4);
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Search */}
      {bookingStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Available Rooms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label>Check-in Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkInDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkInDate ? format(checkInDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      onSelect={setCheckInDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label>Check-out Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkOutDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOutDate ? format(checkOutDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      onSelect={setCheckOutDate}
                      disabled={(date) => date <= (checkInDate || new Date())}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label>Guests</Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} Guest{num > 1 ? 's' : ''}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Rooms</Label>
                <Select value={rooms} onValueChange={setRooms}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} Room{num > 1 ? 's' : ''}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button onClick={handleSearch} className="w-full" size="lg">
              Search Available Rooms
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Room Selection */}
      {bookingStep === 2 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Available Rooms</h3>
            <Button variant="outline" onClick={() => setBookingStep(1)}>
              Modify Search
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRooms.map((room) => (
              <Card key={room.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <Bed className="w-8 h-8 text-gray-400" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{room.type}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{room.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">{room.description}</p>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>Up to {room.capacity} guests</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 3).map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {getAmenityIcon(amenity)}
                          <span className="ml-1">{amenity}</span>
                        </Badge>
                      ))}
                      {room.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{room.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        <span className="text-2xl font-bold text-green-600">${room.price}</span>
                        <span className="text-sm text-gray-600">/night</span>
                      </div>
                      <Button onClick={() => handleRoomSelect(room)}>
                        Select Room
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Guest Information */}
      {bookingStep === 3 && selectedRoom && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Guest Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input 
                    value={guestInfo.firstName}
                    onChange={(e) => setGuestInfo({...guestInfo, firstName: e.target.value})}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input 
                    value={guestInfo.lastName}
                    onChange={(e) => setGuestInfo({...guestInfo, lastName: e.target.value})}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              
              <div>
                <Label>Email</Label>
                <Input 
                  type="email"
                  value={guestInfo.email}
                  onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <Label>Phone</Label>
                <Input 
                  value={guestInfo.phone}
                  onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <Label>Address</Label>
                <Textarea 
                  value={guestInfo.address}
                  onChange={(e) => setGuestInfo({...guestInfo, address: e.target.value})}
                  placeholder="Enter address"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>ID Type</Label>
                  <Select value={guestInfo.idType} onValueChange={(value) => setGuestInfo({...guestInfo, idType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="license">Driver's License</SelectItem>
                      <SelectItem value="national-id">National ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>ID Number</Label>
                  <Input 
                    value={guestInfo.idNumber}
                    onChange={(e) => setGuestInfo({...guestInfo, idNumber: e.target.value})}
                    placeholder="Enter ID number"
                  />
                </div>
              </div>
              
              <div>
                <Label>Special Requests</Label>
                <Textarea 
                  value={guestInfo.specialRequests}
                  onChange={(e) => setGuestInfo({...guestInfo, specialRequests: e.target.value})}
                  placeholder="Any special requests or preferences"
                />
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button variant="outline" onClick={() => setBookingStep(2)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleBookingSubmit} className="flex-1">
                  Confirm Booking
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">{selectedRoom.type}</h4>
                <p className="text-sm text-gray-600">{selectedRoom.description}</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Check-in:</span>
                  <span>{checkInDate && format(checkInDate, "PPP")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Check-out:</span>
                  <span>{checkOutDate && format(checkOutDate, "PPP")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nights:</span>
                  <span>{calculateNights()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span>{guests}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rooms:</span>
                  <span>{rooms}</span>
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Room Rate:</span>
                  <span>${selectedRoom.price}/night</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes & Fees:</span>
                  <span>${(calculateTotal() * 0.12).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span className="text-green-600">${(calculateTotal() * 1.12).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {bookingStep === 4 && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-4">Your reservation has been successfully created.</p>
            <Button onClick={() => setBookingStep(1)}>Make Another Booking</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
