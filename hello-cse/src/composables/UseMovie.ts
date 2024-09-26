import { useMovieService } from "@/services/UseMovieService";
import { useMovieStore } from "@/stores/movieStore";

export const useMovie = () => {
  const { topMovies, upComingMovies } = useMovieService();
  const { setTopMovies, setUpComingMovies, setMovieFilterByName } = useMovieStore();

  const getTopMovies = async () => {
    const topMoviesArray = await topMovies();
    setTopMovies(topMoviesArray);
  };

  const getUpCommingMovies = async (pageNumber: number) => {
    const upComingMoviesArray = await upComingMovies(pageNumber);
    setUpComingMovies(upComingMoviesArray);
  };

  const setSearchFilters = (input: string) => {
    console.log(input, "composable");
    setMovieFilterByName(input);
  };

  // const getSearchInputFilter = () => {
  //   return useMovieStore().inputFilter;
  // };

  return { getTopMovies, getUpCommingMovies, setSearchFilters };
};
