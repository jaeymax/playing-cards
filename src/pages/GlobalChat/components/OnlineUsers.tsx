import React from "react";

interface OnlineUsersProps {
  users: string[];
}

const OnlineUsers: React.FC<OnlineUsersProps> = ({ users }) => {
  return (
    <div className="p-4">
      <h2 className="text-white font-medium mb-4">Online Users</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-white">{user}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;
