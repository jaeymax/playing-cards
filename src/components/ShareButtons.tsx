import { useState } from "react";

interface ShareButtonsProps {
  gameCode?: string;
}

const ShareButtons = ({ gameCode }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/spectate/${gameCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareX = () => {
    const link = `${window.location.origin}/spectate/${gameCode}`;
    const text = `Watch me play! Join game ${gameCode}: ${link}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const handleShareFacebook = () => {
    const link = `${window.location.origin}/spectate/${gameCode}`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        link
      )}`,
      "_blank"
    );
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-4 border-b border-gray-600 pb-2">
        Share Game
      </h3>

      <div className="space-y-2">
        <button
          onClick={handleCopyLink}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-sm transition"
        >
          {copied ? "✓ Copied!" : "Copy Link"}
        </button>

        <button
          onClick={handleShareX}
          className="w-full px-4 py-2 bg-black hover:bg-gray-900 rounded-lg font-semibold text-sm transition border border-gray-600"
        >
          Share on X
        </button>

        <button
          onClick={handleShareFacebook}
          className="w-full px-4 py-2 bg-blue-900 hover:bg-blue-800 rounded-lg font-semibold text-sm transition"
        >
          Share on Facebook
        </button>

        {gameCode && (
          <div className="mt-4 p-2 bg-gray-700 rounded text-center">
            <p className="text-xs text-gray-400">Game Code</p>
            <p className="font-mono font-bold text-lg">{gameCode}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareButtons;
