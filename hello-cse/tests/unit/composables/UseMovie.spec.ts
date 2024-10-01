import { describe, it, expect, beforeEach, vi } from "vitest";
import { useMovie } from "@/composables/UseMovie";
import { mockMovies } from "../fixtures/mockMovies.mock";
import { mockTopMovies } from "../fixtures/mockTopMovies.mock";
import { ref } from "vue";
import { mockMovieDetail } from "../fixtures/mockDetailsMovie.mock";

// mock services
const mockMovieService = {
  topMovies: vi.fn().mockResolvedValueOnce(mockTopMovies),
  upComingMovies: vi.fn().mockResolvedValue(mockMovies),
  movieDetails: vi.fn().mockResolvedValue(mockMovieDetail)
};

vi.mock("@/services/UseMovieService", () => ({
  useMovieService: () => mockMovieService
}));

// mock store
const mockUseMovieStore = {
  topMovies: ref(mockTopMovies),
  setTopMovies: vi.fn(),
  setUpComingMovies: vi.fn(),
  setMovieDetails: vi.fn(),
  setMovieFilterByName: vi.fn()
};
vi.mock("@/stores/movieStore", () => ({
  useMovieStore: () => mockUseMovieStore
}));

vi.mock("vue-router", () => ({
  useRoute: () => ({
    params: { movieId: "123" }
  })
}));

beforeEach(() => {
  vi.clearAllMocks();
});
describe("useMovie composable", () => {
  it("should fetch top movies and update the store", async () => {
    await useMovie().getTopMovies();

    expect(mockMovieService.topMovies).toHaveBeenCalled();
    expect(mockUseMovieStore.setTopMovies).toHaveBeenCalledWith(mockTopMovies);
  });

  it("should fetch upcoming movies and update store", async () => {
    await useMovie().getUpCommingMovies(1);

    expect(mockUseMovieStore.setUpComingMovies).toHaveBeenCalledWith(mockMovies);
  });

  it("should fetch movie details and update store", async () => {
    await useMovie().getMovieDetail("1");

    expect(mockUseMovieStore.setMovieDetails).toHaveBeenCalledWith(mockMovieDetail);
  });

  it("should set movie search filters", () => {
    useMovie().setSearchFilters("some filter");
    expect(mockUseMovieStore.setMovieFilterByName).toHaveBeenCalledWith("some filter");
  });

  // it('should add a new comment to localStorage for a given movie ID', () => {
  //   const mockMovieId = "123";
  //   const mockComment = { id: 1, name: 'Test User', commentPart: 'This is a comment', dateCreation: new Date().toISOString() };
  //
  //   // Mock des méthodes de localStorage
  //   const setItemMock = vi.spyOn(localStorage, 'setItem');
  //   const getItemMock = vi.spyOn(localStorage, 'getItem').mockReturnValueOnce("[]"); // Simule un localStorage vide
  //
  //   const { setMovieComment } = useMovie(); // Récupération de la fonction à tester
  //   setMovieComment(mockMovieId, mockComment); // Appel de la fonction avec les données mockées
  //
  //   // Vérifie que setItem a été appelé avec la bonne clé et valeur
  //   expect(setItemMock).toHaveBeenCalledWith(`comments_${mockMovieId}`, JSON.stringify([mockComment]));
  //
  //   // Vérifie que getItem a été appelé avec la bonne clé (si nécessaire)
  //   expect(getItemMock).toHaveBeenCalledWith(`comments_${mockMovieId}`);
  //
  //   // Nettoyage des mocks
  //   setItemMock.mockRestore();
  //   getItemMock.mockRestore();
  // });

  it("should retrieve and sort comments from localStorage", () => {
    localStorage.setItem(
      "comments_1",
      JSON.stringify([
        { id: 1, name: "User 1", commentPart: "Comment 1", dateCreation: "2023-09-28T10:00:00Z" },
        { id: 2, name: "User 2", commentPart: "Comment 2", dateCreation: "2023-09-27T12:00:00Z" }
      ])
    );

    const sortedComments = useMovie().getMovieComment("1"); // Note: Pass '1' as a string

    expect(sortedComments[0].name).toBe("User 1"); // First comment after sorting
    expect(sortedComments[1].name).toBe("User 2"); // Second comment after sorting
  });
});
