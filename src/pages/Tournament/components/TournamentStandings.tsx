import { useAppContext } from "@/contexts/AppContext";
import React from "react";
//import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface TournamentStandingsProps {
  tournamentId?: number;
  tournamentFormat?: string;
  standings: any[] | undefined;
  numberOfParticipants?: number;
  loading?: boolean;
}

// const MOCK_STANDINGS: Participant[] = [
//   {
//     id: 1,
//     username: "ProPlayer1",
//     image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProPlayer1",
//     rank: "Grandmaster",
//     rating: 2800,
//     is_rated: true,
//     status: "active",
//     wins: 5,
//     score: 10,
//     losses: 0,
//   },
//   {
//     id: 2,
//     username: "CardMaster",
//     image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=CardMaster",
//     rank: "Master",
//     rating: 2600,
//     is_rated: true,
//     status: "active",
//     wins: 4,
//     score: 8,
//     losses: 1,
//   },
//   {
//     id: 3,
//     username: "ShadowKing",
//     image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=ShadowKing",
//     rank: "Expert",
//     rating: 2400,
//     is_rated: true,
//     status: "active",
//     wins: 4,
//     score: 8,
//     losses: 1,
//   },
//   {
//     id: 4,
//     username: "WildBluff",
//     image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=WildBluff",
//     rank: "Expert",
//     rating: 2350,
//     is_rated: true,
//     status: "active",
//     wins: 3,
//     score: 6,
//     losses: 2,
//   },
//   {
//     id: 5,
//     username: "LuckyStrike",
//     image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=LuckyStrike",
//     rank: "Intermediate",
//     rating: 2100,
//     is_rated: true,
//     status: "eliminated",
//     wins: 2,
//     score: 4,
//     losses: 3,
//   },
// ];

const TournamentStandings: React.FC<TournamentStandingsProps> = ({
  tournamentFormat,
  standings,
  loading,
}) => {
  const { user } = useAppContext();

  const getPositionLabel = (index: number): string => {
    if (index === 0) return "1st";
    if (index === 1) return "2nd";

    // Adjust index to account for 1st and 2nd already assigned
    const adjustedIndex = index - 2;
    let tier = 2;
    let tierStart = 3;
    let cumulativeCount = 0;

    // Find which tier this adjusted index falls into
    while (adjustedIndex >= cumulativeCount + tier) {
      cumulativeCount += tier;
      tierStart += tier;
      tier *= 2;
    }

    const tierEnd = tierStart + tier - 1;

    // Format the ordinal suffix
    const getOrdinal = (n: number) => {
      const j = n % 10,
        k = n % 100;
      if (j === 1 && k !== 11) return n + "st";
      if (j === 2 && k !== 12) return n + "nd";
      if (j === 3 && k !== 13) return n + "rd";
      return n + "th";
    };

    return `${getOrdinal(tierStart)}-${getOrdinal(tierEnd)}`;
  };

    if (loading) {

    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-16 bg-gray-700 rounded animate-pulse"
          ></div>
        ))}
      </div>
    );
  }


  if (!standings || standings?.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No standings available yet
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700 text-left text-gray-300 text-sm">
            <th className="px-4 py-3 font-semibold">Rank</th>
            <th className="px-4 py-3 font-semibold">Player</th>
            {/* <th className="px-4 py-3 font-semibold">Rating</th> */}
            {tournamentFormat == "Single Elimination" && (
              <th className="px-4 py-3 font-semibold text-center">Wins</th>
            )}
            {tournamentFormat == "Swiss" && (
              <>
                <th className="px-4 py-3 font-semibold text-center">Wins</th>
                <th className="px-4 py-3 font-semibold text-center">Losses</th>
                <th className="px-4 py-3 font-semibold text-center">
                  Sum of Opponents Score
                </th>
              </>
            )}
            <th className="px-4 py-3 font-semibold text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {standings?.map((participant, index) => (
            <tr
              key={participant.id}
              className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
            >
              <td className="px-4 py-3">
                <span className="font-bold text-blue-400 text-xs sm:text-lg">
                  {tournamentFormat === "Single Elimination"
                    ? getPositionLabel(index)
                    : `#${index + 1}`}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {participant.image_url ? (
                    <img
                      src={participant.image_url}
                      alt={participant.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <img
                      className="rounded-full w-8 h-8 object-cover"
                      src={
                        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                      }
                      alt=""
                    />
                  )}
                  <div>
                    <p className="font-medium text-white text-xs sm:text-sm">
                      {user?.id == participant.id
                        ? "You"
                        : participant.username}
                    </p>
                    {/* <p className="text-xs text-gray-400">{participant.rank}</p> */}
                  </div>
                </div>
              </td>
              {/* <td className="px-4 py-3 text-cente">
                <span className="text-gray-400 text-xs sm:text-sm font-semibold">
                  {participant.rating}
                </span>
              </td> */}

              {tournamentFormat == "Single Elimination" && (
                <td className="px-4 py-3 text-center text-sm sm:text-sm">
                  <span className="text-green-400 font-semibold">
                    {participant.num_wins}
                  </span>
                </td>
              )}
              {tournamentFormat == "Swiss" && (
                <>
                  <td className="px-4 py-3 text-center  text-xs sm:text-sm">
                    <span className="text-yellow-400 font-semibold">
                      {participant.score}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs sm:text-sm">
                    <span className="text-red-400 font-semibold">
                      {participant.losses}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs sm:text-sm">
                    <span className="text-red-400 font-semibold">
                      {participant.buchholz_score}
                    </span>
                  </td>
                </>
              )}
              <td className="px-4 py-3 text-center text-xs sm:text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    participant.status === "active"
                      ? "bg-green-900 text-green-200"
                      : participant.status === "eliminated"
                      ? "bg-red-900 text-red-200"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {participant.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TournamentStandings;
