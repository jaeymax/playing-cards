import React, { useState } from "react";
import { baseUrl } from "@/config/api";
import { authHeaders } from "@/utils/Functions";

interface CreateChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

const CreateChallengeModal: React.FC<
  CreateChallengeModalProps
> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const [challengeType, setChallengeType] =
    useState<"friendly" | "stake">("friendly");

  const [stake, setStake] = useState("5");

  const [winPoints, setWinPoints] =
    useState("20");

  const [includeSixes, setIncludeSixes] =
    useState(true);

  const [includeAces, setIncludeAces] =
    useState(false);

  const [expiresIn, setExpiresIn] =
    useState("30");

  const [isCreating, setIsCreating] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  if (!isOpen) return null;

  const handleCreateChallenge = async () => {
    setError(null);

    console.log('challenge type', challengeType)

    if (
      challengeType === "stake" &&
      (!stake || Number(stake) <= 0)
    ) {
      setError(
        "Please enter a valid stake amount."
      );
      return;
    }

    setIsCreating(true);

    try {
      const response = await fetch(
        `${baseUrl}/challenges`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(await authHeaders()),
          },
          body: JSON.stringify({
            match_type: challengeType,
            challenge_mode: 'open',
            stake:
              challengeType === "stake"
                ? Number(stake)
                : 0,

            winPoints: Number(winPoints),
            numPlayers:2,
            includeSixes,

            includeAces,

            expiresInMinutes:
              Number(expiresIn),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to create challenge."
        );
      }

      /*
       * Refresh the Open Challenges
       * component on the homepage.
       */
      onCreated?.();

      onClose();

    } catch (err: any) {
      console.error(
        "Error creating challenge:",
        err
      );

      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70
        px-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          w-full
          max-w-md
          overflow-hidden
          rounded-2xl
          border border-gray-700
          bg-gray-900
          shadow-2xl
        "
      >

        {/* HEADER */}

        <div className="border-b border-gray-800 px-5 py-5">

          <div className="flex items-start justify-between gap-4">

            <div>
              <h2 className="text-lg font-black text-white">
                Create a Challenge
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Put your challenge out there
                and let another player join.
              </p>
            </div>

            <button
              onClick={onClose}
              className="
                flex h-8 w-8 shrink-0
                items-center justify-center
                rounded-lg
                text-gray-500
                transition
                hover:bg-gray-800
                hover:text-gray-300
              "
            >
              ✕
            </button>

          </div>

        </div>


        {/* BODY */}

        <div className="space-y-5 px-5 py-5">

          {/* CHALLENGE TYPE */}

          <div>

            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Challenge Type
            </label>

            <div className="grid grid-cols-2 gap-2">

              {/* FRIENDLY */}

              <button
                type="button"
                onClick={() =>
                  setChallengeType(
                    "friendly"
                  )
                }
                className={`
                  rounded-xl
                  border
                  px-3
                  py-3
                  text-left
                  transition
                  ${
                    challengeType ===
                    "friendly"
                      ? "border-blue-500/30 bg-blue-500/10"
                      : "border-gray-700 bg-gray-800 hover:border-gray-600"
                  }
                `}
              >

                <div className="flex items-center gap-2">

                  <span className="text-lg">
                    🎴
                  </span>

                  <div>
                    <p
                      className={`text-xs font-bold ${
                        challengeType ===
                        "friendly"
                          ? "text-blue-400"
                          : "text-gray-300"
                      }`}
                    >
                      Friendly
                    </p>

                    <p className="mt-0.5 text-[9px] text-gray-600">
                      Play for fun
                    </p>
                  </div>

                </div>

              </button>


              {/* STAKE */}

              <button
                type="button"
                onClick={() =>
                  setChallengeType(
                    "stake"
                  )
                }
                className={`
                  rounded-xl
                  border
                  px-3
                  py-3
                  text-left
                  transition
                  ${
                    challengeType ===
                    "stake"
                      ? "border-emerald-500/30 bg-emerald-500/10"
                      : "border-gray-700 bg-gray-800 hover:border-gray-600"
                  }
                `}
              >

                <div className="flex items-center gap-2">

                  <span className="text-lg">
                    💰
                  </span>

                  <div>
                    <p
                      className={`text-xs font-bold ${
                        challengeType ===
                        "stake"
                          ? "text-emerald-400"
                          : "text-gray-300"
                      }`}
                    >
                      Cash Challenge
                    </p>

                    <p className="mt-0.5 text-[9px] text-gray-600">
                      Play for a cash
                    </p>
                  </div>

                </div>

              </button>

            </div>

          </div>


          {/* STAKE */}

          {challengeType ===
            "stake" && (
            <div>

              <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Your Stake
              </label>

              <div className="relative">

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-emerald-400">
                  ₵
                </span>

                <input
                  type="number"
                  min="1"
                  step="0.50"
                  value={stake}
                  onChange={(e) =>
                    setStake(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border border-gray-700
                    bg-gray-800
                    py-3
                    pl-8
                    pr-3
                    text-sm
                    font-bold
                    text-white
                    outline-none
                    transition
                    focus:border-emerald-500/40
                    focus:ring-1
                    focus:ring-emerald-500/20
                  "
                />

              </div>

              <p className="mt-1.5 text-[10px] text-gray-600">
                The opponent will need to
                match this stake.
              </p>

            </div>
          )}


          {/* WIN POINTS */}

          <div>

            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Win Points
            </label>

            <div className="grid grid-cols-3 gap-2">

              {["10", "20", "30"].map(
                (points) => (
                  <button
                    key={points}
                    type="button"
                    onClick={() =>
                      setWinPoints(
                        points
                      )
                    }
                    className={`
                      rounded-xl
                      border
                      py-2.5
                      text-xs
                      font-bold
                      transition
                      ${
                        winPoints ===
                        points
                          ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                          : "border-gray-700 bg-gray-800 text-gray-500 hover:text-gray-300"
                      }
                    `}
                  >
                    {points} points
                  </button>
                )
              )}

            </div>

          </div>


          {/* GAME SETTINGS */}

          <div>

            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Game Settings
            </label>

            <div className="space-y-2">

              {/* SIXES */}

              <button
                type="button"
                onClick={() =>
                  setIncludeSixes(
                    !includeSixes
                  )
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-gray-700
                  bg-gray-800
                  px-3
                  py-3
                "
              >

                <span className="text-xs text-gray-400">
                  Include Sixes
                </span>

                <span
                  className={`
                    h-5
                    w-9
                    rounded-full
                    p-0.5
                    transition
                    ${
                      includeSixes
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    }
                  `}
                >
                  <span
                    className={`
                      block
                      h-4
                      w-4
                      rounded-full
                      bg-white
                      transition
                      ${
                        includeSixes
                          ? "translate-x-4"
                          : "translate-x-0"
                      }
                    `}
                  />
                </span>

              </button>


              {/* ACES */}

              <button
                type="button"
                onClick={() =>
                  setIncludeAces(
                    !includeAces
                  )
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-gray-700
                  bg-gray-800
                  px-3
                  py-3
                "
              >

                <span className="text-xs text-gray-400">
                  Include Aces
                </span>

                <span
                  className={`
                    h-5
                    w-9
                    rounded-full
                    p-0.5
                    transition
                    ${
                      includeAces
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    }
                  `}
                >
                  <span
                    className={`
                      block
                      h-4
                      w-4
                      rounded-full
                      bg-white
                      transition
                      ${
                        includeAces
                          ? "translate-x-4"
                          : "translate-x-0"
                      }
                    `}
                  />
                </span>

              </button>

            </div>

          </div>


          {/* EXPIRATION */}

          <div>

            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Challenge stays open for
            </label>

            <select
              value={expiresIn}
              onChange={(e) =>
                setExpiresIn(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-xl
                border border-gray-700
                bg-gray-800
                px-3
                py-3
                text-xs
                font-semibold
                text-gray-300
                outline-none
                focus:border-blue-500/40
              "
            >
              <option value="10">
                10 minutes
              </option>

              <option value="30">
                30 minutes
              </option>

              <option value="60">
                1 hour
              </option>

              <option value="180">
                3 hours
              </option>

              <option value="1440">
                24 hours
              </option>
            </select>

          </div>


          {/* ERROR */}

          {error && (
            <div className="
              rounded-xl
              border border-red-500/10
              bg-red-500/5
              px-3
              py-2.5
              text-xs
              text-red-400
            ">
              {error}
            </div>
          )}

        </div>


        {/* FOOTER */}

        <div className="border-t border-gray-800 px-5 py-4">

          <div className="flex gap-2">

            <button
              type="button"
              onClick={onClose}
              disabled={isCreating}
              className="
                flex-1
                rounded-xl
                border border-gray-700
                bg-gray-800
                py-3
                text-xs
                font-bold
                text-gray-400
                transition
                hover:bg-gray-700
                hover:text-gray-300
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={
                handleCreateChallenge
              }
              disabled={isCreating}
              className={`
                flex-1
                rounded-xl
                py-3
                text-xs
                font-bold
                text-white
                transition
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50
                ${
                  challengeType ===
                  "stake"
                    ? "bg-emerald-600 hover:bg-emerald-500"
                    : "bg-blue-600 hover:bg-blue-500"
                }
              `}
            >
              {isCreating
                ? "Creating..."
                : challengeType ===
                  "stake"
                ? "Create Cash Challenge"
                : "Create Challenge"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CreateChallengeModal;