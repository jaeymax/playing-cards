import React from "react";

const TournamentCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg w-[400px] border border-gray-700 overflow-hidden ">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 bg-gray-700 rounded animate-pulse w-3/5"></div>
          <div className="h-6 w-20 bg-gray-700 rounded-full animate-pulse"></div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-24"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-40"></div>
          </div>

          <div className="flex justify-between text-sm">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-20"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-28"></div>
          </div>

          <div className="flex justify-between text-sm">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-24"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-28"></div>
          </div>

          <div className="flex justify-between text-sm">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-16"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-24"></div>
          </div>

          <div className="flex justify-between text-sm">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-16"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-32"></div>
          </div>

          <div className="flex justify-between text-sm">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-20"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-24"></div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-750 border-t border-gray-700">
        <div className="w-full h-10 bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default TournamentCardSkeleton;
