import React from "react";

const TournamentHeader: React.FC = () => {
  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">
                Weekend Championship
              </h1>
              <span className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded">
                In Progress
              </span>
            </div>
            <p className="text-gray-400 mt-1">
              32 Players • Double Elimination • 1000 Gems Prize Pool
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Current Match</p>
              <p className="text-lg font-medium text-white">Quarter Finals</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg">
              View Your Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentHeader;
