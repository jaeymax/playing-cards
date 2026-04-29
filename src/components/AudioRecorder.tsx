import { useState, useRef } from "react";

interface AudioRecorderProps {
  onAudioReady?: (audioBlob: Blob) => void;
}

export default function AudioRecorder({ onAudioReady }: AudioRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [time, setTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      chunksRef.current = [];
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        onAudioReady && onAudioReady(blob); // send blob back to parent
      };

      mediaRecorder.start();
      setRecording(true);

      // Start timer
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing mic:", err);
      alert("Microphone access denied.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      clearInterval(timerRef.current as NodeJS.Timeout | undefined);
      setTime(0);
    }
  };

  return (
    <div className="p-4 rounded-xl border w-full max-w-sm mx-auto bg-whit">
      <h2 className="font-bold mb-2">Audio Recorder</h2>

      {/* Recording timer */}
      {recording && <p className="text-red-500 mb-2">Recording… {time}s</p>}

      {/* Buttons */}
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded-full text-white w-full z-100 cursor-pointer ${
          recording ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>

      {/* Playback Preview */}
      {audioURL && (
        <div className="mt-3">
          <audio controls src={audioURL}></audio>
        </div>
      )}
    </div>
  );
}
