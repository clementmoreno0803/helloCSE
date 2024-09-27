import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import movieDetail from "@/views/MovieDetail.vue";
import MoviesView from "@/views/MoviesView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: MoviesView
  },
  {
    path: "/movie/:id",
    name: "MovieDetail",
    component: movieDetail,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
