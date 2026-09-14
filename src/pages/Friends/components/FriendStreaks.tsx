import { ChevronRight, Flame, Trophy } from "lucide-react";

interface Streak {
  id: number;
  name: string;
  avatar: string;
  days: number;
  isActiveToday?: boolean;
}

interface FriendStreaksProps {
  streaks?: Streak[];
}

const FriendStreaks: React.FC<FriendStreaksProps> = ({
  streaks = [
    {
      id: 1,
      name: "Kofi Mensah",
      avatar: "KM",
      days: 12,
      isActiveToday: true,
    },
    {
      id: 2,
      name: "Ama Owusu",
      avatar: "AO",
      days: 8,
      isActiveToday: true,
    },
    {
      id: 3,
      name: "Yaw Boateng",
      avatar: "YB",
      days: 5,
      isActiveToday: false,
    },
  ],
}) => {
  return (
    <section className="rounded-2xl bg-gray-800/70 border border-gray-700/80 p-5 md:p-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start justify-between gap-4 mb-5">

        <div className="flex items-start gap-3">

          <div className="relative w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/10 flex items-center justify-center">

            <Flame className="w-4 h-4 text-orange-400 fill-orange-400/10" />

            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-400" />

          </div>

          <div>

            <div className="flex items-center gap-2">

              <h2 className="text-base font-bold text-white">
                Friend Streaks
              </h2>

              <span className="px-1.5 py-0.5 rounded-md bg-orange-500/10 text-orange-400 text-[10px] font-bold">
                {streaks.length}
              </span>

            </div>

            <p className="text-xs text-gray-500 mt-0.5">
              Keep playing together and build your streak
            </p>

          </div>

        </div>

        <button className="text-xs font-medium text-gray-500 hover:text-white flex items-center gap-1 transition-colors shrink-0">

          View all

          <ChevronRight className="w-3.5 h-3.5" />

        </button>

      </div>


      {/* =====================================================
          STREAK LIST
      ===================================================== */}

      <div className="space-y-2">

        {streaks.map((streak, index) => (

          <div
            key={streak.id}
            className={`group rounded-xl border p-3 transition-all ${
              index === 0
                ? "border-orange-500/15 bg-orange-500/[0.03]"
                : "border-transparent hover:border-gray-700/70 hover:bg-gray-700/30"
            }`}
          >

            <div className="flex items-center gap-3">

              {/* RANK */}

              <div className="w-5 text-center shrink-0">

                {index === 0 ? (

                  <Trophy className="w-3.5 h-3.5 text-orange-400 mx-auto" />

                ) : (

                  <span className="text-[10px] font-bold text-gray-600">
                    {index + 1}
                  </span>

                )}

              </div>


              {/* AVATAR */}

              <div className="relative shrink-0">

                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-500/20 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white">

                  {streak.avatar}

                </div>

                {/* ONLINE / TODAY INDICATOR */}

                {streak.isActiveToday && (

                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-gray-800" />

                )}

              </div>


              {/* FRIEND INFO */}

              <div className="flex-1 min-w-0">

                <div className="flex items-center gap-2">

                  <p className="text-sm font-semibold text-white truncate">
                    {streak.name}
                  </p>

                  {streak.isActiveToday && (

                    <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">

                      <span className="w-1 h-1 rounded-full bg-emerald-400" />

                      Played today

                    </span>

                  )}

                </div>

                <p className="text-[10px] text-gray-600 mt-0.5">
                  Keep the streak alive
                </p>

              </div>


              {/* STREAK */}

              <div className="flex items-center gap-2 shrink-0">

                <div className="text-right">

                  <div className="flex items-center justify-end gap-1.5">

                    <Flame
                      className={`w-3.5 h-3.5 ${
                        streak.days >= 10
                          ? "text-orange-400 fill-orange-400/20"
                          : "text-orange-500"
                      }`}
                    />

                    <span className="text-sm font-bold text-orange-300">
                      {streak.days}
                    </span>

                  </div>

                  <p className="text-[9px] text-gray-600">
                    {streak.days === 1 ? "day" : "days"}
                  </p>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* =====================================================
          FOOTER / CTA
      ===================================================== */}

      <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center justify-between gap-3">

        <div className="flex items-center gap-2 min-w-0">

          <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />

          <span className="text-[10px] text-gray-600 truncate">
            Play with a friend today to keep your streak alive
          </span>

        </div>

        <button className="text-[10px] font-semibold text-orange-400 hover:text-orange-300 transition-colors shrink-0">
          Play a Game
        </button>

      </div>

    </section>
  );
};

export default FriendStreaks;