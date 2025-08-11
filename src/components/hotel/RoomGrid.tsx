
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye } from "lucide-react";

interface Room {
  id: string;
  type: string;
  status: string;
  price: number;
  guest: string | null;
  floor: number;
}

interface RoomGridProps {
  rooms: Room[];
  onStatusChange: (roomId: string, newStatus: string) => void;
  getStatusColor: (status: string) => string;
}

export const RoomGrid = ({ rooms, onStatusChange, getStatusColor }: RoomGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <div key={room.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">{room.id}</h3>
            <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Type: <span className="font-medium">{room.type}</span></p>
            <p className="text-sm text-gray-600">Floor: <span className="font-medium">{room.floor}</span></p>
            <p className="text-sm text-gray-600">Price: <span className="font-medium text-green-600">${room.price}/night</span></p>
            {room.guest && (
              <p className="text-sm text-gray-600">Guest: <span className="font-medium">{room.guest}</span></p>
            )}
          </div>
          <div className="mt-3 pt-3 border-t flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="w-3 h-3 mr-1" />
              View
            </Button>
            <Select onValueChange={(value) => onStatusChange(room.id, value)}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Change Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Occupied">Occupied</SelectItem>
                <SelectItem value="Reserved">Reserved</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </div>
  );
};
