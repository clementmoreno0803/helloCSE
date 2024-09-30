import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { useMovie } from "@/composables/UseMovie"; // Simuler la fonction de composable
import { createRouter, createWebHistory } from 'vue-router';
import { createTestingPinia } from '@pinia/testing'
import AllMovies from "@/components/movies/all-movies.vue";
import { mockMovies } from "../../fixtures/mockMovies.mock";
import { useMovieStore } from "@/stores/movieStore";
import { storeToRefs } from "pinia";

// Configuration du routeur
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/movie-detail/:id',
      name: 'MovieDetail',
      component: { template: '<div>Movie Detail</div>' },
    },
  ],
});

const generateWrapper = () => {
  return shallowMount(AllMovies, {
    global: {
      plugins: [router, createTestingPinia({
        initialState: {
          movieStore: {
            upComingMovies: [],
            getFilteredMovies: [] ,
            isLoaded: false ,
          }
        },
        createSpy: vi.fn,
      })],
    },
  })
}

describe('getAllComments', () => {
  it('should render correctly while loading', () => {
    const wrapper = generateWrapper()

    expect(wrapper.find('.skeleton-title').exists()).toBe(true);
    expect(wrapper.find('.all-movies').exists()).toBe(false);
  });

  it('should load more movies on scroll', async () => {
    const wrapper = generateWrapper();
    const movieStore = useMovieStore()
    movieStore.isLoaded = true;
    movieStore.upComingMovies = mockMovies;
    await wrapper.vm.$nextTick()

    await wrapper.vm.load({ done: vi.fn() });

    expect(movieStore.upComingMovies.length).toBe(mockMovies.length); // Vérifie que les films sont chargés
  });

  it('should navigate to movie detail page', async () => {
    const wrapper = generateWrapper();
    const movieStore = useMovieStore();

    movieStore.isLoaded = true;
    movieStore.upComingMovies = mockMovies;
    await wrapper.vm.$nextTick();

    const movieCard = wrapper.findAll('.all-movies__card-container')[0];
    await movieCard.trigger('click');

    console.log(wrapper.vm.$route.path);

    expect(wrapper.vm.goToDetail).toHaveBeenCalled();
  })
});
