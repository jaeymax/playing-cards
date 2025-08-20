import { useState } from "react";

const ShareOverlay = ({
  gameCode,
  onClose,
}: {
  gameCode: string | undefined;
  onClose: () => void;
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/game/${gameCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-[url('./assets/background1.jpg')] backdrop-blur-sm z-[100000000] flex items-start justify-center p-4">
      <div
        className="bg-gray-800/40 backdrop-blur-md rounded-xl p-4 sm:p-6 w-[95%] sm:max-w-md 
                    space-y-4 sm:space-y-6 border border-white/10 shadow-2xl mt-4 sm:mt-20
                    ring-1 ring-white/20"
      >
        <div className="text-center space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Share Game Link
          </h3>
          <p className="text-xs sm:text-sm text-gray-200/80">
            Send this link to your friends to join the game
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div
            className="flex-1 bg-black/20 backdrop-blur-sm rounded-lg p-2 sm:p-3 
                        font-mono text-xs sm:text-sm text-white/80 overflow-x-auto 
                        border border-white/5 break-all"
          >
            {shareUrl}
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg 
                     transition-all duration-200 flex items-center justify-center gap-2
                     backdrop-blur-sm border border-white/10 hover:border-white/20
                     sm:min-w-[100px]"
          >
            {copied ? (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  />
                </svg>
              </>
            )}
          </button>
        </div>

        <div className="flex justify-center pt-2">
          <button
            onClick={onClose}
            className="text-xs sm:text-sm text-white/60 hover:text-white/90 transition-colors py-2"
          >
            Continue to Game
          </button>
        </div>
      </div>
    </div>
  );
};



export default ShareOverlay;