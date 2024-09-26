import { movieDetail } from "@/models/movieDetailInterface";
import { topMovieInterface } from "@/models/topMovieInterface";
import { upComingMoviesInterface } from "@/models/upCommingMovieInterface";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useMovieStore = defineStore("movieStore", () => {
  const topMovies = ref<topMovieInterface[]>([]);
  const upComingMovies = ref<upComingMoviesInterface[]>([]);
  const movieDetails = ref<movieDetail>();
  const inputFilter = ref<string>("");

  //getter

  const getFilteredMovies = computed(() => {
    return upComingMovies.value.filter((movie) => movie.title.toLowerCase().includes(inputFilter.value.toLowerCase()));
  });

  //setter
  const setTopMovies = (newMovies: topMovieInterface[]) => {
    topMovies.value = newMovies;
  };
  const setUpComingMovies = (newMovies: upComingMoviesInterface[]) => {
    upComingMovies.value = newMovies;
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
    movieDetails,
    setTopMovies,
    setUpComingMovies,
    setMovieFilterByName,
    setMovieDetails
  };
});
