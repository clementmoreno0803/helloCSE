import { topMovieInterface } from "@/models/topMovieInterface";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMovieStore = defineStore("movieStore", () => {
  const movies = ref<topMovieInterface[]>([]);

  //setter
  const setTopMovies = (newMovies: topMovieInterface[]) => {
    movies.value = newMovies;
  };
  return { movies, setTopMovies };
});
