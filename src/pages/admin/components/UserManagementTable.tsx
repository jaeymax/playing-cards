import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  rank: string;
  status: "active" | "banned" | "suspended";
  joinDate: Date;
  gamesPlayed: number;
}

const UserManagementTable: React.FC = () => {
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      rank: "Gold",
      status: "active",
      joinDate: new Date("2024-01-01"),
      gamesPlayed: 150,
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice@example.com",
      rank: "Diamond",
      status: "active",
      joinDate: new Date("2024-01-05"),
      gamesPlayed: 342,
    },
    {
      id: 3,
      name: "Bob Wilson",
      email: "bob@example.com",
      rank: "Silver",
      status: "suspended",
      joinDate: new Date("2024-01-10"),
      gamesPlayed: 89,
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@example.com",
      rank: "Platinum",
      status: "active",
      joinDate: new Date("2024-01-15"),
      gamesPlayed: 267,
    },
    {
      id: 5,
      name: "James Brown",
      email: "james@example.com",
      rank: "Bronze",
      status: "banned",
      joinDate: new Date("2024-01-20"),
      gamesPlayed: 45,
    },
    {
      id: 6,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      rank: "Master",
      status: "active",
      joinDate: new Date("2024-01-02"),
      gamesPlayed: 523,
    },
    {
      id: 7,
      name: "Michael Lee",
      email: "michael@example.com",
      rank: "Gold",
      status: "suspended",
      joinDate: new Date("2024-01-08"),
      gamesPlayed: 178,
    },
    {
      id: 8,
      name: "Lisa Anderson",
      email: "lisa@example.com",
      rank: "Diamond",
      status: "active",
      joinDate: new Date("2024-01-12"),
      gamesPlayed: 412,
    },
    {
      id: 9,
      name: "David Wilson",
      email: "david@example.com",
      rank: "Bronze",
      status: "banned",
      joinDate: new Date("2024-01-18"),
      gamesPlayed: 23,
    },
    {
      id: 10,
      name: "Jennifer Taylor",
      email: "jennifer@example.com",
      rank: "Platinum",
      status: "active",
      joinDate: new Date("2024-01-03"),
      gamesPlayed: 289,
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "banned" | "suspended"
  >("all");

  const handleAction = (
    userId: number,
    action: "ban" | "suspend" | "activate"
  ) => {
    console.log(`${action} user ${userId}`);
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "all" || user.status === statusFilter)
  );

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-gray-700 rounded-lg px-4 py-2 text-white"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-gray-700 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="banned">Banned</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Rank</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Join Date</th>
              <th className="px-4 py-3 text-left">Games</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-750">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.rank}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.status === "active"
                        ? "bg-green-500/10 text-green-400"
                        : user.status === "banned"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {user.joinDate.toLocaleDateString()}
                </td>
                <td className="px-4 py-3">{user.gamesPlayed}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction(user.id, "ban")}
                      className="px-2 py-1 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20"
                    >
                      Ban
                    </button>
                    <button
                      onClick={() => handleAction(user.id, "suspend")}
                      className="px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded hover:bg-yellow-500/20"
                    >
                      Suspend
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementTable;
