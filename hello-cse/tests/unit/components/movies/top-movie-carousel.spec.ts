import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import TopMovieCard from '@/components/movies/TopMovieCard.vue'; // Le chemin vers votre composant
import { createTestingPinia } from '@pinia/testing';
import { useMovieStore } from '@/stores/movieStore'; // Le chemin vers votre store
import { useRouter, useRoute, createRouter, createWebHistory } from "vue-router";
import TopMovieCarousel from "@/components/movies/top-movie-carousel.vue";
import { mockMovies } from "../../fixtures/mockMovies.mock";
import detailsMovies from "@/components/movies/details-movies.vue";

// Simulez les paramètres de route
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

    expect(skeletonLoaders.length).toBe(2); // Il devrait y avoir 2 skeletons
  });

  it('should display top 5 movies when available', async () => {
    const wrapper = generateWrapper(mockMovies);
    useMovieStore().getTopFiveMovies = mockMovies
    await wrapper.vm.$nextTick()

    const movieItems = wrapper.findAll('.top-movie-card__carousel-item');
    expect(movieItems.length).toBe(5);
    expect(movieItems[0].text()).toContain(mockMovies[0].title);
    expect(movieItems[0].text()).toContain(mockMovies[0].vote_average.toString());
  });
});
