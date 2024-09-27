import { useRoute } from "vue-router";

export const useMovieId = () => {
  const route = useRoute();
  const movieId = String(route.params.id);
  return movieId;
};
