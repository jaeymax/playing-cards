

const ParticipantsModal = ({
  players,
  maxPlayers,
  currentPlayer,
  hostId,
  onJoinGame,
  onCancelGame,
  isJoining,
  onLeaveGame,
}: {
  players: any[];
  maxPlayers: number;
  currentPlayer: any;
  hostId: number;
  onJoinGame: () => void;
  onCancelGame: () => void;
  isJoining:boolean;
  onLeaveGame: () => void;
}) => {
  // Check whether the current user is already in the game
  const isJoined = players.some(
    (player) => player?.id === currentPlayer?.id
  );

  const isFull = players.length >= maxPlayers;
  const isHost = currentPlayer?.user?.id === hostId;

  const handleButtonClick = () => {
    if (isJoined) {
      if(isHost) {
        // If the current user is the host, cancel the game
        onCancelGame();
      } else {
        // If the current user is not the host, leave the game
        onLeaveGame();
      }
    } else {
      onJoinGame();
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-4 z-[100000000] flex justify-center p-4">
      <div
        className="
          bg-gray-800/40 backdrop-blur-md rounded-xl p-4 sm:p-6
          w-[95%] sm:max-w-md
          border border-white/10 shadow-2xl ring-1 ring-white/20
        "
      >
        <div className="space-y-4">

          {/* Header */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">
              Waiting for Players ({players.length}/{maxPlayers})
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              {isJoined
                ? "You are in the game"
                : isFull
                ? "This game is full"
                : "Join the game when you're ready"}
            </p>
          </div>

          {/* Players */}
          <div className="space-y-3">
            {players.map((player) => (
              <div
                key={`player-${player.id}`}
                className="
                  flex items-center gap-3 p-2 rounded-lg
                  bg-black/20 border border-white/5
                "
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[1px]">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                    {player?.user?.image_url ? (
                      <img
                        src={player.user.image_url}
                        alt=""
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                        alt=""
                        className="w-full h-full rounded-full object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Player name */}
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">
                    {currentPlayer?.id === player?.id
                      ? "You"
                      : player?.user?.username}
                  </div>

                  {player.is_dealer && (
                    <div className="text-xs text-blue-400">
                      Host
                    </div>
                  )}
                </div>

                {/* Online indicator */}
                <div className="w-2 h-2 bg-green-400 rounded-full" />
              </div>
            ))}

            {/* Waiting Slots */}
            {[...Array(Math.max(0, maxPlayers - players.length))].map(
              (_, i) => (
                <div
                  key={`waiting-${players.length + i}`}
                  className="
                    flex items-center gap-3 p-2 rounded-lg
                    bg-black/10 border border-white/5
                  "
                >
                  <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <div className="text-sm text-gray-500">
                      Waiting for player...
                    </div>
                  </div>

                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" />
                </div>
              )
            )}
          </div>

          {/* Join / Leave Button */}
          {!isJoined && !isFull && (
            <button
              onClick={handleButtonClick}
              className="
                w-full mt-2
                flex items-center justify-center gap-2
                py-3 px-4
                rounded-xl
                bg-gradient-to-r from-blue-600 to-blue-500
                hover:from-blue-500 hover:to-blue-400
                active:scale-[0.98]
                text-white font-semibold
                shadow-lg shadow-blue-500/20
                transition-all duration-200
              "
            >
              {/* User Plus Icon */}
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v6m3-3h-6M9 13a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0"
                />
              </svg>
               {isJoining ? (
  <svg
    className="w-5 h-5 animate-spin text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
) : "Join Game"}
              
            </button>
          )}

          {isJoined && (
            <button
              onClick={onLeaveGame}
              className="
                w-full mt-2
                flex items-center justify-center gap-2
                py-3 px-4
                rounded-xl
                bg-gray-700/70
                hover:bg-red-500/20
                border border-gray-600
                hover:border-red-500/40
                text-gray-300
                hover:text-red-400
                font-semibold
                active:scale-[0.98]
                transition-all duration-200
              "
            >
              {/* Leave Icon */}
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12H3m0 0l4-4m-4 4l4 4M21 5v14a2 2 0 01-2 2h-5"
                />
              </svg>
             {isHost ? "Cancel Game" : "Leave Game"}
              
            </button>
          )}

          {/* Full game message */}
          {!isJoined && isFull && (
            <div className="mt-2 text-center py-2">
              <span className="text-xs text-gray-500">
                Game Room is full
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ParticipantsModal;
