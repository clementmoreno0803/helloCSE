import { topMovieInterface } from "@/models/topMovieInterface";
import { upComingMoviesInterface } from "@/models/upCommingMovieInterface";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMovieStore = defineStore("movieStore", () => {
  const topMovies = ref<topMovieInterface[]>([]);
  const upComingMovies = ref<upComingMoviesInterface[]>([]);

  //setter
  const setTopMovies = (newMovies: topMovieInterface[]) => {
    topMovies.value = newMovies;
  };
  const setUpComingMovies = (newMovies: upComingMoviesInterface[]) => {
    upComingMovies.value = newMovies;
  };
  return { topMovies, upComingMovies, setTopMovies, setUpComingMovies };
});
