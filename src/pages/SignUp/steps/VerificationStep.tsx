import React, { useState, useEffect } from "react";

interface VerificationStepProps {
  email: string;
  onSubmit: (code: string) => void;
  onResend: () => void;
}

const VerificationStep: React.FC<VerificationStepProps> = ({
  email,
  onSubmit,
  onResend,
}) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputs = Array(6).fill(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleInput = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }

    // Submit if all fields are filled
    if (newCode.every((v) => v) && value) {
      handleSubmit(newCode.join(""));
    }
  };

  const handleSubmit = async (finalCode: string) => {
    setIsLoading(true);
    // Simulate API call

    try {
      const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: finalCode }),
      });
      
      const data = await response.json();
      if (response.status === 200) {
        // Successful verification
        console.log(data);

        onSubmit(finalCode);

      } else if (response.status === 400) {
        alert(data.message);
      } else {
        alert("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("Failed to connect to the server. Please try again later.");
    } finally {
      setIsLoading(false);
    }


    // setTimeout(() => {
    //   setIsLoading(false);
    //   onSubmit(finalCode);
    // }, 1000);
  };

  const handleResend = () => {
    onResend();
    setTimeLeft(30);
  };

  return (
    <>
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white text-center">
          Verify Email
        </h2>
        <p className="text-center text-gray-400 mt-2">
          Enter the verification code sent to
          <br />
          <span className="text-blue-400">{email}</span>
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex justify-center gap-2">
          {inputs.map((_, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-xl bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={code[index]}
              onChange={(e) => handleInput(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !code[index] && index > 0) {
                  const prevInput = document.getElementById(
                    `code-${index - 1}`
                  );
                  prevInput?.focus();
                }
              }}
            />
          ))}
        </div>

        <div className="text-center">
          {timeLeft > 0 ? (
            <p className="text-sm text-gray-400">Resend code in {timeLeft}s</p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Resend verification code
            </button>
          )}
        </div>

        {isLoading && (
          <div className="flex justify-center">
            <svg
              className="animate-spin h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
      </div>
    </>
  );
};

export default VerificationStep;
