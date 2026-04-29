const TournamentHeaderSkeleton: React.FC = () => {
  return (
    <div className="px-4 md:px-0">
      <div className="h-12 md:h-14 lg:h-16 bg-gray-700 rounded-lg mb-2 animate-pulse w-3/4"></div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-3">
            <div className="h-4 bg-gray-700 rounded animate-pulse flex-1 max-w-xs"></div>
            <div className="p-3 rounded-full bg-gray-700 animate-pulse w-11 h-11"></div>
          </div>

          <div className="flex gap-4 text-sm items-center">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-32"></div>

            <div className="text-center">
              <div className="h-6 bg-gray-700 rounded animate-pulse w-12 mb-1"></div>
              <div className="h-3 bg-gray-700 rounded animate-pulse w-10"></div>
            </div>
            <div className="text-center">
              <div className="h-6 bg-gray-700 rounded animate-pulse w-12 mb-1"></div>
              <div className="h-3 bg-gray-700 rounded animate-pulse w-10"></div>
            </div>
            <div className="text-center">
              <div className="h-6 bg-gray-700 rounded animate-pulse w-12 mb-1"></div>
              <div className="h-3 bg-gray-700 rounded animate-pulse w-10"></div>
            </div>
            <div className="text-center">
              <div className="h-6 bg-gray-700 rounded animate-pulse w-12 mb-1"></div>
              <div className="h-3 bg-gray-700 rounded animate-pulse w-10"></div>
            </div>
          </div>
        </div>

        <div className="h-4 bg-gray-700 rounded animate-pulse w-full md:w-64 mb-4 md:mb-0"></div>

        <button
          disabled
          className="py-2.5 md:py-3 px-3 md:px-4 md:w-[200px] bg-gray-700 text-white font-bold text-xs sm:text-sm md:text-base rounded-lg animate-pulse"
        >
          &nbsp;
        </button>
      </div>
    </div>
  );
};

export default TournamentHeaderSkeleton;
