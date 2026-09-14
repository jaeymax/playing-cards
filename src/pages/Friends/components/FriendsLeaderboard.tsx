import { ChevronRight, Minus, TrendingDown, TrendingUp, Trophy } from "lucide-react";

interface FriendRank {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  rank: number;
  change: number;
}

const FriendsLeaderboard: React.FC = () => {
  const leaderboard: FriendRank[] = [
    {
      id: 1,
      name: "Kofi Mensah",
      avatar: "KM",
      rating: 1784,
      rank: 1,
      change: 2,
    },
    {
      id: 2,
      name: "Ama Owusu",
      avatar: "AO",
      rating: 1712,
      rank: 2,
      change: -1,
    },
    {
      id: 3,
      name: "Yaw Boateng",
      avatar: "YB",
      rating: 1688,
      rank: 3,
      change: 1,
    },
    {
      id: 4,
      name: "You",
      avatar: "YO",
      rating: 1642,
      rank: 4,
      change: 0,
    },
  ];

  const currentUser = leaderboard.find(
    (player) => player.name === "You"
  );

  const getRankChange = (change: number) => {
    if (change > 0) {
      return {
        icon: TrendingUp,
        text: `+${change}`,
        className: "text-emerald-400",
      };
    }

    if (change < 0) {
      return {
        icon: TrendingDown,
        text: `${change}`,
        className: "text-red-400",
      };
    }

    return {
      icon: Minus,
      text: "—",
      className: "text-gray-600",
    };
  };

  return (
    <section className="rounded-2xl bg-gray-800/70 border border-gray-700/80 p-5">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start justify-between gap-3 mb-5">

        <div className="flex items-start gap-3">

          <div className="w-9 h-9 rounded-xl bg-yellow-500/10 border border-yellow-500/10 flex items-center justify-center">

            <Trophy className="w-4 h-4 text-yellow-400" />

          </div>

          <div>

            <h3 className="text-sm font-bold text-white">
              Friends Leaderboard
            </h3>

            <p className="text-[10px] text-gray-600 mt-0.5">
              Compete with your friends
            </p>

          </div>

        </div>

        <span className="text-[9px] font-semibold text-gray-600 bg-gray-900/50 px-2 py-1 rounded-md">
          RATING
        </span>

      </div>


      {/* =====================================================
          TOP 3
      ===================================================== */}

      <div className="space-y-1.5">

        {leaderboard.slice(0, 3).map((player, index) => {

          const change = getRankChange(player.change);
          const ChangeIcon = change.icon;

          return (
            <div
              key={player.id}
              className={`relative flex items-center gap-3 rounded-xl p-2.5 transition-all ${
                index === 0
                  ? "bg-yellow-500/[0.04] border border-yellow-500/10"
                  : "hover:bg-gray-700/30"
              }`}
            >

              {/* RANK */}

              <div className="w-5 text-center shrink-0">

                {index === 0 && (
                  <span className="text-base">
                    🥇
                  </span>
                )}

                {index === 1 && (
                  <span className="text-base">
                    🥈
                  </span>
                )}

                {index === 2 && (
                  <span className="text-base">
                    🥉
                  </span>
                )}

              </div>


              {/* AVATAR */}

              <div className="relative shrink-0">

                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold text-white border ${
                    index === 0
                      ? "bg-yellow-500/15 border-yellow-500/20"
                      : "bg-gradient-to-br from-blue-500/30 to-indigo-500/20 border-white/10"
                  }`}
                >
                  {player.avatar}
                </div>

              </div>


              {/* PLAYER */}

              <div className="flex-1 min-w-0">

                <p className="text-xs font-semibold text-white truncate">
                  {player.name}
                </p>

                <p className="text-[9px] text-gray-600 mt-0.5">
                  #{player.rank} among friends
                </p>

              </div>


              {/* RATING */}

              <div className="text-right shrink-0">

                <p className="text-xs font-bold text-blue-400">
                  {player.rating.toLocaleString()}
                </p>

                <div className="flex items-center justify-end gap-1 mt-0.5">

                  <ChangeIcon
                    className={`w-2.5 h-2.5 ${change.className}`}
                  />

                  <span
                    className={`text-[8px] font-semibold ${change.className}`}
                  >
                    {change.text}
                  </span>

                </div>

              </div>

            </div>
          );
        })}

      </div>


      {/* =====================================================
          YOUR POSITION
      ===================================================== */}

      {currentUser && (

        <div className="mt-4">

          <div className="flex items-center gap-2 mb-2">

            <span className="h-px flex-1 bg-gray-700/60" />

            <span className="text-[9px] uppercase tracking-wider text-gray-600 font-semibold">
              Your Position
            </span>

            <span className="h-px flex-1 bg-gray-700/60" />

          </div>


          <div className="rounded-xl bg-blue-500/[0.06] border border-blue-500/15 p-3">

            <div className="flex items-center gap-3">

              <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">

                <span className="text-[10px] font-black text-blue-400">
                  #{currentUser.rank}
                </span>

              </div>


              <div className="flex-1">

                <div className="flex items-center gap-2">

                  <p className="text-xs font-bold text-white">
                    You
                  </p>

                  {currentUser.rank <= 3 && (
                    <span className="text-[8px] font-bold text-yellow-400 bg-yellow-500/10 px-1.5 py-0.5 rounded">
                      TOP 3
                    </span>
                  )}

                </div>

                <p className="text-[9px] text-gray-600 mt-0.5">
                  {currentUser.rating.toLocaleString()} rating
                </p>

              </div>


              <div className="text-right">

                <p className="text-[9px] text-gray-600">
                  To #3
                </p>

                <p className="text-[10px] font-bold text-orange-400">
                  {(
                    leaderboard[2].rating - currentUser.rating
                  ).toLocaleString()}{" "}
                  pts
                </p>

              </div>

            </div>


            {/* PROGRESS TO NEXT RANK */}

            <div className="mt-3">

              <div className="flex items-center justify-between mb-1">

                <span className="text-[8px] text-gray-600">
                  Progress to #{currentUser.rank - 1}
                </span>

                <span className="text-[8px] text-gray-600">
                  {currentUser.rating} / {leaderboard[2].rating}
                </span>

              </div>

              <div className="h-1 rounded-full bg-gray-700 overflow-hidden">

                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${Math.min(
                      100,
                      (currentUser.rating / leaderboard[2].rating) * 100
                    )}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <button className="w-full mt-4 h-9 rounded-lg bg-gray-700/70 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white text-[10px] font-semibold flex items-center justify-center gap-1.5 transition-all">

        View Full Leaderboard

        <ChevronRight className="w-3 h-3" />

      </button>


      <div className="flex items-center justify-center gap-1.5 mt-3">

        <Trophy className="w-3 h-3 text-gray-600" />

        <span className="text-[9px] text-gray-600">
          Rankings update after every rated match
        </span>

      </div>

    </section>
  );
};


export default FriendsLeaderboard;