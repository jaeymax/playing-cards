import React, { useState } from "react";
import TournamentRegistrationModal from "./TournamentRegistrationModal";

const TournamentBanner: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              Weekend Tournament
            </h3>
            <p className="text-gray-300">
              Prize pool: 1000 Gems | Top 3 players qualify for Championships
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">12:34:56</div>
              <div className="text-sm text-gray-400">Registration ends in</div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-medium rounded-lg transform transition hover:scale-105"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
      <TournamentRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        countdown="12:34:56"
      />
    </div>
  );
};

export default TournamentBanner;
