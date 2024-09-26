import { CreditsDto } from "@/models/dto/credits/creditsDto";
import { movieDetailsDto } from "@/models/dto/movieDetailsDto";
import { movieDetail } from "@/models/movieDetailInterface";

export const movieAndCrewDtoToMovieDetails = (movieDto: movieDetailsDto, crewDto: CreditsDto): movieDetail => {
  return {
    poster_path: `https://image.tmdb.org/t/p/w300/${movieDto.poster_path}`,
    title: movieDto.title,
    overview: movieDto.overview,
    genres: movieDto.genres.map((genre) => genre.name),
    vote_average: `${Math.round(movieDto.vote_average * 10)}%`,
    vote_count: movieDto.vote_count,
    director: crewDto.crew.filter((person) => person.job === "Director"),
    cast: crewDto.cast.map((actor) => actor)
  };
};
