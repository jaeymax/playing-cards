



const ParticipantsModal = ({
    players,
    maxPlayers,
    currentPlayer
  }: {
    players: any[];
    maxPlayers: number; 
    currentPlayer:any
  }) => {
    return (
      <div className="fixed inset-x-0 bottom-4 z-[100000000] flex justify-center p-4">
        <div
          className="bg-gray-800/40 backdrop-blur-md rounded-xl p-4 sm:p-6 w-[95%] sm:max-w-md 
                      border border-white/10 shadow-2xl ring-1 ring-white/20"
        >
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">
                Waiting for Players ({players.length}/{maxPlayers})
              </h3>
            </div>
  
            <div className="space-y-3">
              {/* Connected Players */}
              {players.map((player) => (
                <div
                  key={`player-${player.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg bg-black/20 border border-white/5"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                      <img
                        src={player?.user?.image_url}
                        alt=""
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">
                      {currentPlayer?.id == player?.id? "You": player?.user?.username}
                    </div>
                    {player.is_dealer && (
                      <div className="text-xs text-blue-400">Host</div>
                    )}
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                </div>
              ))}
  
              {/* Waiting Slots */}
              {[...Array(maxPlayers - players.length)].map((_, i) => (
                <div
                  key={`waiting-${players.length + i}`}
                  className="flex items-center gap-3 p-2 rounded-lg bg-black/10 border border-white/5"
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
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default ParticipantsModal