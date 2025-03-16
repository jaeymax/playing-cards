import React from "react";

const TournamentBracket: React.FC = () => {
  return (
    <div className="relative">
      {/* Mobile View */}
      <div className="lg:hidden space-y-8">
        {[1, 2, 3, 4].map((round) => (
          <div key={round} className="w-full">
            <h3 className="text-sm font-medium text-gray-400 mb-4 text-center">
              {round === 1
                ? "Quarter Finals"
                : round === 2
                ? "Semi Finals"
                : round === 3
                ? "Finals"
                : "Champion"}
            </h3>
            <div className="space-y-4 px-2">
              {Array(Math.max(1, 8 / Math.pow(2, round - 1)))
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-750 rounded-lg border border-gray-700 p-3"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium text-sm">
                          Player 1
                        </span>
                        <span className="text-gray-400 text-sm">0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium text-sm">
                          Player 2
                        </span>
                        <span className="text-gray-400 text-sm">0</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="min-w-[800px] p-4">
          <div className="flex justify-between gap-4">
            {[1, 2, 3, 4].map((round) => (
              <div key={round} className="flex-1">
                <h3 className="text-center text-sm font-medium text-gray-400 mb-4">
                  {round === 1
                    ? "Quarter Finals"
                    : round === 2
                    ? "Semi Finals"
                    : round === 3
                    ? "Finals"
                    : "Champion"}
                </h3>

                <div className="space-y-8">
                  {Array(Math.max(1, 8 / Math.pow(2, round - 1)))
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="px-2">
                        <div className="bg-gray-750 rounded-lg border border-gray-700 p-3">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-white font-medium">
                                Player 1
                              </span>
                              <span className="text-gray-400">0</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white font-medium">
                                Player 2
                              </span>
                              <span className="text-gray-400">0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentBracket;
