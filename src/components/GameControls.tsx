interface GameControlsProps {
  showButtons: boolean;
  isDealing: boolean;
  isShuffling: boolean;
  shuffledAtLeastOnce?:boolean;
  onDeal: () => void;
  onShuffle: () => void;
}

const GameControls = ({
  showButtons,
  isDealing,
  isShuffling,
  shuffledAtLeastOnce,
  onDeal,
  onShuffle,
}: GameControlsProps) => {
  if (!showButtons) return null;

  return (
    <div className="flex hidde absolute w-fit gap-2 borde top-1/2 left-1/2 -translate-x-1/2 button-container z-[1000000000000]">
      {shuffledAtLeastOnce && (
      <button
        id="deal-cards"
        disabled={isDealing || isShuffling}
        className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full text-sm
            hover:from-purple-500 hover:to-blue-400 transition-al duration-300 disabled:opacity-0 disabled:cursor-not-allowed 
            font-medium shadow-lg hover:shadow-xl"
        onClick={onDeal}
      >
        Deal
      </button>
      )}
      <button
        id="shuffle"
        disabled={isShuffling || isDealing}
        className="flex items-center gap- px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-full text-sm 
            hover:from-emerald-500 hover:to-teal-400 transition-all duration-300 disabled:opacity-0 disabled:cursor-not-allowed 
            font-medium shadow-lg hover:shadow-xl"
        onClick={onShuffle}
      >
        Shuffle
      </button>
    </div>
  );
};

export default GameControls;
