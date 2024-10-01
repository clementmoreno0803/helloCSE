/* eslint-disable */
import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { useMovieStore } from "@/stores/movieStore";
import { createRouter, createWebHistory } from "vue-router";
import TopMovieCarousel from "@/components/movies/carousels/top-movie-carousel.vue";
import { mockTopMovies } from "../../fixtures/mockTopMovies.mock";


vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { movieId: "123" },
  }),
}));

const generateWrapper = () => {
  return shallowMount(TopMovieCarousel, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            movieStore: {
              getTopFiveMovies: [mockTopMovies]
            }
          },
          createSpy: vi.fn
        })
      ]
    }
  });
};

describe("TopMovieCard.vue", () => {
  it("should render correctly", () => {
    const wrapper = generateWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });
  it("should show skeleton loaders when no movies are available", async () => {
    const wrapper = generateWrapper();

    const skeletonLoaders = wrapper.findAll("v-skeleton-loader");

    expect(skeletonLoaders.length).toBe(2);
  });

  it("should render the top 5 movie carousel when there are movies", async () => {
    const mockMovies = mockTopMovies;
    const wrapper = generateWrapper();
    const store = useMovieStore();

    store.topMovies = mockMovies;
    await wrapper.vm.$nextTick();

    const movieItems = wrapper.findAll(".top-movie-card__carousel-item");
    expect(movieItems.length).toBe(5);

    expect(movieItems[0].text()).toContain("Movie Three");
    expect(movieItems[0].text()).toContain("9");
  });
});
