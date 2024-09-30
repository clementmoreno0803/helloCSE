import { describe, it, expect, vi } from "vitest";
import { shallowMount } from '@vue/test-utils';
import detailsMovies from "@/components/movies/details-movies.vue";
import { mockMovieDetail, mockTop4Actors } from "../../fixtures/mockDetailsMovie.mock";
import { createTestingPinia } from "@pinia/testing";
import { createRouter, createWebHistory } from 'vue-router';
import { useMovieStore } from "@/stores/movieStore";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/movies/:id', component: detailsMovies },
  ],
});

const generateWrapper = () => {
  return shallowMount(detailsMovies, {
    global: {
      plugins: [
        router,
        createTestingPinia({
          initialState: {
            movieStore: {
              top4Actors: mockTop4Actors,
            },
          },
          createSpy: vi.fn,
        }),
      ],
      mocks: {
        $route: { params: { id: 1 } },
      },
    },
  });
};

describe('detailsMovies.vue', () => {
  it('should render top 4 actors in the cast list',async () => {
    const wrapper = generateWrapper();
    useMovieStore().movieDetails = mockMovieDetail;
    await wrapper.vm.$nextTick()

    const castItems = wrapper.findAll('.movies-details__cast--width');

    expect(castItems.length).toBe(mockMovieDetail.cast.length);
  });
});
