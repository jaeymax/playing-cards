interface TimerBarProps {
  remainingSeconds: number;
  maxSeconds?: number;
  position: "top" | "bottom";
  isCurrentPlayer: boolean;
}

const TimerBar = ({
  remainingSeconds,
  maxSeconds = 30,
  position,
  isCurrentPlayer,
}: TimerBarProps) => {
  const progress = (remainingSeconds / maxSeconds) * 100;

  const getBarColor = () => {
    if (remainingSeconds <= 5) return "from-red-500 to-red-600";
    if (remainingSeconds <= 10) return "from-yellow-500 to-yellow-600";
    return "from-emerald-500 to-emerald-600";
  };

  const positionClass = position === "top" ? "top-0" : "bottom-0";

  return (
    <div
      className={`fixed z-[100000000000000000000000000000000] ${positionClass} left-0 right-0 h-12 bg-black/20 backdrop-blur- border-b-1 ${
        position === "top" ? "border-b-gray-700" : "border-t-gray-700"
      } flex items-center px-6 z-50`}
    >
      <div className="flex flex-col items-cente gap- w-full">
        <div className="flex-1">
          <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
            <div
              className={`h-full bg-gradient-to-r ${getBarColor()} transition-all duration-100 rounded-full shadow-lg`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 borde text-center min-w-fit">
          {/* <span className="text-sm md:text-xs font-semibold text-gray-300 tracking-wide">
            {position === "top" ? "" : ""} 
          </span> */}
          <span
            className={`text-lg font-bold min-w-[3rem] text-right ${
              remainingSeconds <= 5
                ? "text-red-400 animate-pulse"
                : remainingSeconds <= 10
                ? "text-yellow-400"
                : "text-emerald-300"
            }`}
          >
            {remainingSeconds}s
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimerBar;
