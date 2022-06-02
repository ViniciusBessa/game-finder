export interface Game {
  id: number;
  name: string;
  summary: string;
  rating?: number;
  release_dates?: { id: number; date?: number }[];
  genres?: { id: number; name: string }[];
  platforms?: { id: number; name: string }[];
  cover?: { id: number; image_id?: string };
  screenshots?: { id: number; image_id?: string }[];
  similar_games?: Game[];
}
