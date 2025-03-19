export interface Friend {
  id: string;
  username: string;
  status: "online" | "offline";
  avatar: string;
  lastSeen: string;
  rank: string;
  matchesPlayed: number;
  currentActivity?: string;
}

export interface FriendRequest {
  id: string;
  username: string;
  avatar: string;
  mutualFriends: number;
  rank: string;
  timeSent: string;
}
