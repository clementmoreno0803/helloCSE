import { CurrentMovieDto } from "@/models/dto/currentMovieDto";
import { currentMovieInterface } from "@/models/currentMovieInterface";

export const toCurrentMovieDtoToCurrentMovie = (currentMovies: CurrentMovieDto): currentMovieInterface => {
  return {
    backdrop_path: `https://image.tmdb.org/t/p/w300/${currentMovies.backdrop_path}`,
    genre_ids: currentMovies.genre_ids,
    id: currentMovies.id,
    overview: currentMovies.overview,
    poster_path: `https://image.tmdb.org/t/p/w300/${currentMovies.poster_path}`,
    release_date: currentMovies.release_date,
    title: currentMovies.title,
    vote_average: Math.round(currentMovies.vote_average * 10)
  };
};
