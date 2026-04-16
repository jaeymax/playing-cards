import React from "react";
import { TournamentStatus } from "../types";

interface TournamentsHeaderProps {
  activeFilter: TournamentStatus;
  onFilterChange: (filter: TournamentStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const TournamentsHeader: React.FC<TournamentsHeaderProps> = ({
  activeFilter,
  onFilterChange,
  // searchQuery,
  // onSearchChange,
}) => {
  const filters: { id: TournamentStatus; label: string }[] = [
    { id: "all", label: "All" },
    { id: "upcoming", label: "Upcoming" },
    { id: "ongoing", label: "Ongoing" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="w-full lg:w-auto flex flex-col lg:flex-row items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Tournaments</h1>

            <div className="flex bg-gray-700 rounded-lg p-1">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => onFilterChange(filter.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === filter.id
                      ? "bg-gray-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
{/* 
          <div className="w-full lg:w-64 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tournaments..."
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TournamentsHeader;
