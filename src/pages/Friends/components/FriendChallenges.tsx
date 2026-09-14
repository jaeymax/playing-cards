import { ChevronRight, Clock3, Gamepad2, Swords } from "lucide-react";
import { useState } from "react";

const FriendChallenges = () => {
  const [activeTab, setActiveTab] = useState<
    "incoming" | "active" | "history"
  >("incoming");

  const incomingChallenges = [
    {
      id: 1,
      name: "Kofi Mensah",
      username: "@kofimensah",
      avatar: "KM",
      rating: 1824,
      rank: 21,
      type: "Friendly Match",
      winPoints: 10,
      time: "4m ago",
    },
    {
      id: 2,
      name: "Yaw Boateng",
      username: "@yawboateng",
      avatar: "YB",
      rating: 1482,
      rank: 112,
      type: "Cash Challenge",
      stake: "₵5.00",
      winPoints: 10,
      time: "18m ago",
    },
  ];

  const activeChallenges = [
    {
      id: 1,
      name: "Ama Owusu",
      username: "@amaowusu",
      avatar: "AO",
      rating: 1590,
      rank: 66,
      gameId: 4821,
      myScore: 7,
      opponentScore: 5,
      turn: "your",
      timeLeft: 54,
      gameType: "Friendly Match",
    },
  ];

  const history = [
    {
      id: 1,
      name: "Kwame Asante",
      avatar: "KA",
      result: "Won",
      score: "10 - 7",
      date: "Yesterday",
    },
    {
      id: 2,
      name: "Kofi Mensah",
      avatar: "KM",
      result: "Lost",
      score: "8 - 10",
      date: "2 days ago",
    },
    {
      id: 3,
      name: "Yaw Boateng",
      avatar: "YB",
      result: "Won",
      score: "10 - 4",
      date: "4 days ago",
    },
  ];

  return (
    <section className="rounded-2xl bg-gray-800/70 border border-gray-700/80 p-5 md:p-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start justify-between gap-4 mb-5">

        <div className="flex items-start gap-3">

          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/10 flex items-center justify-center shrink-0">
            <Swords className="w-4 h-4 text-orange-400" />
          </div>

          <div>

            <div className="flex items-center gap-2">

              <h2 className="text-base font-bold text-white">
                Friend Challenges
              </h2>

              <span className="px-1.5 py-0.5 rounded-md bg-orange-500/10 text-orange-400 text-[10px] font-bold">
                {incomingChallenges.length + activeChallenges.length}
              </span>

            </div>

            <p className="text-xs text-gray-500 mt-0.5">
              Challenges and games with your friends
            </p>

          </div>

        </div>

        <button className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors shrink-0">

          View all

          <ChevronRight className="w-3.5 h-3.5" />

        </button>

      </div>


      {/* =====================================================
          TABS
      ===================================================== */}

      <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-900/50 border border-gray-700/50 mb-5">

        {/* INCOMING */}

        <button
          onClick={() => setActiveTab("incoming")}
          className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "incoming"
              ? "bg-gray-700 text-white shadow-sm"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >

          <span>
            Incoming
          </span>

          {incomingChallenges.length > 0 && (
            <span
              className={`min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[9px] font-bold ${
                activeTab === "incoming"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-700 text-gray-500"
              }`}
            >
              {incomingChallenges.length}
            </span>
          )}

        </button>


        {/* ACTIVE */}

        <button
          onClick={() => setActiveTab("active")}
          className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "active"
              ? "bg-gray-700 text-white shadow-sm"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >

          <span>
            Active
          </span>

          {activeChallenges.length > 0 && (
            <span
              className={`min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[9px] font-bold ${
                activeTab === "active"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-700 text-gray-500"
              }`}
            >
              {activeChallenges.length}
            </span>
          )}

        </button>


        {/* HISTORY */}

        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 flex items-center justify-center h-9 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "history"
              ? "bg-gray-700 text-white shadow-sm"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          History
        </button>

      </div>


      {/* =====================================================
          INCOMING CHALLENGES
      ===================================================== */}

      {activeTab === "incoming" && (

        <div className="space-y-3">

          {incomingChallenges.map((challenge) => (

            <div
              key={challenge.id}
              className="rounded-xl bg-gray-900/40 border border-orange-500/10 hover:border-orange-500/20 p-4 transition-colors"
            >

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                {/* PLAYER */}

                <div className="flex items-center gap-3 flex-1 min-w-0">

                  <div className="relative shrink-0">

                    <div className="w-11 h-11 rounded-full bg-orange-500/10 border border-orange-500/10 flex items-center justify-center text-xs font-bold text-white">
                      {challenge.avatar}
                    </div>

                  </div>

                  <div className="min-w-0">

                    <div className="flex items-center gap-2">

                      <p className="text-sm font-semibold text-white truncate">
                        {challenge.name}
                      </p>

                      <span className="text-[9px] font-bold text-gray-500 bg-gray-700/70 px-1.5 py-0.5 rounded shrink-0">
                        #{challenge.rank}
                      </span>

                    </div>

                    <p className="text-[10px] text-gray-500 mt-0.5">
                      {challenge.rating.toLocaleString()} rating
                    </p>

                    <div className="flex items-center gap-2 mt-1.5">

                      <span className="text-[10px] text-gray-400">
                        {challenge.type}
                      </span>

                      <span className="text-gray-700">
                        •
                      </span>

                      <span className="text-[10px] text-gray-500">
                        First to {challenge.winPoints}
                      </span>

                      {challenge.stake && (
                        <>
                          <span className="text-gray-700">
                            •
                          </span>

                          <span className="text-[10px] font-semibold text-emerald-400">
                            {challenge.stake} stake
                          </span>
                        </>
                      )}

                    </div>

                  </div>

                </div>


                {/* TIME */}

                <div className="hidden sm:flex items-center gap-1 text-[10px] text-gray-600">

                  <Clock3 className="w-3 h-3" />

                  {challenge.time}

                </div>


                {/* ACTIONS */}

                <div className="flex gap-2 sm:shrink-0">

                  <button className="flex-1 sm:flex-none h-9 px-4 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-[10px] font-bold transition-colors">

                    Accept

                  </button>

                  <button className="flex-1 sm:flex-none h-9 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-[10px] font-semibold transition-colors">

                    Decline

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* =====================================================
          ACTIVE GAMES
      ===================================================== */}

      {activeTab === "active" && (

        <div className="space-y-3">

          {activeChallenges.map((challenge) => (

            <div
              key={challenge.id}
              className="rounded-xl bg-gray-900/40 border border-emerald-500/20 p-4"
            >

              {/* ACTIVE LABEL */}

              <div className="flex items-center justify-between mb-3">

                <div className="flex items-center gap-2">

                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Active Game
                  </span>

                </div>

                <span className="text-[10px] text-gray-600">
                  Game #{challenge.gameId}
                </span>

              </div>


              {/* PLAYERS */}

              <div className="flex items-center gap-3">

                {/* YOU */}

                <div className="flex-1">

                  <div className="flex items-center gap-2">

                    <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-[10px] font-bold">
                      YOU
                    </div>

                    <div>

                      <p className="text-xs font-semibold text-white">
                        You
                      </p>

                      <p className="text-[9px] text-gray-600">
                        Your score
                      </p>

                    </div>

                  </div>

                </div>


                {/* SCORE */}

                <div className="text-center px-3">

                  <div className="flex items-center gap-2">

                    <span className="text-xl font-black text-white">
                      {challenge.myScore}
                    </span>

                    <span className="text-gray-600 text-sm">
                      -
                    </span>

                    <span className="text-xl font-black text-gray-400">
                      {challenge.opponentScore}
                    </span>

                  </div>

                  <p className="text-[9px] text-gray-600 mt-0.5">
                    First to 10
                  </p>

                </div>


                {/* OPPONENT */}

                <div className="flex-1">

                  <div className="flex items-center justify-end gap-2 text-right">

                    <div>

                      <p className="text-xs font-semibold text-white">
                        {challenge.name}
                      </p>

                      <p className="text-[9px] text-gray-600">
                        #{challenge.rank}
                      </p>

                    </div>

                    <div className="w-9 h-9 rounded-full bg-orange-500/10 border border-orange-500/10 flex items-center justify-center text-[10px] font-bold">
                      {challenge.avatar}
                    </div>

                  </div>

                </div>

              </div>


              {/* TURN + TIMER */}

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700/50">

                <div className="flex items-center gap-2">

                  <span
                    className={`w-2 h-2 rounded-full ${
                      challenge.turn === "your"
                        ? "bg-emerald-500"
                        : "bg-yellow-500"
                    }`}
                  />

                  <span
                    className={`text-[10px] font-semibold ${
                      challenge.turn === "your"
                        ? "text-emerald-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {challenge.turn === "your"
                      ? "Your turn"
                      : `${challenge.name}'s turn`}
                  </span>

                  {challenge.turn === "your" && (
                    <span className="text-[10px] text-gray-600">
                      · {challenge.timeLeft}s remaining
                    </span>
                  )}

                </div>


                <button className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1.5 transition-colors">

                  <Gamepad2 className="w-3.5 h-3.5" />

                  Resume Game

                </button>

              </div>

            </div>

          ))}

          {/* EMPTY STATE */}

          {activeChallenges.length === 0 && (

            <div className="py-8 text-center">

              <div className="w-10 h-10 mx-auto rounded-xl bg-gray-700/50 flex items-center justify-center mb-3">

                <Gamepad2 className="w-4 h-4 text-gray-500" />

              </div>

              <p className="text-xs font-semibold text-gray-400">
                No active games
              </p>

              <p className="text-[10px] text-gray-600 mt-1">
                Accepted challenges will appear here.
              </p>

            </div>

          )}

        </div>

      )}


      {/* =====================================================
          HISTORY
      ===================================================== */}

      {activeTab === "history" && (

        <div className="space-y-2">

          {history.map((game) => (

            <div
              key={game.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/30 border border-gray-700/50"
            >

              <div className="w-10 h-10 rounded-full bg-gray-700/70 flex items-center justify-center text-[10px] font-bold">
                {game.avatar}
              </div>

              <div className="flex-1">

                <p className="text-xs font-semibold text-white">
                  vs {game.name}
                </p>

                <p className="text-[10px] text-gray-600 mt-0.5">
                  {game.date}
                </p>

              </div>

              <div className="text-right">

                <p
                  className={`text-[10px] font-bold ${
                    game.result === "Won"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {game.result}
                </p>

                <p className="text-xs font-black text-gray-300 mt-0.5">
                  {game.score}
                </p>

              </div>

            </div>

          ))}

          <button className="w-full h-9 mt-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-400 hover:text-white text-[10px] font-semibold transition-colors">
            View Challenge History
          </button>

        </div>

      )}


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <Clock3 className="w-3.5 h-3.5 text-gray-600" />

          <span className="text-[10px] text-gray-600">
            Active games remain available here
          </span>

        </div>

        <button className="text-[10px] text-gray-500 hover:text-white transition-colors">
          Manage
        </button>

      </div>

    </section>
  );
};

export default FriendChallenges;