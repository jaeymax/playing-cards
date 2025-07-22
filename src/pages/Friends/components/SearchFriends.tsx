import React, { useState } from "react";

const SearchFriends: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<{
      id: string;
      username: string;
      avatar: string;
      rank: string;
      matchesPlayed: number;
    }>
  >([]);
  const [pendingRequests, setPendingRequests] = useState<Set<string>>(
    new Set()
  );
  const [isRequestLoading, setIsRequestLoading] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Simulate API search
    setSearchResults([
      {
        id: "1",
        username: "HeartKing",
        avatar: "♥️",
        rank: "#12",
        matchesPlayed: 245,
      },
      {
        id: "2",
        username: "JokerWild",
        avatar: "🃏",
        rank: "#34",
        matchesPlayed: 178,
      },
      {
        id: "3",
        username: "RoyalFlush",
        avatar: "👑",
        rank: "#56",
        matchesPlayed: 312,
      },
    ]);
  };

  const handleFriendRequest = async (userId: string) => {
    setIsRequestLoading(userId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPendingRequests((prev) => new Set([...prev, userId]));
    setIsRequestLoading(null);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by username..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
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

      <div className="space-y-4">
        {searchResults.map((result) => (
          <div
            key={result.id}
            className="bg-gray-750 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl">
                {result.avatar}
              </div>
              <div>
                <h3 className="text-white font-medium">{result.username}</h3>
                <p className="text-sm text-gray-400">
                  Rank {result.rank} • {result.matchesPlayed} matches played
                </p>
              </div>
            </div>

            {pendingRequests.has(result.id) ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-gray-300 rounded-lg">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Request Sent</span>
              </div>
            ) : (
              <button
                onClick={() => handleFriendRequest(result.id)}
                disabled={isRequestLoading === result.id}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-blue-400 flex items-center gap-2 min-w-[120px] justify-center"
              >
                {isRequestLoading === result.id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Add Friend</span>
                  </>
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFriends;
