export type TournamentStatus = "all" | "upcoming" | "ongoing" | "completed";
export type TournamentDifficulty =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "pro";

export interface Tournament {
  id: string;
  title: string;
  type: string;
  status: TournamentStatus;
  startDate: string;
  entryFee: string;
  prizePool: string;
  registeredPlayers: number;
  maxPlayers: number;
  format: string;
  difficulty: TournamentDifficulty;
}
