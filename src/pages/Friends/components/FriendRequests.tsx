import React, { useState } from "react";
import { FriendRequest } from "../types";

type RequestStatus = {
  [key: string]: {
    status: "accepted" | "declined" | null;
    loading: "accept" | "decline" | null;
  };
};

const FriendRequests: React.FC = () => {
  const [requestStatuses, setRequestStatuses] = useState<RequestStatus>({});

  const handleRequest = async (
    requestId: string,
    action: "accepted" | "declined"
  ) => {
    // Set loading state for specific action
    setRequestStatuses((prev) => ({
      ...prev,
      [requestId]: {
        status: null,
        loading: action === "accepted" ? "accept" : "decline",
      },
    }));

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update status and clear loading
    setRequestStatuses((prev) => ({
      ...prev,
      [requestId]: { status: action, loading: null },
    }));
  };

  const requests: FriendRequest[] = [
    {
      id: "1",
      username: "DragonSlayer",
      avatar: "🐉",
      mutualFriends: 3,
      rank: "#45",
      timeSent: "2h ago",
    },
    {
      id: "2",
      username: "SpadeQueen",
      avatar: "♠️",
      mutualFriends: 5,
      rank: "#23",
      timeSent: "4h ago",
    },
    {
      id: "3",
      username: "MagicMaster",
      avatar: "🎭",
      mutualFriends: 1,
      rank: "#89",
      timeSent: "1d ago",
    },
  ];

  return (
    <div className="space-y-4">
      {requests.map((request) => {
        const status = requestStatuses[request.id] || {
          status: null,
          loading: null,
        };

        return (
          <div
            key={request.id}
            className="bg-gray-750 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-xl">
                  {request.avatar}
                </div>
              </div>
              <div>
                <h3 className="text-white font-medium">{request.username}</h3>
                <p className="text-sm text-gray-400">
                  {request.mutualFriends} mutual friends • Rank {request.rank}
                </p>
                <p className="text-xs text-gray-500">{request.timeSent}</p>
              </div>
            </div>

            <div className="flex gap-2">
              {status.status ? (
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    status.status === "accepted"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {status.status === "accepted" ? (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Accepted</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span>Declined</span>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleRequest(request.id, "accepted")}
                    disabled={status.loading !== null}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-blue-400 
                             flex items-center gap-2 min-w-[90px] justify-center"
                  >
                    {status.loading === "accept" ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Accept"
                    )}
                  </button>
                  <button
                    onClick={() => handleRequest(request.id, "declined")}
                    disabled={status.loading !== null}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:bg-gray-600
                             flex items-center gap-2 min-w-[90px] justify-center"
                  >
                    {status.loading === "decline" ? (
                      <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Decline"
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FriendRequests;
