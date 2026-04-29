import { useNavigate } from "react-router-dom";

interface GameNotFoundPageProps {
  gameCode?: string;
  onReturnHome?: () => void;
  onGoBack?: () => void;
}

const GameNotFoundPage = ({
  gameCode,
  onReturnHome,
  onGoBack,
}: GameNotFoundPageProps) => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    onReturnHome ? onReturnHome() : navigate("/");
  };

  const handleGoBack = () => {
    onGoBack ? onGoBack() : navigate(-1);
  };

  return (
    <div className="relative bg-green-800 bg-[url('https://res.cloudinary.com/dbvame158/image/upload/v1770519565/background1_jx3rry.jpg')] bg-cover min-h-screen flex flex-col items-center justify-center p-4">
      {/* Animated background blur elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 lg:p-12 border border-blue-400/20 shadow-2xl text-center">
          {/* Error Icon */}
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-red-500/20 border border-red-400/50 rounded-full backdrop-blur-sm">
              <svg
                className="w-12 h-12 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Game Not Found
          </h1>

          {/* Description */}
          <p className="text-gray-300 mb-2">
            The game code{" "}
            <span className="font-mono font-semibold text-blue-300">
              "{gameCode || "N/A"}"
            </span>{" "}
            could not be found.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            The game may have expired, been deleted, or the code may be
            incorrect.
          </p>

          {/* Suggestions */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 mb-8 border border-gray-700/30">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">
              Troubleshooting Tips
            </p>
            <ul className="text-left space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold mt-0.5">•</span>
                <span>Double-check the game code spelling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold mt-0.5">•</span>
                <span>The game may have finished or expired</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold mt-0.5">•</span>
                <span>Try returning to the main page and joining again</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleReturnHome}
              className="w-full px-6 py-3 bg-blue-600/80 hover:bg-blue-600 backdrop-blur-sm rounded-lg text-white font-semibold transition shadow-lg hover:shadow-xl"
            >
              Return Home
            </button>
            <button
              onClick={handleGoBack}
              className="w-full px-6 py-3 bg-slate-800/50 hover:bg-slate-800 backdrop-blur-sm rounded-lg text-gray-300 font-semibold transition border border-gray-700/30"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameNotFoundPage;
