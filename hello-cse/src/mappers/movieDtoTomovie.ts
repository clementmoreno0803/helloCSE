import { upComingMoviesDto } from "@/models/dto/upCommingMovieDto";
import { upComingMoviesInterface } from "@/models/upCommingMovieInterface";

export const movieDtoTomovie = (movieDto: upComingMoviesDto): upComingMoviesInterface => {
  return {
    poster_path: `https://image.tmdb.org/t/p/w300/${movieDto.poster_path}`,
    id: movieDto.id,
    overview: movieDto.overview,
    release_date: movieDto.release_date,
    title: movieDto.title,
    vote_average: Math.round(movieDto.vote_average * 10) / 10
  };
};
