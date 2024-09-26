import { movieDetail } from "@/models/movieDetailInterface";
import { useMovieService } from "@/services/UseMovieService";
import { useMovieStore } from "@/stores/movieStore";

export const useMovie = () => {
  const { topMovies, upComingMovies, movieDetails } = useMovieService();
  const { setTopMovies, setUpComingMovies, setMovieFilterByName, setMovieDetails } = useMovieStore();

  const getTopMovies = async () => {
    const topMoviesArray = await topMovies();
    setTopMovies(topMoviesArray);
  };

  const getUpCommingMovies = async (pageNumber: number) => {
    const upComingMoviesArray = await upComingMovies(pageNumber);
    setUpComingMovies(upComingMoviesArray);
  };

  const setSearchFilters = (input: string) => {
    setMovieFilterByName(input);
  };

  const getMovieDetail = async (id: string) => {
    const details = await movieDetails(id);
    setMovieDetails(details);
  };

  return { getTopMovies, getUpCommingMovies, getMovieDetail, setSearchFilters };
};
