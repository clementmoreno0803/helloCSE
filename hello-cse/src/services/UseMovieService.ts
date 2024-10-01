import { ALL_MOVIES, API_KEY, DETAILS, NOM_PLAYING_MOVIES, UP_COMING_MOVIES } from "@/constants/movies";
import axios from "axios";
import { topMovieDtoToTopmovie } from "@/mappers/topMovieDtoToTopmovie";
import { topMovieDto } from "@/models/dto/topMovieDto";
import { upComingMoviesDto } from "@/models/dto/upCommingMovieDto";
import { movieDtoTomovie } from "@/mappers/movieDtoTomovie";
import { movieAndCrewDtoToMovieDetails } from "@/mappers/movieAndCrewDtoToMovieDetails";
import { CurrentMovieDto } from "@/models/dto/currentMovieDto";
import { toCurrentMovieDtoToCurrentMovie } from "@/mappers/toCurrentMovieDtoToCurrentMovie";

export const useMovieService = () => {
  const topMovies = async () => {
    try {
      const response = await axios.get(ALL_MOVIES, {
        params: {
          api_key: API_KEY
        }
      });
      return response.data.results
        ? response.data.results.map((topMovie: topMovieDto) => topMovieDtoToTopmovie(topMovie))
        : [];
    } catch (error) {
      console.log(error);
    }
  };

  const nowPlayingMovies = async () => {
    try {
      const response = await axios.get(NOM_PLAYING_MOVIES, {
        params: {
          api_key: API_KEY
        }
      });
      return response.data.results
        ? response.data.results.map((currentMovies: CurrentMovieDto) => toCurrentMovieDtoToCurrentMovie(currentMovies))
        : [];
    } catch (error) {
      console.log(error);
    }
  };

  const upComingMovies = async (pageNumber: number) => {
    try {
      const response = await axios.get(UP_COMING_MOVIES, {
        params: {
          api_key: API_KEY,
          page: pageNumber
        }
      });
      return response.data.results
        ? response.data.results.map((movie: upComingMoviesDto) => movieDtoTomovie(movie))
        : [];
    } catch (error) {
      console.log(error);
    }
  };

  const movieDetails = async (id: string) => {
    try {
      const response = await axios.get(`${DETAILS + id}`, {
        params: {
          api_key: API_KEY
        }
      });
      const crew = await axios.get(`${DETAILS + id}/credits`, {
        params: {
          api_key: API_KEY
        }
      });
      return response.data && crew.data ? movieAndCrewDtoToMovieDetails(response.data, crew.data) : undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  return {
    topMovies,
    nowPlayingMovies,
    upComingMovies,
    movieDetails
  };
};
