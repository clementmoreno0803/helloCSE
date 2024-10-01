import { movieDetail } from "@/models/movieDetailInterface";
import { topMovieInterface } from "@/models/topMovieInterface";
import { upComingMoviesInterface } from "@/models/upCommingMovieInterface";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { currentMovieInterface } from "@/models/currentMovieInterface";

export const useMovieStore = defineStore("movieStore", () => {
  const topMovies = ref<topMovieInterface[]>([]);
  const currentMovies = ref<currentMovieInterface[]>([]);
  const upComingMovies = ref<upComingMoviesInterface[]>([]);
  const movieDetails = ref<movieDetail>();
  const inputFilter = ref<string>("");
  const isLoaded = ref<boolean>(false);

  //getter

  const getFilteredMovies = computed(() => {
    return upComingMovies.value.filter((movie) => movie.title.toLowerCase().includes(inputFilter.value.toLowerCase()));
  });

  const getTopFiveMovies = computed(() => {
    const moviesSorted = topMovies.value.sort((a, b) => b.vote_average - a.vote_average);
    return moviesSorted.slice(0, 5);
  });

  const getHeightCurrentMovies = computed(() => {
    return currentMovies.value.slice(0, 8);
  });

  const listTop4Actors = computed(() => {
    const castingSorted = movieDetails.value?.cast.sort((a, b) => b.popularity - a.popularity);
    return castingSorted?.slice(0, 4);
  });

  //setter
  const setTopMovies = (newMovies: topMovieInterface[]) => {
    topMovies.value = newMovies;
  };
  const setCurrentMovies = (newCurrentMovie: currentMovieInterface[]) => {
    currentMovies.value = newCurrentMovie;
  };
  const setUpComingMovies = (newMovies: upComingMoviesInterface[]) => {
    upComingMovies.value = newMovies;
    isLoaded.value = true;
  };
  const setMovieFilterByName = (input: string) => {
    inputFilter.value = input;
  };
  const setMovieDetails = (details: movieDetail | undefined) => {
    if (details) {
      return (movieDetails.value = details);
    }
  };

  return {
    topMovies,
    upComingMovies,
    inputFilter,
    getFilteredMovies,
    getTopFiveMovies,
    getHeightCurrentMovies,
    movieDetails,
    listTop4Actors,
    isLoaded,
    setTopMovies,
    setCurrentMovies,
    setUpComingMovies,
    setMovieFilterByName,
    setMovieDetails
  };
});
