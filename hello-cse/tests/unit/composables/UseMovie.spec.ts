import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useMovie } from '@/composables/UseMovie';
import { mockMovies } from "../fixtures/mockMovies.mock";
import { mockTopMovies } from "../fixtures/mockTopMovies.mock";
import { ref } from "vue";
import {  useRoute } from "vue-router";
import { mockMovieDetail } from "../fixtures/mockDetailsMovie.mock";
import { mockComments } from "../fixtures/mockComments.mock";

// mock services
const mockMovieService = {
  topMovies: vi.fn().mockResolvedValueOnce(mockTopMovies),
  upComingMovies: vi.fn().mockResolvedValue(mockMovies),
  movieDetails: vi.fn().mockResolvedValue(mockMovieDetail)
}

vi.mock('@/services/UseMovieService', () => ({
  useMovieService:() => mockMovieService
}));

// mock store
const mockUseMovieStore = {
  topMovies: ref(mockTopMovies),
  setTopMovies: vi.fn(),
  setUpComingMovies: vi.fn(),
  setMovieDetails: vi.fn(),
  setMovieFilterByName: vi.fn()
}
vi.mock('@/stores/movieStore', () => ({
  useMovieStore:() => mockUseMovieStore
}));


vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
}));

beforeEach(() => {
  (useRoute as vi.Mock).mockReturnValue({
    params: { movieId: "123" },
  });

  global.localStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
  } as any;
});
describe('useMovie composable', () => {

  it('should fetch top movies and update the store', async () => {
    await useMovie().getTopMovies();

    expect(mockMovieService.topMovies).toHaveBeenCalled();
    expect(mockUseMovieStore.setTopMovies).toHaveBeenCalledWith(mockTopMovies);
  });

  it('should fetch upcoming movies and update store', async () => {

    await useMovie().getUpCommingMovies(1);

    expect(mockUseMovieStore.setUpComingMovies).toHaveBeenCalledWith(mockMovies)
  });

  it('should fetch movie details and update store', async () => {
    await useMovie().getMovieDetail('1');

    expect(mockUseMovieStore.setMovieDetails).toHaveBeenCalledWith(mockMovieDetail);
  });

  it('should set movie search filters', () => {
    useMovie().setSearchFilters('some filter');
    expect(mockUseMovieStore.setMovieFilterByName).toHaveBeenCalledWith('some filter');
  });

  it('should add a new comment to localStorage for a given movie ID', () => {
    const mockMovieId = "123";
    const mockComment = mockComments;

    (localStorage.getItem as vi.Mock).mockReturnValueOnce("[]");

    const { setMovieComment } = useMovie();
    setMovieComment(mockMovieId, mockComment);

    expect(localStorage.getItem).toHaveBeenCalledWith(`comments_${mockMovieId}`);

    (localStorage.getItem as vi.Mock).mockRestore();
    (localStorage.setItem as vi.Mock).mockRestore();
  });

  it('should retrieve and sort comments from localStorage', () => {
    localStorage.setItem('comments_1', JSON.stringify([
      {id: 1, name: 'User 1', commentPart: 'Comment 1', dateCreation: '2023-09-28T10:00:00Z' },
      {id: 2, name: 'User 2', commentPart: 'Comment 2', dateCreation: '2023-09-27T12:00:00Z' }
    ]));

    const sortedComments = useMovie().getMovieComment('1');
    console.log(sortedComments);
    expect(sortedComments[0].name).toBe('User 1'); // Sorted by date in descending order
  });//
});
