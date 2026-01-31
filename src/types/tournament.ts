export interface Player {
  id: number | null;
  name: string | null;
  image_url: string | null;
  score: number;
  winner: boolean;
}

export interface Match {
  id: number;
  player1: Player;
  player2: Player;
  status: "pending" | "in_progress" | "completed" | "forfeited";
  game_id: number;
  game_code: string;
  winner_id: number | null;
  turn_ends_at: number;
}

export interface Round {
  round: number;
  matches: Match[];
}

export interface RoundArray {
  rounds: Round[];
}
