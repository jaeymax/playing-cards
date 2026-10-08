import { baseUrl } from "@/config/api";
import { useSocket } from "@/contexts/SocketProvider";
import { PlayerStatus } from "@/pages/Home/components/OnlinePlayers";
import { authHeaders } from "@/utils/Functions";
import { useCallback, useEffect, useState } from "react";

export type OnlinePlayer = {
  id: number;
  username: string;
  image_url?: string | null;
  rating: number;
  online_status: boolean;
  status: PlayerStatus;
  rank:string;
  rank_color:string;
};

type PresenceResponse = {
  success: boolean;
  players: OnlinePlayer[];
  count: number;
};

type OnlineEvent = {
  userId: number | string;
  username?: string;
};

type OfflineEvent = {
  userId: number | string;
};

type StatusEvent = {
  userId: number | string;
  status: PlayerStatus;
};

export function useOnlinePlayers() {
  const {socket} = useSocket();


  const [players, setPlayers] = useState<OnlinePlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOnlinePlayers = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError(null);

        const response = await fetch(`${baseUrl}/presence/online-users`,{
          headers: {
            "Content-Type": "application/json",
            ...await authHeaders(),
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch online players");
        }

        const data: PresenceResponse = await response.json();

        if (!data.success) {
          throw new Error("Failed to fetch online players");
        }

        setPlayers(data.players);
      } catch (error) {
        console.error("Error fetching online players:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch online players"
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchOnlinePlayers();
  }, [fetchOnlinePlayers]);

  useEffect(() => {
    if (!socket) return;

    const handleOnline = ({ userId }: OnlineEvent) => {
      const id = Number(userId);

      /*
       * We only receive the user ID from the presence event.
       * Refresh the snapshot so we get the user's full profile.
       */
      setPlayers((currentPlayers) => {
        const alreadyExists = currentPlayers.some(
          (player) => player.id === id
        );

        if (alreadyExists) {
          return currentPlayers;
        }

        /*
         * Don't add an incomplete player object.
         * Fetching the snapshot gives us username, image, rating, etc.
         */
        return currentPlayers;
      });

      fetchOnlinePlayers(true);
    };

    const handleOffline = ({ userId }: OfflineEvent) => {
      const id = Number(userId);

      setPlayers((currentPlayers) =>
        currentPlayers.filter((player) => player.id !== id)
      );
    };

    const handleStatus = ({ userId, status }: StatusEvent) => {
      const id = Number(userId);

      setPlayers((currentPlayers) =>
        currentPlayers.map((player) =>
          player.id === id
            ? {
                ...player,
                status,
              }
            : player
        )
      );
    };

    socket.on("presence:online", handleOnline);
    socket.on("presence:offline", handleOffline);
    socket.on("presence:status", handleStatus);

    return () => {
      socket.off("presence:online", handleOnline);
      socket.off("presence:offline", handleOffline);
      socket.off("presence:status", handleStatus);
    };
  }, [socket, fetchOnlinePlayers]);

  const refresh = useCallback(() => {
    fetchOnlinePlayers(true);
  }, [fetchOnlinePlayers]);

  return {
    players,
    count: players.length,
    loading,
    refreshing,
    error,
    refresh,
  };
}