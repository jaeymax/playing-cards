import React, { useState } from "react";
import { baseUrl } from "@/config/api";
import { useAppContext } from "@/contexts/AppContext";
import { authHeaders, customLog } from "@/utils/Functions";

interface PhoneNumberRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhoneNumberAdded?: () => void;
}

const PhoneNumberRequiredModal: React.FC<PhoneNumberRequiredModalProps> = ({
  isOpen,
  onClose,
  onPhoneNumberAdded,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPhoneNumber, setConfirmPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useAppContext();

  const phoneRegex = /^0\d{9}$/;


  const shouldShowPhoneError = (phone: string) => {
    if (phone.length === 0) return false;
    if (phone.length < 10) return false;
    if (phone.length === 10 && phone[0] !== "0") return true;
    return !phoneRegex.test(phone);
  };

  const shouldShowLengthError = (phone: string) => {
    return phone.length > 0 && phone.length !== 10;
  };

  const shouldShowFirstDigitError = (phone: string) => {
    return phone.length === 10 && phone[0] !== "0";
  };

  const handlePhoneInput = (value: string) => {
    const numericOnly = value.replace(/\D/g, "");
    setPhoneNumber(numericOnly);
    setError("");
  };

  const handleConfirmPhoneInput = (value: string) => {
    const numericOnly = value.replace(/\D/g, "");
    setConfirmPhoneNumber(numericOnly);
    setError("");
  };

  const isFormValid = () => {
    return (
      phoneNumber.length === 10 &&
      !shouldShowPhoneError(phoneNumber) &&
      confirmPhoneNumber === phoneNumber &&
      !isLoading
    );
  };

  const validatePhoneNumber = () => {
    if (!phoneNumber.trim()) {
      setError("Phone number is required");
      return false;
    }

    if (!phoneRegex.test(phoneNumber)) {
      setError(
        "Please enter a valid phone number: 0245674454 (10 digits starting with 0)"
      );
      return false;
    }

    if (phoneNumber !== confirmPhoneNumber) {
      setError("Phone numbers do not match");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhoneNumber()) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/users/${user?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      const responseData = await response.json();

      if (response.ok) {
        customLog("Phone number added successfully");
        setPhoneNumber("");
        setConfirmPhoneNumber("");
        setError("");
        setIsSuccess(true);
        if (user) {
          user.phone = responseData.phone;
        }
      } else {
        setError("Failed to add phone number. Please try again.");
      }
    } catch (err) {
      console.error("Error adding phone number:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setIsSuccess(false);
    onPhoneNumberAdded?.();
    onClose();
  };

  if (!isOpen) return null;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 sm:p-8">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-green-500 rounded-full p-3">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Phone Number Added Successfully
            </h2>
            <p className="text-gray-300 text-sm mb-2">
              Your phone number has been verified and saved to your account.
            </p>
            <p className="text-gray-400 text-xs mb-6">
              You can update your phone number anytime by visiting your profile
              settings if needed.
            </p>
            <button
              onClick={handleSuccessClose}
              className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-medium rounded-lg transition"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Phone Number Required
        </h2>
        <p className="text-gray-300 text-sm mb-6">
          Please provide your phone number to proceed with tournament
          registration. Your phone number will be used exclusively for:
        </p>

        <ul className="bg-gray-700 rounded-lg p-4 mb-6 text-gray-300 text-sm space-y-2">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Sending tournament notifications and updates</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Disbursing cash prizes via Mobile Money</span>
          </li>
        </ul>

        <div className="bg-blue-500 bg-opacity-20 border border-blue-500 rounded-lg p-3 mb-6">
          <p className="text-blue-300 text-xs">
            ℹ️ This is a one-time requirement. You won't need to provide this
            information again.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="0245674454"
              value={phoneNumber}
              onChange={(e) => handlePhoneInput(e.target.value)}
              className={`w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-1 transition ${
                shouldShowPhoneError(phoneNumber)
                  ? "border-2 border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border border-gray-600 focus:border-blue-500 focus:ring-blue-500"
              }`}
              maxLength={10}
            />
            <p className="text-gray-400 text-xs mt-1">
              Format: 0XXXXXXXXX (10 digits)
            </p>
            {shouldShowLengthError(phoneNumber) && (
              <p className="text-red-400 text-xs mt-1">
                ✗ Phone number must be exactly 10 characters.
              </p>
            )}
            {shouldShowFirstDigitError(phoneNumber) && (
              <p className="text-red-400 text-xs mt-1">
                ✗ First digit must be zero (0).
              </p>
            )}
            {shouldShowPhoneError(phoneNumber) && (
              <p className="text-red-400 text-xs mt-1">
                ✗ Invalid format. Enter a valid phone number.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Phone Number
            </label>
            <input
              type="text"
              placeholder="0245674454"
              value={confirmPhoneNumber}
              onChange={(e) => handleConfirmPhoneInput(e.target.value)}
              className={`w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-1 transition ${
                confirmPhoneNumber && confirmPhoneNumber !== phoneNumber
                  ? "border-2 border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border border-gray-600 focus:border-blue-500 focus:ring-blue-500"
              }`}
              maxLength={10}
            />
            {confirmPhoneNumber && confirmPhoneNumber !== phoneNumber && (
              <p className="text-red-400 text-xs mt-1">
                ✗ Phone numbers do not match.
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid()}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Adding..." : "Add Phone Number"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhoneNumberRequiredModal;
