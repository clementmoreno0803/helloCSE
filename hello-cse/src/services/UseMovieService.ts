import { ALL_MOVIES, API_KEY } from "@/constants/movies";
import axios from "axios";
import { movieDtoTomovie } from "@/models/mappers/movieDtoToMovie";
import { topMovieDto } from "@/models/dto/topMovieDto";

export const useMovieService = () => {
  const topMovies = async () => {
    const response = await axios.get(ALL_MOVIES, {
      params: {
        api_key: API_KEY
      }
    });
    return response.data.results ? response.data.results.map((movie: topMovieDto) => movieDtoTomovie(movie)) : [];
  };
  return {
    topMovies
  };
};
