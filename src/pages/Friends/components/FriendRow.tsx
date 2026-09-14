import { DoorOpen, Eye, Swords, Users } from "lucide-react";

const FriendRow = ({ friend, status }: any) => {
  return (
    <div className="group rounded-xl border border-transparent hover:border-gray-700/70 hover:bg-gray-700/30 p-3 transition-all">

      <div className="flex items-center gap-3">

        {/* AVATAR */}

        <div className="relative shrink-0">

          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-white border border-white/10 ${
              friend.status === "offline"
                ? "bg-gray-700/50"
                : "bg-gradient-to-br from-blue-500/30 to-indigo-500/20"
            }`}
          >
            {friend.avatar}
          </div>

          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${status.dot} border-2 border-gray-800`}
          />

        </div>


        {/* FRIEND INFO */}

        <div className="flex-1 min-w-0">

          <div className="flex items-center gap-2">

            <p className="font-semibold text-sm text-white truncate">
              {friend.username}
            </p>

            <span className="hidden sm:inline-flex shrink-0 text-[9px] font-bold text-gray-500 bg-gray-700/70 px-1.5 py-0.5 rounded">
              #{friend.globalRank}
            </span>

          </div>


          <div className="flex items-center gap-2 mt-0.5">

            <span className="text-[11px] text-gray-500">
              {friend.rating.toLocaleString()}
            </span>

            <span className="text-gray-700">
              •
            </span>

            <span className="text-[11px] text-gray-500">
              {friend.division}
            </span>

          </div>


          <div className="flex items-center gap-1.5 mt-1.5">

            <span
              className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
            />

            <span
              className={`text-[10px] font-semibold ${status.text}`}
            >
              {status.label}
            </span>

            <span className="text-[10px] text-gray-700">
              •
            </span>

            <span className="text-[10px] text-gray-500">
              {status.description}
            </span>

          </div>

        </div>


        {/* MATCH INFO */}

        {friend.status === "in_match" && friend.match && (

          <div className="hidden md:flex items-center gap-3 px-4 border-l border-gray-700/60">

            <div className="text-right">

              <p className="text-[9px] uppercase tracking-wider text-gray-600">
                Playing
              </p>

              <span className="text-xs font-semibold text-gray-300">
                {friend.match.opponentName}
              </span>

            </div>

            <div className="text-sm font-black text-white">

              {friend.match.playerScore}

              <span className="text-gray-600 mx-1">
                -
              </span>

              {friend.match.opponentScore}

            </div>

          </div>

        )}


        {/* LOBBY INFO */}

        {friend.status === "in_lobby" && friend.lobby && (

          <div className="hidden md:flex items-center gap-2 px-4 border-l border-gray-700/60">

            <Users className="w-3.5 h-3.5 text-gray-500" />

            <span className="text-xs text-gray-400">
              {friend.lobby.players}/{friend.lobby.maxPlayers}
            </span>

          </div>

        )}


        {/* ACTION */}

        <div className="shrink-0">

          {friend.status === "idle" && (

            <button className="h-9 px-3.5 rounded-lg bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-500 text-blue-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all">

              <Swords className="w-3.5 h-3.5" />

              <span className="hidden sm:inline">
                Challenge
              </span>

            </button>

          )}


          {friend.status === "in_match" && (

            <button className="h-9 px-3.5 rounded-lg bg-orange-500/10 hover:bg-orange-500 border border-orange-500/20 hover:border-orange-500 text-orange-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all">

              <Eye className="w-3.5 h-3.5" />

              <span className="hidden sm:inline">
                Spectate
              </span>

            </button>

          )}


          {friend.status === "in_lobby" && (

            <button className="h-9 px-3.5 rounded-lg bg-blue-500/10 hover:bg-blue-500 border border-blue-500/20 hover:border-blue-500 text-blue-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all">

              <DoorOpen className="w-3.5 h-3.5" />

              <span className="hidden sm:inline">
                View Lobby
              </span>

            </button>

          )}


          {friend.status === "offline" && (

            <button className="h-8 px-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-500 hover:text-gray-300 text-[10px] font-semibold transition-all">
              Profile
            </button>

          )}

        </div>

      </div>


      {/* MOBILE MATCH DETAILS */}

      {friend.status === "in_match" && friend.match && (

        <div className="md:hidden ml-14 mt-2.5 flex items-center gap-2">

          <Eye className="w-3 h-3 text-orange-400" />

          <span className="text-[10px] text-gray-500">
            vs {friend.match.opponentName}
          </span>

          <span className="text-gray-700">
            •
          </span>

          <span className="text-[10px] font-bold text-gray-300">
            {friend.match.playerScore} -{" "}
            {friend.match.opponentScore}
          </span>

        </div>

      )}


      {/* MOBILE LOBBY DETAILS */}

      {friend.status === "in_lobby" && friend.lobby && (

        <div className="md:hidden ml-14 mt-2.5 flex items-center gap-1.5">

          <Users className="w-3 h-3 text-blue-400" />

          <span className="text-[10px] text-gray-500">
            {friend.lobby.players}/{friend.lobby.maxPlayers} players
            in lobby
          </span>

        </div>

      )}

    </div>
  );
};

export default FriendRow;