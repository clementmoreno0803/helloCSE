import { ALL_MOVIES, API_KEY } from "@/constants/movies";
import axios from "axios";

export const useMovieService = () => {
  const allMovies = async () => {
    await axios
      .get(ALL_MOVIES, {
        params: {
          api_key: API_KEY,
        },
      })
      .then((response) => {
        return response.data.results;
        ? response.data.map((movie) => movieDtoTomovie(movie))
         : [];
      });
  };
  return {
    allMovies,
  };
};
