import { useState } from "react";



const AudioMessageBubble = ({ audioBuffer }: { audioBuffer: ArrayBuffer}) => {
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
  
    const handlePlay = () => {
      if (!audioURL) {
        const audioBlob = new Blob([audioBuffer], { type: "audio/mp4" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
  
        const audio = new Audio(url);
        setIsPlaying(true);
  
        audio.onended = () => setIsPlaying(false);
  
        audio.play().catch(() => {
          alert("Tap again to play.");
        });
      } else {
        const audio = new Audio(audioURL);
        setIsPlaying(true);
  
        audio.onended = () => setIsPlaying(false);
  
        audio.play().catch(() => {
          alert("Tap again to play.");
        });
      }
    };
  
    return (
      <button
        onClick={handlePlay}
        className="flex items-center gap-2 px-3 py-2 bg-blue-700/40 hover:bg-blue-700/60 text-blue-100 rounded-lg transition-all duration-200 mt-1 shadow-inner border border-blue-900/40"
      >
        {/* Play icon */}
        {!isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
          </svg>
        ) : (
          <div className="flex gap-1">
            <div className="w-1 h-4 bg-blue-300 animate-pulse"></div>
            <div className="w-1 h-4 bg-blue-300 animate-bounce"></div>
            <div className="w-1 h-4 bg-blue-300 animate-pulse"></div>
          </div>
        )}
  
        <span className="text-xs">
          {isPlaying ? "Playing..." : "Tap to Play"}
        </span>
      </button>
    );
  };
  
export default AudioMessageBubble