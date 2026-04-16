export type TournamentStatus = "all" | "upcoming" | "ongoing" | "completed";
export type TournamentDifficulty =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "pro";

export interface Tournament {
  id: number;
  name: string;
  type: string;
  status: TournamentStatus;
  start_date: string;
  registration_fee: string;
  description: string;
  prize: string;
  registered: boolean;
  registered_participants: number;
  max_participants: number;
  format: string;
  difficulty: TournamentDifficulty;
  registration_closing_date: string;
  current_round_number: number;
}

export interface TournamentMatch {
  id: number;
  player1: {
    id: number;
    name: string;
    rating: number;
    is_rated: boolean;
    image_url: string;
    score: number;
    winner: boolean;
  };
  player2: {
    id: number;
    name: string;
    rating: number;
    is_rated: boolean;
    image_url: string;
    score: number;
    winner: boolean;
  };
  game_code: string;
  turn_ends_at: number;
  game_id: number;
  status: "pending" | "in_progress" | "completed" | "forfeited";
  winner_id: number | null;
}

export interface TournamentRound {
  round: number;
  matches: TournamentMatch[];
}

export interface TournamentRule {
  id: number;
  title: string;
  content: string;
}

export interface TournamentParticipant {
  id: number;
  username: string;
  rating: number;
  is_rated: boolean;
  image_url: string;
  score: number;
  losses: number;
  status: "active" | "eliminated" | "qualified";
}

export interface TournamentLobbyData {
  success: boolean;
  tournament: Tournament;
  participants: TournamentParticipant[];
  rounds: TournamentRound[];
  rules: TournamentRule[];
  standings: {
    id: string;
    username: string;
    rating: number;
    is_rated: boolean;
    image_url: string;
    score: number;
    losses: number;
    status: "active" | "eliminated" | "qualified";
    num_wins: number;
  }[];
}
