import { useMovieService } from "@/services/UseMovieService";
import { useMovieStore } from "@/stores/movieStore";

export const useMovie = () => {
  const { topMovies } = useMovieService();
  const { setTopMovies } = useMovieStore();

  const getTopMovies = async () => {
    const topMoviesArray = await topMovies();
    console.log(topMoviesArray, "topMovies");
    setTopMovies(topMoviesArray);
  };

  return { getTopMovies };
};
