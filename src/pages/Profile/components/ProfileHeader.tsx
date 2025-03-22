import { useAppContext } from "@/contexts/AppContext";
import React from "react";

const ProfileHeader: React.FC = () => {

  const {user} = useAppContext();

  const getJoinedDate = (date: string) => {
    const joinedDate = new Date(date);  
    return joinedDate.toLocaleDateString();
  };

  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-5xl">
                <img src={user?.image_url} alt="User Avatar" className="rounded-full w-full h-full" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2">
              <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                <svg
                  className="w-5 h-5 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="text-center md:text-left flex-grow">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <h1 className="text-3xl font-bold text-white">{user?.username}</h1>
              <div className="flex gap-2">
                <span className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full">
                  Pro Player
                </span>
                <span className="px-3 py-1 text-sm bg-purple-500/10 text-purple-400 rounded-full">
                  Tournament Winner
                </span>
              </div>
            </div>
            <p className="text-gray-400 mt-2">Joined {getJoinedDate(user?.created_at)}</p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">#42</div>
              <div className="text-sm text-gray-400">Global Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{user?.games_won ? ((user.games_won / user.games_played) * 100).toFixed(2) : 0}%</div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{user?.games_played}</div>
              <div className="text-sm text-gray-400">Matches</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
