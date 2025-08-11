
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";

interface Room {
  id: string;
  type: string;
  status: string;
  price: number;
  guest: string | null;
  floor: number;
}

interface RoomStatsProps {
  rooms: Room[];
  onFilterChange: (status: string) => void;
}

export const RoomStats = ({ rooms, onFilterChange }: RoomStatsProps) => {
  const roomStats = {
    available: rooms.filter(r => r.status === "Available").length,
    occupied: rooms.filter(r => r.status === "Occupied").length,
    reserved: rooms.filter(r => r.status === "Reserved").length,
    maintenance: rooms.filter(r => r.status === "Maintenance").length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onFilterChange("available")}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-xl font-bold text-green-600">{roomStats.available}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onFilterChange("occupied")}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Occupied</p>
              <p className="text-xl font-bold text-blue-600">{roomStats.occupied}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onFilterChange("reserved")}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Reserved</p>
              <p className="text-xl font-bold text-yellow-600">{roomStats.reserved}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onFilterChange("maintenance")}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <Calendar className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Maintenance</p>
              <p className="text-xl font-bold text-red-600">{roomStats.maintenance}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
