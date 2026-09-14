import React from "react";
import { Search, Trophy, Users } from "lucide-react";
import NavBar from "@/components/NavBar";

interface Filter {
  id: string;
  label: string;
}

interface LeaderboardHeaderProps {
  currentFilter: string;
  onFilterChange: (filter: any) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: Filter[];
}

const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  filters,
}) => {
  return (
    <>
      <NavBar showSignUps={true} />

      <div className="border-b border-gray-800 bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8">

          {/* Heading */}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-yellow-500/20 bg-yellow-500/10">
                  <Trophy className="h-4 w-4 text-yellow-400" />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-yellow-400">
                  SparPlay Rankings
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Leaderboard
              </h1>

              <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500">
                See who is dominating the SparPlay table and track the
                players climbing to the top.
              </p>
            </div>

            {/* Search */}

            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  onSearchChange(e.target.value)
                }
                placeholder="Search players..."
                className="w-full rounded-xl border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

          </div>

          {/* Filters */}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">

            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-600">
              <Users className="h-3.5 w-3.5" />
              Rankings
            </div>

            <div className="flex max-w-full overflow-x-auto rounded-xl border border-gray-700 bg-gray-800 p-1 scrollbar-hide">

              {filters.map((filter) => {
                const active =
                  currentFilter === filter.id;

                return (
                  <button
                    key={filter.id}
                    onClick={() =>
                      onFilterChange(filter.id)
                    }
                    className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs font-bold transition ${
                      active
                        ? "bg-blue-500 text-white shadow-sm"
                        : "text-gray-500 hover:bg-gray-700 hover:text-gray-300"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default LeaderboardHeader;