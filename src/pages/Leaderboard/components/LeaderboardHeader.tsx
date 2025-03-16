import React from "react";

interface LeaderboardHeaderProps {
  currentFilter: "global" | "monthly" | "weekly";
  onFilterChange: (filter: "global" | "monthly" | "weekly") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  const filters = [
    { id: "global", label: "All Time" },
    { id: "monthly", label: "This Month" },
    { id: "weekly", label: "This Week" },
  ];

  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
            <div className="flex bg-gray-700 rounded-lg p-1">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => onFilterChange(filter.id as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentFilter === filter.id
                      ? "bg-gray-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full lg:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search players..."
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
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
        </div>
      </div>
    </div>
  );
};

export default LeaderboardHeader;
