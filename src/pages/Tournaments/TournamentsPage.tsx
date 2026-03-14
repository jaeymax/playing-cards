import React, { useState, useMemo, useEffect } from "react";
import TournamentsHeader from "./components/TournamentsHeader";
import TournamentCard from "./components/TournamentCard";
import TournamentCardSkeleton from "./components/TournamentCardSkeleton";
import { Tournament, TournamentStatus } from "./types";
import NavBar from "@/components/NavBar";
import { baseUrl } from "@/config/api";

const TournamentsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<TournamentStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const tournaments: Tournament[] = [
  //   {
  //     id: "1",
  //     title: "Weekend Championship",
  //     type: "Elimination",
  //     status: "upcoming",
  //     startDate: "2024-03-15T14:00:00Z",
  //     registrationClosingDate: "2024-03-14T14:00:00Z",
  //     entryFee: "500",
  //     prizePool: "10000",
  //     registeredPlayers: 24,
  //     maxPlayers: 32,
  //     format: "Single Elimination",
  //     difficulty: "advanced",
  //   },
  //   {
  //     id: "2",
  //     title: "Beginner Friendly Tournament",
  //     type: "Swiss",
  //     status: "upcoming",
  //     startDate: "2024-03-14T18:00:00Z",
  //     registrationClosingDate: "2024-03-13T18:00:00Z",
  //     entryFee: "100",
  //     prizePool: "2000",
  //     registeredPlayers: 16,
  //     maxPlayers: 16,
  //     format: "Swiss Round",
  //     difficulty: "beginner",
  //   },
  //   {
  //     id: "3",
  //     title: "Pro League Quarter Finals",
  //     type: "League",
  //     status: "ongoing",
  //     startDate: "2024-03-10T15:00:00Z",
  //     registrationClosingDate: "2024-03-09T15:00:00Z",
  //     entryFee: "1000",
  //     prizePool: "25000",
  //     registeredPlayers: 8,
  //     maxPlayers: 8,
  //     format: "Best of 5",
  //     difficulty: "pro",
  //   },
  //   {
  //     id: "4",
  //     title: "Daily Tournament",
  //     type: "Elimination",
  //     status: "ongoing",
  //     startDate: "2024-03-11T12:00:00Z",
  //     registrationClosingDate: "2024-03-10T12:00:00Z",
  //     entryFee: "200",
  //     prizePool: "5000",
  //     registeredPlayers: 64,
  //     maxPlayers: 64,
  //     format: "Double Elimination",
  //     difficulty: "intermediate",
  //   },
  //   {
  //     id: "5",
  //     title: "Last Week's Championship",
  //     type: "Elimination",
  //     status: "completed",
  //     startDate: "2024-03-05T14:00:00Z",
  //     registrationClosingDate: "2024-03-04T14:00:00Z",
  //     entryFee: "500",
  //     prizePool: "15000",
  //     registeredPlayers: 32,
  //     maxPlayers: 32,
  //     format: "Single Elimination",
  //     difficulty: "advanced",
  //   },
  //   {
  //     id: "6",
  //     title: "Monthly Casual Tournament",
  //     type: "Swiss",
  //     status: "completed",
  //     startDate: "2024-03-01T16:00:00Z",
  //     registrationClosingDate: "2024-02-29T16:00:00Z",
  //     entryFee: "100",
  //     prizePool: "3000",
  //     registeredPlayers: 32,
  //     maxPlayers: 32,
  //     format: "Swiss Round",
  //     difficulty: "beginner",
  //   },
  // ];

  error && true;

  const fetchTournaments = async () => {
    setLoading(true);
    setError(null);
    try {
      // make get request to /api/tournaments
      const response = await fetch(`${baseUrl}/tournaments`);
      if (!response.ok) {
        throw new Error("Failed to fetch tournaments");
      }
      const data = await response.json();
      setTournaments(data.data);
      console.log("Fetched tournaments:", data.data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching tournaments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const filteredTournaments = useMemo(() => {
    let filtered = tournaments;

    // Filter by status if not "all"
    if (activeFilter !== "all") {
      filtered = filtered.filter((t) => t.status === activeFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by date (newest first)
    return filtered.sort(
      (a, b) =>
        new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    );
  }, [tournaments, activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar showSignUps={true} />
      <TournamentsHeader
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [...Array(6)].map((_, i) => <TournamentCardSkeleton key={i} />)
            : filteredTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
        </div>

        {!loading && filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-400">No tournaments found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentsPage;