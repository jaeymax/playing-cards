import { Flame, Gamepad2 } from "lucide-react";

const RecentActivity = () => {
  return (
    <section className="rounded-2xl bg-gray-800/70 border border-gray-700/80 p-5 md:p-6">

      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Gamepad2 className="w-4 h-4 text-purple-400" />
          </div>

          <div>

            <h2 className="text-base font-bold text-white">
              Friend Activity
            </h2>

            <p className="text-xs text-gray-500">
              Recent things your friends have done
            </p>

          </div>

        </div>

        <button className="text-xs text-gray-500 hover:text-white">
          View all
        </button>

      </div>

      <div className="space-y-3">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-[10px] font-bold">
            AO
          </div>

          <div className="flex-1">

            <p className="text-xs text-gray-300">
              <span className="font-semibold text-white">
                Ama Owusu
              </span>{" "}
              won a match against Kwame
            </p>

            <p className="text-[10px] text-gray-600 mt-0.5">
              18 minutes ago
            </p>

          </div>

          <span className="text-xs font-bold text-emerald-400">
            +10
          </span>

        </div>

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-[10px] font-bold">
            KM
          </div>

          <div className="flex-1">

            <p className="text-xs text-gray-300">
              <span className="font-semibold text-white">
                Kofi Mensah
              </span>{" "}
              reached a 5-game winning streak
            </p>

            <p className="text-[10px] text-gray-600 mt-0.5">
              1 hour ago
            </p>

          </div>

          <Flame className="w-4 h-4 text-orange-400" />

        </div>

      </div>

    </section>
  );
};

export default RecentActivity;