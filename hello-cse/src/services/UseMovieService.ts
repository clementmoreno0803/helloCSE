import { ALL_MOVIES, API_KEY, DETAILS, UP_COMING_MOVIES } from "@/constants/movies";
import axios from "axios";
import { topMovieDtoToTopmovie } from "@/mappers/topMovieDtoToTopmovie";
import { topMovieDto } from "@/models/dto/topMovieDto";
import { upComingMoviesDto } from "@/models/dto/upCommingMovieDto";
import { movieDtoTomovie } from "@/mappers/movieDtoTomovie";
import { movieAndCrewDtoToMovieDetails } from "@/mappers/movieAndCrewDtoToMovieDetails";
import { CreditsDto } from "@/models/dto/credits/creditsDto";
import { movieDetailsDto } from "@/models/dto/movieDetailsDto";

export const useMovieService = () => {
  const topMovies = async () => {
    const response = await axios.get(ALL_MOVIES, {
      params: {
        api_key: API_KEY
      }
    });
    return response.data.results
      ? response.data.results.map((topMovie: topMovieDto) => topMovieDtoToTopmovie(topMovie))
      : [];
  };

  const upComingMovies = async (pageNumber: number) => {
    const response = await axios.get(UP_COMING_MOVIES, {
      params: {
        api_key: API_KEY,
        page: pageNumber
      }
    });
    return response.data.results ? response.data.results.map((movie: upComingMoviesDto) => movieDtoTomovie(movie)) : [];
  };

  const movieDetails = async (id: string) => {
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
    return response.data ? movieAndCrewDtoToMovieDetails(response.data, crew.data) : [];
  };

  return {
    topMovies,
    upComingMovies,
    movieDetails
  };
};
