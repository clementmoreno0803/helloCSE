import { topMovieDto } from "../dto/topMovieDto";
import { topMovieInterface } from "../topMovieInterface";

export const movieDtoTomovie = (movieDto: topMovieDto): topMovieInterface => {
  return {
    backdrop_path: movieDto.backdrop_path,
    genre_ids: movieDto.genre_ids,
    id: movieDto.id,
    overview: movieDto.overview,
    poster_path: movieDto.poster_path,
    release_date: movieDto.release_date,
    title: movieDto.title,
    vote_average: movieDto.vote_average,
  };
};
