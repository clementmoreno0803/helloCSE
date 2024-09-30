import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useMovieStore } from '@/stores/movieStore';
import { mockTopMovies } from "../fixtures/mockTopMovies.mock";
import { mockMovies } from "../fixtures/mockMovies.mock";
import { mockMovieDetail } from "../fixtures/mockDetailsMovie.mock"; // Adapter le chemin

describe('Movie Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with default values', () => {
    const store = useMovieStore();

    expect(store.topMovies).toEqual([]);
    expect(store.upComingMovies).toEqual([]);
    expect(store.movieDetails).toBeUndefined();
    expect(store.inputFilter).toBe('');
    expect(store.isLoaded).toBe(false);
  });

  it('should set top movies correctly', () => {
    const store = useMovieStore();
    const topMovies = [mockTopMovies];

    store.setTopMovies(topMovies);
    expect(store.topMovies).toEqual(topMovies);
  });

  it('should set upcoming movies correctly and mark as loaded', () => {
    const store = useMovieStore();
    const mockUpcomingMovies = mockMovies;

    store.setUpComingMovies(mockUpcomingMovies);
    expect(store.upComingMovies).toEqual(mockUpcomingMovies);
    expect(store.isLoaded).toBe(true);
  });

  it('should filter movies by name', () => {
    const store = useMovieStore();
    const mockUpcomingMovies = mockMovies;

    store.setUpComingMovies(mockUpcomingMovies);
    store.setMovieFilterByName('Movie 1');
    const filteredMovies = store.getFilteredMovies;

    expect(filteredMovies).toEqual([{
      id: 1,
      title: 'Movie 1',
      vote_average: 7.5,
      backdrop_path: '/path/to/backdrop.jpg',
      overview: "This is an overview of Movie 1.",
      poster_path: "/path/to/poster.jpg",
      release_date: "2024-12-25",
    }]);
  });

  it('should return top 5 movies based on vote_average', () => {
    const store = useMovieStore();

    store.setTopMovies(mockTopMovies);
    const top5Movies = store.getTopFiveMovies;

    expect(top5Movies.length).toBe(5);
    expect(top5Movies[0].title).toBe('Movie Three'); // Highest vote_average
  });

  it('should return top 4 actors based on popularity', () => {
    const store = useMovieStore();
    const mockMovieDetails = mockMovieDetail;

    store.setMovieDetails(mockMovieDetails);
    const top4Actors = store.listTop4Actors;
    expect(top4Actors?.length).toBe(4);
  });
});
