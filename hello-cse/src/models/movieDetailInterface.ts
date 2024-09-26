import { Cast } from "./dto/credits/castDto";
import { Crew } from "./dto/credits/crewDto";

export interface movieDetail {
  poster_path: string;
  title: string;
  overview: string;
  genres: string[];
  vote_average: string;
  vote_count: number;
  director: Crew[];
  cast: Cast[];
}
