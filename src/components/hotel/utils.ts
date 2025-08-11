
export const getStatusColor = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-800";
    case "Occupied":
      return "bg-blue-100 text-blue-800";
    case "Reserved":
      return "bg-yellow-100 text-yellow-800";
    case "Maintenance":
      return "bg-red-100 text-red-800";
    case "Active":
      return "bg-green-100 text-green-800";
    case "Confirmed":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const filterRooms = (rooms: any[], searchTerm: string, filterStatus: string) => {
  return rooms.filter(room => {
    const matchesSearch = room.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (room.guest && room.guest.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === "all" || room.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });
};
