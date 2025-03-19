import React from "react";
import Modal from "../../../components/Modal";

interface InviteFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data - replace with real data later
const onlineFriends = [
  { id: 1, name: "Alex", avatar: "👤", status: "online" },
  { id: 2, name: "Sarah", avatar: "👤", status: "online" },
  { id: 3, name: "Mike", avatar: "👤", status: "online" },
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
    <Modal isOpen={isOpen} onClose={onClose} title="Invite Friend">
      <div className="space-y-4">
        {onlineFriends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{friend.avatar}</span>
              <div>
                <h3 className="font-medium">{friend.name}</h3>
                <span className="text-sm text-green-400">{friend.status}</span>
              </div>
            </div>
            <button
              onClick={() => handleInvite(friend.id)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              Invite
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default InviteFriendModal;
