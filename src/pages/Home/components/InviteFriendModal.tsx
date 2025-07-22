import React from "react";
import Modal from "../../../components/Modal";

interface InviteFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data - replace with real data later
const onlineFriends = [
  {
    id: 1,
    name: "Alex",
    avatar: "👾",
    status: "online",
    lastSeen: "Just now",
    level: 42,
  },
  {
    id: 2,
    name: "Sarah",
    avatar: "🎮",
    status: "online",
    lastSeen: "2m ago",
    level: 38,
  },
  {
    id: 3,
    name: "Mike",
    avatar: "🎲",
    status: "online",
    lastSeen: "5m ago",
    level: 27,
  },
];

const InviteFriendModal: React.FC<InviteFriendModalProps> = ({
  isOpen,
  onClose,
}) => {
  const handleInvite = (friendId: number) => {
    console.log(`Inviting friend ${friendId}`);
    // Implement invite logic here
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite Friend to Play">
      <div className="space-y-4 p-2">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search friends..."
            className="w-full bg-gray-700 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Friends List */}
        <div className="space-y-3">
          {onlineFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl hover:from-gray-750 hover:to-gray-650 transition-all duration-300 border border-gray-600"
            >
              <div className="flex items-center gap-4">
                {/* Avatar with gradient border */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-2xl">
                      {friend.avatar}
                    </div>
                  </div>
                  {/* Status indicator */}
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-2 border-gray-800 bg-green-400 rounded-full"></div>
                </div>

                {/* User info */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{friend.name}</h3>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                      Lvl {friend.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>{friend.lastSeen}</span>
                  </div>
                </div>
              </div>

              {/* Invite button */}
              <button
                onClick={() => handleInvite(friend.id)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Invite</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default InviteFriendModal;
