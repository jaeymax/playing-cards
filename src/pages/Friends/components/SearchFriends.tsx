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

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFriends;
