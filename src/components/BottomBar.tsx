import React, { useRef, useState } from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  ArrowRightOnRectangleIcon,
  MicrophoneIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { useAppContext } from "@/contexts/AppContext";

interface BottomBarProps {
  unreadCount: number;
  showChat: boolean;
  onToggleChat: () => void;
  onLeaveRoom: () => void;
  onRecord?: () => void;
  socket?: any;
  gameCode?: string;
  isLoading?: boolean;
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}

const BottomBar: React.FC<BottomBarProps> = ({
  unreadCount,
  showChat,
  onToggleChat,
  onLeaveRoom,
  socket,
  gameCode,
  isLoading = false,
  setMessages,
}) => {
  const constraints = {
    audio: {
      sampleRate: 48000,
      channelCount: 1,
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false,
    },
  };

  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([])

  const { user } = useAppContext();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [time, setTime] = useState(0);
  const [audioSent, setAudioSent] = useState(false);

  const toggleRecording = async () => {
    if (!recording) {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        // const mimeType = MediaRecorder.isTypeSupported(
        //   "audio/mp4;codecs=mp4a.40.2"
        // )
        //   ? "audio/mp4;codecs=mp4a.40.2"
        //   : "audio/webm;codecs=opus";
        const mimeType = "audio/mp4";

        const mediaRecorder = new MediaRecorder(stream, { mimeType });
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(chunksRef.current, { type: mimeType });
          //if (onVoiceMessage) onVoiceMessage(audioBlob);
          // play the audio for testing

          const arrayBuffer = await audioBlob.arrayBuffer();

          const messageData = {
            user_id: user?.id,
            username: user?.username,
            avatar: user?.image_url,
            type: "audio",
            game_code: gameCode,
            audio: arrayBuffer,
            mime_type: audioBlob.type,
            timestamp: new Date().toISOString(),
          };
          socket?.emit("voiceMessage", messageData);

          setMessages((prev: any) => [...prev, messageData]);

          // Show sent indicator
          setAudioSent(true);
          setTimeout(() => setAudioSent(false), 2000);

          // const audioURL = URL.createObjectURL(audioBlob);
          // console.log("audioBlob:", audioBlob);
          // console.log("Audio URL:", audioURL);
          // setAudioURL(audioURL);
          // const audio = new Audio(audioURL);
          // audio.play();
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
    } else {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setRecording(false);
      clearInterval(timerRef.current as ReturnType<typeof setInterval> | undefined);
      setTime(0);
    }
  };

  return (
    <div className="fixe bottom-0 left-0 right-0 z-[99999] px-6 py-1 pborder">
      <div className="mx-auto max-w-xl bg-gray-900/40 backdrop-blur- border border-gray-700/40 rounded-full shadow-2xl flex items-center justify-around py-1 md:py-2 px-4">
        {/* --- Chat Icon --- */}
        <button
          onClick={onToggleChat}
          className="relative flex flex-col items-center justify-center gap-1"
        >
          <div className="relative">
            <ChatBubbleLeftEllipsisIcon className="h-7 w-7 hover:text-gray-500 text-white opacity-90 hover:opacity-100 transition" />
            {/* Unread Bubble */}
            {unreadCount > 0 && !showChat && (
              <span className="absolute -top-1 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-puls">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-300">
            {showChat ? "Chat" : "Chat"}
          </span>
        </button>

        {/* --- Microphone Icon --- */}
        <button
          onClick={toggleRecording}
          className="flex flex-col items-center justify-center gap-1"
        >
          <div className="relative h-7 w-7">
            <MicrophoneIcon
              className={`h-7 w-7 transition hover:text-blu-500 ${
                recording
                  ? "text-blue-500 animate-pulse"
                  : audioSent
                  ? "text-green-500"
                  : "text-white opacity-90 hover:opacity-100"
              }`}
            />
            {audioSent && (
              <CheckIcon className="absolute -bottom-1 -right-1 h-4 w-4 text-green-500 bg-gray-900 rounded-full" />
            )}
          </div>
          <span className="text-xs text-gray-300">
            {recording ? `Recording ${time}s` : audioSent ? "Sent!" : "Mic"}
          </span>
        </button>

        {/* --- Leave Room Icon --- */}
        <button
          onClick={onLeaveRoom}
          disabled={isLoading}
          className="flex flex-col items-center justify-center gap-1 disabled:opacity-40"
        >
          <ArrowRightOnRectangleIcon className="h-7 w-7 hover:text-gray-500 opacity-90 hover:opacity-100 transition" />
          <span className="text-xs text-gray-300">
            {isLoading ? "Leaving..." : "Leave"}
          </span>
        </button>
      </div>
      {/* {audioURL && (
        <div className="mt-3">
          <audio controls src={audioURL}></audio>
        </div>
      )} */}
    </div>
  );
};

export default BottomBar;
