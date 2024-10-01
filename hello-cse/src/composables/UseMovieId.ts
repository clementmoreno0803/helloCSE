import { useRoute } from "vue-router";

export const useMovieId = () => {
  const route = useRoute();
  return String(route.params.id);
};
