import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { createTestingPinia } from "@pinia/testing";
import AllMovies from "@/components/movies/all-movies.vue";
import { mockMovies } from "../../fixtures/mockMovies.mock";
import { useMovieStore } from "@/stores/movieStore";
import detailsMovies from "@/components/movies/details-movies.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/movies/:id", name: "MovieDetail", component: detailsMovies }]
});

const generateWrapper = () => {
  return shallowMount(AllMovies, {
    global: {
      plugins: [
        router,
        createTestingPinia({
          initialState: {
            movieStore: {
              upComingMovies: [],
              getFilteredMovies: [],
              isLoaded: false
            }
          },
          createSpy: vi.fn
        })
      ],
      mocks: {
        $route: { params: { id: 1 } }
      }
    }
  });
};

describe("AllMovies.vue", () => {
  it("should render correctly", () => {
    const wrapper = generateWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render correctly while loading", () => {
    const wrapper = generateWrapper();

    expect(wrapper.find(".skeleton-title").exists()).toBe(true);
    expect(wrapper.find(".all-movies").exists()).toBe(false);
  });

  it("should load more movies on scroll", async () => {
    const wrapper = generateWrapper();
    const movieStore = useMovieStore();

    movieStore.isLoaded = true;
    movieStore.upComingMovies = mockMovies;
    await wrapper.vm.$nextTick();

    await wrapper.vm.load({ done: vi.fn() });

    expect(movieStore.upComingMovies.length).toBe(mockMovies.length);
  });

  it("should navigate to movie detail page", async () => {
    const wrapper = generateWrapper();
    const movieStore = useMovieStore();
    movieStore.isLoaded = true;
    movieStore.upComingMovies = mockMovies;
    await wrapper.vm.$nextTick();

    const movieCard = wrapper.findAll(".all-movies__card-container")[0];
    await movieCard.trigger("click");

    expect(wrapper.vm.$route.params.id).toBe(mockMovies[0].id);
  });
});
