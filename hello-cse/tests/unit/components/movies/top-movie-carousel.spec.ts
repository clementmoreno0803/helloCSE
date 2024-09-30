import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useMovieStore } from '@/stores/movieStore';
import { createRouter, createWebHistory } from "vue-router";
import TopMovieCarousel from "@/components/movies/top-movie-carousel.vue";
import { mockMovies } from "../../fixtures/mockMovies.mock";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: TopMovieCarousel },
  ],
});


  const generateWrapper = () => {
    return shallowMount(TopMovieCarousel, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: {
              movieStore: {
                getTopFiveMovies: [],
              },
            },
            createSpy: vi.fn,
          }),
        ],
      },
    });
  };

describe('TopMovieCard.vue', () => {
  it('should show skeleton loaders when no movies are available', async () => {
    const wrapper = generateWrapper();

    const skeletonLoaders = wrapper.findAll('v-skeleton-loader');

    expect(skeletonLoaders.length).toBe(2);
  });

  it('should display top 5 movies when available', async () => {
    const wrapper = generateWrapper();
    useMovieStore().getTopFiveMovies = mockMovies
    await wrapper.vm.$nextTick()

    const movieItems = wrapper.findAll('.top-movie-card__carousel-item');
    expect(movieItems.length).toBe(5);
    expect(movieItems[0].text()).toContain(mockMovies[0].title);
    expect(movieItems[0].text()).toContain(mockMovies[0].vote_average.toString());
  });
});
