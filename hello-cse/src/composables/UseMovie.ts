import { useMovieService } from "@/services/UseMovieService";
import { useMovieStore } from "@/stores/movieStore";

export const useMovie = () => {
  const { allMovies } = useMovieService();
  const { setTopMovies } = useMovieStore();

  const getTopMovies = async () => {
    const topMovies = await allMovies();
    setTopMovies(topMovies);
  };

  return { getTopMovies };
};
