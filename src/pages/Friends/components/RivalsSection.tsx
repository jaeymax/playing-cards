import { ChevronRight, Flame } from "lucide-react";

const RivalsSection = () => {
  return (
    <section className="rounded-2xl bg-gray-800/70 border border-gray-700/80 p-5 md:p-6">

      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <Flame className="w-4 h-4 text-red-400" />
          </div>

          <div>

            <h2 className="text-base font-bold text-white">
              Your Rivals
            </h2>

            <p className="text-xs text-gray-500">
              Players you battle most often
            </p>

          </div>

        </div>

        <button className="text-xs text-gray-500 hover:text-white flex items-center gap-1">
          View all
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

      </div>

      <div className="grid sm:grid-cols-2 gap-3">

        <div className="rounded-xl bg-gray-900/30 border border-gray-700/60 p-4">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-xs font-bold">
              KM
            </div>

            <div className="flex-1">

              <p className="text-sm font-semibold text-white">
                Kofi Mensah
              </p>

              <p className="text-[10px] text-gray-500">
                35 games played
              </p>

            </div>

            <div className="text-right">

              <p className="text-[9px] text-gray-600 uppercase">
                H2H
              </p>

              <p className="text-sm font-black text-white">
                18 - 17
              </p>

            </div>

          </div>

          <button className="w-full mt-3 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-[10px] font-semibold">
            Challenge Rival
          </button>

        </div>

        <div className="rounded-xl bg-gray-900/30 border border-gray-700/60 p-4">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-xs font-bold">
              AO
            </div>

            <div className="flex-1">

              <p className="text-sm font-semibold text-white">
                Ama Owusu
              </p>

              <p className="text-[10px] text-gray-500">
                22 games played
              </p>

            </div>

            <div className="text-right">

              <p className="text-[9px] text-gray-600 uppercase">
                H2H
              </p>

              <p className="text-sm font-black text-white">
                11 - 11
              </p>

            </div>

          </div>

          <button className="w-full mt-3 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-[10px] font-semibold">
            Challenge Rival
          </button>

        </div>

      </div>

    </section>
  );
};

export default RivalsSection;