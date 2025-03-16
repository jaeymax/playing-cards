import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      {/* Left: Call to Action */}
      <div className="space-y-6">
        <h1 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Enter the Arena of Cards
        </h1>
        <p className="text-lg text-gray-300">
          Challenge players worldwide, compete in tournaments, and become a
          legendary card master.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg transform transition hover:scale-105">
            Play Now
          </button>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-lg transform transition hover:scale-105">
            Invite Friend
          </button>
          <button className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transform transition hover:scale-105">
            Play vs Computer
          </button>
        </div>
      </div>

      {/* Right: Game Preview */}
      <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-2xl border border-gray-700">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Add your game preview animation here */}
          <div className="flex gap-4 animate-float">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-32 h-48 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg transform rotate-3 hover:rotate-0 transition-transform"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

// Add this to your global CSS or Tailwind config
// @keyframes float {
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-20px); }
//   100% { transform: translateY(0px); }
// }
// .animate-float {
//   animation: float 3s ease-in-out infinite;
// }
