import React, { useMemo, useState } from "react";
import {
  Copy,
  Check,
  Share2,
  ShieldCheck,
  Coins,
  Users,
  Trophy,
  Settings2,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface CashChallenge {
  id: number;
  stake: number;
  platformFee?: number;
  winnerPayout?: number;
  status:
    | "waiting"
    | "accepted"
    | "in_progress"
    | "completed"
    | "cancelled"
    | "expired";
  creatorId: number;
  opponentId?: number | null;
  winnerId?: number | null;
}

interface Game {
  id: number;
  game_code: string;

  creator_id: number;
  player_ids?: number[];

  // Your existing game configuration
  winPoints?: number;
  includeAces?: boolean;
  includeSixes?: boolean;
  isRated?: boolean;
  numPlayers?: number;

  // Cash challenge information
  challenge?: CashChallenge | null;

  // Adjust this to whatever your backend calls it
  status?: string;

  // Useful if your server sends this
  players?: Array<{
    id: number;
    username?: string;
    avatar?: string;
  }>;
}

interface PlayCashWithFriendProps {
  game?: Game;

  currentUserId?: number;

  /**
   * True when the current user created the challenge.
   */
  isHost?: boolean;

  /**
   * Called when opponent accepts the challenge.
   * Your parent/page should make the API request here.
   */
  onAcceptChallenge?: () => Promise<void> | void;

  /**
   * Called when opponent declines the challenge.
   */
  onDeclineChallenge?: () => Promise<void> | void;

  /**
   * Called when the host wants to cancel the challenge.
   */
  onCancelChallenge?: () => Promise<void> | void;

  /**
   * Render your existing actual Spar game here once
   * the challenge has been accepted and the server
   * has started the game.
   */
  children?: React.ReactNode;
}

const PlayCashWithFriend: React.FC<PlayCashWithFriendProps> = ({
  game = {
    id: 0,
    game_code: "",
    creator_id: 0,
    status: "waiting",
    challenge: {
      id: 0,
      stake: 0,
      status: "waiting",
      creatorId: 0,
    },
},
  currentUserId = 0,
  isHost = false,
  onAcceptChallenge,
  onDeclineChallenge,
  onCancelChallenge,
  children,
}) => {
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const challenge = game.challenge;

  const gameLink = `${window.location.origin}/cash-game/${game.game_code}`;

  const stake = Number(challenge?.stake || 0);
  const platformFee = Number(challenge?.platformFee || 0);

  const prize = useMemo(() => {
    if (challenge?.winnerPayout !== undefined) {
      return Number(challenge.winnerPayout);
    }

    // If your backend sends the fee separately,
    // this calculates the expected winner payout.
    return Math.max(0, stake * 2 - platformFee);
  }, [challenge?.winnerPayout, stake, platformFee]);

  const challengeStatus = challenge?.status || "waiting";

  /*
   * The actual game should only be shown after
   * the server confirms that the challenge has
   * been accepted and the game has started.
   *
   * Adjust these conditions to match your backend.
   */
  const gameHasStarted =
    challengeStatus === "in_progress" ||
    game.status === "in_progress" ||
    game.status === "started";

  const challengeIsFinished =
    challengeStatus === "completed" ||
    challengeStatus === "cancelled" ||
    challengeStatus === "expired";

  const copyGameLink = async () => {
    try {
      await navigator.clipboard.writeText(gameLink);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy game link:", error);
    }
  };

  const shareGameLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "SparPlay Cash Challenge",
          text: `You've been challenged to a Spar game for ₵${stake}.`,
          url: gameLink,
        });
      } else {
        await copyGameLink();
      }
    } catch (error) {
      // User cancelling native share shouldn't be treated as an error.
      console.log("Share cancelled");
    }
  };

  const handleAccept = async () => {
    if (!onAcceptChallenge || processing) return;

    try {
      setProcessing(true);
      await onAcceptChallenge();
    } catch (error) {
      console.error("Failed to accept challenge:", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleDecline = async () => {
    if (!onDeclineChallenge || processing) return;

    try {
      setProcessing(true);
      await onDeclineChallenge();
    } catch (error) {
      console.error("Failed to decline challenge:", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleCancel = async () => {
    if (!onCancelChallenge || processing) return;

    try {
      setProcessing(true);
      await onCancelChallenge();
      setShowCancelConfirm(false);
    } catch (error) {
      console.error("Failed to cancel challenge:", error);
    } finally {
      setProcessing(false);
    }
  };

  /*
   * --------------------------------------------------
   * ACTUAL GAME
   * --------------------------------------------------
   *
   * Once both players have accepted and the server
   * changes the state, this component simply hands
   * control to your existing game UI.
   */
  if (gameHasStarted && !challengeIsFinished) {
    return <>{children}</>;
  }

  /*
   * --------------------------------------------------
   * CANCELLED / EXPIRED / COMPLETED
   * --------------------------------------------------
   */

  if (challengeIsFinished) {
    return (
      <div className="min-h-screen bg-[#07130d] text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0d1c14] p-6 text-center shadow-2xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
            {challengeStatus === "completed" ? (
              <Trophy className="h-7 w-7 text-yellow-400" />
            ) : (
              <X className="h-7 w-7 text-red-400" />
            )}
          </div>

          <h2 className="text-xl font-bold">
            {challengeStatus === "completed"
              ? "Challenge completed"
              : challengeStatus === "expired"
                ? "Challenge expired"
                : "Challenge cancelled"}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            {challengeStatus === "completed"
              ? "This cash challenge has already been settled."
              : "This challenge is no longer available."}
          </p>
        </div>
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * HOST VIEW
   * --------------------------------------------------
   */

  if (isHost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#062e16] via-[#06451f] to-[#02190b] text-white">
        {/* Background glow */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-green-400/10 blur-[120px]" />
        </div>

        <div className="relative flex min-h-screen items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-5 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-400/10 ring-1 ring-green-300/20">
                <Coins className="h-7 w-7 text-green-400" />
              </div>

              <h1 className="text-2xl font-black tracking-tight">
                Cash Challenge
              </h1>

              <p className="mt-1 text-sm text-green-100/60">
                Your challenge is ready
              </p>
            </div>

            {/* Main card */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-2xl backdrop-blur-xl">
              {/* Stake */}
              <div className="border-b border-white/10 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-green-100/50">
                      Your stake
                    </p>

                    <p className="mt-1 text-4xl font-black">
                      ₵{stake.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-400/10">
                    <Coins className="h-7 w-7 text-green-400" />
                  </div>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      Winner receives
                    </span>

                    <span className="text-lg font-bold text-green-400">
                      ₵{prize.toFixed(2)}
                    </span>
                  </div>

                  {platformFee > 0 && (
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Platform fee
                      </span>

                      <span className="text-xs text-gray-500">
                        ₵{platformFee.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Invite */}
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="font-bold">Invite your opponent</h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Send this challenge link to the person you want to play.
                  </p>
                </div>

                {/* Link */}
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 p-2">
                  <div className="min-w-0 flex-1 px-2">
                    <p className="truncate text-sm text-gray-300">
                      {gameLink}
                    </p>
                  </div>

                  <button
                    onClick={copyGameLink}
                    className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-white/10 px-3 text-sm font-semibold transition hover:bg-white/15 active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Share */}
                <button
                  onClick={shareGameLink}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 py-3.5 text-sm font-bold text-black transition hover:bg-green-400 active:scale-[0.98]"
                >
                  <Share2 className="h-4 w-4" />
                  Share Challenge
                </button>

                {/* Waiting */}
                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-green-400/10 bg-green-400/5 p-4">
                  <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-400/10">
                    <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-green-400/50" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Waiting for opponent
                    </p>

                    <p className="text-xs text-gray-500">
                      The game starts after they accept.
                    </p>
                  </div>
                </div>

                {/* Security */}
                <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-500">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Your stake is locked until the challenge is settled.
                </div>

                {/* Cancel */}
                {onCancelChallenge && (
                  <button
                    onClick={() => setShowCancelConfirm(true)}
                    className="mt-5 w-full text-xs font-medium text-gray-500 transition hover:text-red-400"
                  >
                    Cancel challenge
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cancel confirmation */}
        {showCancelConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#101812] p-6 shadow-2xl">
              <h3 className="text-lg font-bold">Cancel challenge?</h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Your locked stake will be released if the challenge has not
                been accepted yet.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  disabled={processing}
                  className="flex-1 rounded-xl bg-white/5 py-3 text-sm font-semibold hover:bg-white/10"
                >
                  Keep it
                </button>

                <button
                  onClick={handleCancel}
                  disabled={processing}
                  className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-bold text-white hover:bg-red-400"
                >
                  {processing ? (
                    <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                  ) : (
                    "Cancel"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * OPPONENT VIEW
   * --------------------------------------------------
   */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#062e16] via-[#06451f] to-[#02190b] px-4 py-8 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center">
        <div className="w-full">
          {/* Top badge */}
          <div className="mb-5 flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-green-400">
              <Coins className="h-3.5 w-3.5" />
              Cash Challenge
            </div>
          </div>

          {/* Main challenge */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-2xl backdrop-blur-xl">
            {/* Challenger */}
            <div className="border-b border-white/10 px-6 pb-6 pt-7 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-2xl">
                ⚔️
              </div>

              <h1 className="mt-4 text-xl font-black">
                You've been challenged!
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Join the match and put your skills to the test.
              </p>
            </div>

            {/* Money */}
            <div className="p-6">
              <div className="rounded-3xl border border-green-400/20 bg-gradient-to-br from-green-500/10 to-transparent p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Entry stake
                </p>

                <p className="mt-2 text-5xl font-black tracking-tight">
                  ₵{stake.toFixed(2)}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  You'll stake ₵{stake.toFixed(2)} from your wallet
                </p>
              </div>

              {/* Prize breakdown */}
              <div className="mt-4 rounded-2xl bg-white/[0.03] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Total pot
                  </span>

                  <span className="font-bold">
                    ₵{(stake * 2).toFixed(2)}
                  </span>
                </div>

                {platformFee > 0 && (
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Platform fee
                    </span>

                    <span className="text-sm text-gray-500">
                      ₵{platformFee.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="mt-3 border-t border-white/5 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-300">
                      <Trophy className="h-4 w-4 text-yellow-400" />
                      Winner receives
                    </span>

                    <span className="text-lg font-black text-green-400">
                      ₵{prize.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Game settings */}
              <div className="mt-4">
                <div className="mb-3 flex items-center gap-2">
                  <Settings2 className="h-4 w-4 text-gray-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Game settings
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Setting
                    label="Win points"
                    value={String(game.winPoints ?? 10)}
                  />

                  <Setting
                    label="Players"
                    value="2 Players"
                  />

                  <Setting
                    label="Aces"
                    value={game.includeAces ? "Included" : "Excluded"}
                  />

                  <Setting
                    label="Sixes"
                    value={game.includeSixes ? "Included" : "Excluded"}
                  />

                  <Setting
                    label="Rated"
                    value={game.isRated ? "Yes" : "No"}
                  />

                  <Setting
                    label="Mode"
                    value="Cash Match"
                  />
                </div>
              </div>

              {/* Warning */}
              <div className="mt-5 flex gap-3 rounded-2xl border border-yellow-400/10 bg-yellow-400/5 p-4">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />

                <p className="text-xs leading-5 text-gray-400">
                  By accepting, <strong className="text-gray-300">₵{stake.toFixed(2)}</strong>{" "}
                  will be locked from your wallet. The winner receives{" "}
                  <strong className="text-green-400">
                    ₵{prize.toFixed(2)}
                  </strong>{" "}
                  after the match.
                </p>
              </div>

              {/* Accept */}
              <button
                onClick={handleAccept}
                disabled={processing || challengeStatus !== "waiting"}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 py-4 text-sm font-black text-black shadow-lg shadow-green-500/10 transition hover:bg-green-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Accepting challenge...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5" />
                    Accept Challenge
                  </>
                )}
              </button>

              {/* Decline */}
              {onDeclineChallenge && (
                <button
                  onClick={handleDecline}
                  disabled={processing}
                  className="mt-3 w-full py-2 text-xs font-semibold text-gray-500 transition hover:text-red-400 disabled:opacity-50"
                >
                  Decline challenge
                </button>
              )}
            </div>
          </div>

          {/* Security footer */}
          <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-gray-600">
            <ShieldCheck className="h-3.5 w-3.5" />
            Funds are protected until the match is settled.
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Small reusable game-setting item.
 */
const Setting: React.FC<{
  label: string;
  value: string;
}> = ({ label, value }) => {
  return (
    <div className="rounded-xl bg-white/[0.03] px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-wider text-gray-600">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-semibold text-gray-300">
        {value}
      </p>
    </div>
  );
};

export default PlayCashWithFriend;
