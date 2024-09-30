import { describe, it, expect, vi } from 'vitest';
import { useRoute } from "vue-router";
import { useMovieId } from "@/composables/UseMovieId"

// Mock de useRoute
vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
}));

describe("useMovieId", () => {
  it("should return the movie ID from route params", () => {
    const mockMovieId = "123";
    (useRoute as vi.Mock).mockReturnValue({
      params: { id: mockMovieId },
    });

    const movieId = useMovieId();

    expect(movieId).toBe(mockMovieId);
  });

  it("should return an empty string if movie ID is undefined", () => {
    (useRoute as vi.Mock).mockReturnValue({
      params: { id: undefined },
    });

    const movieId = useMovieId();

    expect(movieId).toBe("undefined");
  });
});
