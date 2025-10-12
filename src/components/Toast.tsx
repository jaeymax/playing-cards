import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const baseClasses =
    "fixed top-4 right-4 p-4 rounded-lg shadow-lg transform transition-all duration-300";
  const slideClasses = isVisible
    ? "translate-x-0 opacity-100"
    : "translate-x-full opacity-0";
  const typeClasses =
    type === "success" ? "bg-blue-500 text-white" : "bg-red-500 text-white";

  return (
    <div className={`${baseClasses} ${slideClasses} ${typeClasses}`}>
      {message}
    </div>
  );
};

export default Toast;
