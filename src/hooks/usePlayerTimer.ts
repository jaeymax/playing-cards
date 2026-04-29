import { useEffect, useState, useCallback } from "react";

interface UsePlayerTimerProps {
  initialTime: number;
  onTimeout: () => void;
  isActive: boolean;
}

export const usePlayerTimer = ({
  initialTime,
  onTimeout,
  isActive,
}: UsePlayerTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    if (!isActive) return;

    if (timeRemaining <= 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isActive, onTimeout]);

  const resetTimer = useCallback(() => {
    setTimeRemaining(initialTime);
  }, [initialTime]);

  return { timeRemaining, resetTimer };
};
