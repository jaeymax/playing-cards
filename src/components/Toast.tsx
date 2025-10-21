import React from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90% max-w-md">
      <div className="animate-toast-fade bg-gray-800 border border-gray-700 text-gray-100 px-4 sm:px-6 py-3 rounded-full shadow-xl flex items-center gap-3 whitespace-nowrap">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 sm:h-5 sm:w-5 flex-shrink-0 text-blue-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm sm:text-base">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
