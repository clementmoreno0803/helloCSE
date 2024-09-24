import { topMovieInterface } from "@/models/topMovieInterface";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMovieStore = defineStore("movieStore", () => {
  const topMovies = ref<topMovieInterface[]>([]);

  //setter
  const setTopMovies = (newMovies: topMovieInterface[]) => {
    topMovies.value = newMovies;
  };
  return { topMovies, setTopMovies };
});
