interface GameMessageProps {
  message: string;
    gameEnded?: boolean;
}


const GameMessage = ({ message, gameEnded }: GameMessageProps) => {
    if (gameEnded) return null;
  return (
    <div className="bg-yellow-200/0 opacity-50 sm:opacity-100 message-box text-center text-gray-300 mx-auto max-w-md w-full p-4 rounded-m text-xs absolute bottom-36 sm:bottom-52 left-1/2 -translate-x-1/2">
      {message}
    </div>
  );
};

export default GameMessage;
