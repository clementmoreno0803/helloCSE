import { topMovieDto } from "../models/dto/topMovieDto";
import { topMovieInterface } from "../models/topMovieInterface";

export const topMovieDtoToTopmovie = (movieDto: topMovieDto): topMovieInterface => {
  return {
    backdrop_path: `https://image.tmdb.org/t/p/w300/${movieDto.backdrop_path}`,
    genre_ids: movieDto.genre_ids,
    id: movieDto.id,
    overview: movieDto.overview,
    poster_path: `https://image.tmdb.org/t/p/w300/${movieDto.poster_path}`,
    release_date: movieDto.release_date,
    title: movieDto.title,
    vote_average: `${Math.round(movieDto.vote_average * 10)}%`
  };
};
