import React, { useState } from "react";

export interface RivalData {
  id: string;
  username: string;
  avatarUrl?: string;
  rankTitle: string;
  rating: number;
  myWins: number;
  rivalWins: number;
  lastFiveResults: ("W" | "L")[]; // 'W' = user won, 'L' = rival won
  currentStreakPlayer: "user" | "rival" | "none";
  currentStreakCount: number;
  isOnline: boolean;
}

// Sample fallback data if props aren't provided yet
const mockRival: RivalData = {
  id: "rival_kofi",
  username: "Kofi Mensah",
  avatarUrl: "",
  rankTitle: "Master",
  rating: 1824,
  myWins: 12,
  rivalWins: 14,
  lastFiveResults: ["W", "L", "W", "L", "L"],
  currentStreakPlayer: "rival",
  currentStreakCount: 3,
  isOnline: true,
};

interface RivalCardProps {
  rival?: RivalData;
  onChallenge?: (rivalId: string) => void;
}

const RivalCard: React.FC<RivalCardProps> = ({
  rival = mockRival,
  onChallenge,
}) => {
  const [isChallenging, setIsChallenging] = useState(false);

  const handleChallengeClick = () => {
    setIsChallenging(true);
    if (onChallenge) onChallenge(rival.id);

    // Reset button loading state after 2 seconds for feedback
    setTimeout(() => setIsChallenging(false), 2000);
  };

  const isUserWinningH2H = rival.myWins > rival.rivalWins;
  const isTied = rival.myWins === rival.rivalWins;

  return (
    <div className="w-full bg-gray-950/80 rounded-xl border border-gray-800 p-5 space-y-5 shadow-inner">
      {/* Competitor Matchup Header */}
      <div className="flex items-center justify-between gap-4">
        {/* User Side */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center font-bold text-lg text-blue-400">
            YOU
          </div>
          <div>
            <span className="block text-sm font-bold text-white">You</span>
            <span className="text-xs text-blue-400 font-semibold">
              ⭐ 1,720
            </span>
          </div>
        </div>

        {/* VS Badge */}
        <div className="flex flex-col items-center">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wider">
            VS
          </span>
        </div>

        {/* Rival Side */}
        <div className="flex items-center gap-3 text-right flex-row-reverse">
          <div className="relative">
            {rival.avatarUrl ? (
              <img
                src={rival.avatarUrl}
                alt={rival.username}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/50"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center font-bold text-lg text-amber-400">
                {rival.username.charAt(0)}
              </div>
            )}
            {rival.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-gray-950" />
            )}
          </div>
          <div>
            <span className="block text-sm font-bold text-white">
              {rival.username}
            </span>
            <span className="text-xs text-amber-400 font-semibold">
              {rival.rankTitle} • ⭐ {rival.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Scoreboard Counter */}
      <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800/80">
        <div className="text-center mb-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Head-to-Head Wins
          </span>
        </div>
        <div className="grid grid-cols-3 items-center text-center">
          <div className="text-2xl md:text-3xl font-black text-blue-400">
            {rival.myWins}
          </div>
          <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">
            {isUserWinningH2H ? "Leading" : isTied ? "Tied" : "Trailing"}
          </div>
          <div className="text-2xl md:text-3xl font-black text-amber-400">
            {rival.rivalWins}
          </div>
        </div>
      </div>

      {/* Form & Streak Details */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        {/* Last 5 Matches Badges */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium mr-1">
            Last 5:
          </span>
          <div className="flex gap-1.5">
            {rival.lastFiveResults.map((result, idx) => (
              <span
                key={idx}
                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-black ${
                  result === "W"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                }`}
              >
                {result}
              </span>
            ))}
          </div>
        </div>

        {/* Current Streak Indicator */}
        <div className="text-xs font-semibold px-3 py-1 rounded-lg bg-gray-900 border border-gray-800 flex items-center gap-1.5">
          {rival.currentStreakPlayer === "rival" && (
            <span className="text-amber-400 flex items-center gap-1">
              🔥 {rival.username} is on a {rival.currentStreakCount}-win streak
            </span>
          )}
          {rival.currentStreakPlayer === "user" && (
            <span className="text-emerald-400 flex items-center gap-1">
              🔥 You are on a {rival.currentStreakCount}-win streak
            </span>
          )}
          {rival.currentStreakPlayer === "none" && (
            <span className="text-gray-400">No active win streak</span>
          )}
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={handleChallengeClick}
        disabled={isChallenging}
        className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg ${
          isChallenging
            ? "bg-gray-800 text-gray-400 cursor-not-allowed"
            : "bg-amber-500 hover:bg-amber-400 text-gray-950 shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-[0.99]"
        }`}
      >
        {isChallenging ? (
          <>
            <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            Sending Challenge...
          </>
        ) : (
          <>
            <span>⚔️</span> CHALLENGE {rival.username.toUpperCase()}
          </>
        )}
      </button>
    </div>
  );
};

export default RivalCard;