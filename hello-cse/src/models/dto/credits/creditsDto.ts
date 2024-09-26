import { Cast } from "./castDto";
import { Crew } from "./crewDto";

export interface CreditsDto {
  cast: Cast[];
  crew: Crew[];
}
