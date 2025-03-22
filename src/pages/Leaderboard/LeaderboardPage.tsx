import React, { useState } from "react";
import LeaderboardTable from "./components/LeaderboardTable";
import LeaderboardHeader from "./components/LeaderboardHeader";
import TopThree from "./components/TopThree";

type LeaderboardFilter = "global" | "monthly" | "weekly";

const LeaderboardPage: React.FC = () => {
  const [currentFilter, setCurrentFilter] =
    useState<LeaderboardFilter>("global");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <LeaderboardHeader
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="containe max-w-4xl mx-auto px-4 py-8 space-y-8">
        <TopThree currentFilter={currentFilter} />
        <LeaderboardTable
          currentFilter={currentFilter}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default LeaderboardPage;
