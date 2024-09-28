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

  const getTopFiveMovies = computed(() => {
    const moviesSorted = topMovies.value.sort((a, b) => b.vote_average - a.vote_average);
    const top5Movies = moviesSorted.slice(0, 5);
    return top5Movies;
  });

  const listTop4Actors = computed(() => {
    const castingSorted = movieDetails.value?.cast.sort((a, b) => b.popularity - a.popularity);
    const top4Actors = castingSorted?.slice(0, 4);
    return top4Actors;
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
    getTopFiveMovies,
    movieDetails,
    listTop4Actors,
    setTopMovies,
    setUpComingMovies,
    setMovieFilterByName,
    setMovieDetails
  };
});
