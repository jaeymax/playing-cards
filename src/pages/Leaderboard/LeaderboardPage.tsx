import React, { useEffect, useState } from "react";
import LeaderboardTable from "./components/LeaderboardTable";
import LeaderboardHeader from "./components/LeaderboardHeader";
import TopThree from "./components/TopThree";
import { baseUrl } from "@/config/api";

type LeaderboardFilter = "global" | "monthly" | "weekly";

const LeaderboardPage: React.FC = () => {
  const [currentFilter, setCurrentFilter] =
    useState<LeaderboardFilter>("global");
  const [searchQuery, setSearchQuery] = useState("");

    const [players, setPlayers] = React.useState<any>([]);
    const [topPlayers, setTopPlayers] = React.useState<any>([]);
      const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
      // Fetch player data from the API
      const fetchPlayers = async () => {
        try {
          const response = await fetch(`${baseUrl}/leaderboard`);
          const data = await response.json();
          setPlayers(data);
          setTopPlayers(data.slice(0, 3)); // Assuming the API returns players sorted by rank
          setLoading(false);
          console.log("players", data);
        } catch (error) {
          console.error("Error fetching players:", error);
          setLoading(false);
        }
      };
  
      fetchPlayers();
    }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <LeaderboardHeader
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="containe max-w-4xl mx-auto md:px-4 py-8 space-y-8">
        <TopThree currentFilter={currentFilter} topPlayers={topPlayers} />
        <LeaderboardTable
          currentFilter={currentFilter}
          searchQuery={searchQuery}
          players={players}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default LeaderboardPage;
