import { describe, it, expect, vi } from "vitest";
import { useMovieId } from "@/composables/UseMovieId";

// Mock de useRoute
vi.mock("vue-router", () => ({
  useRoute: vi.fn(() => ({
    params: { id: "123" }
  }))
}));

describe("useMovieId", () => {
  it("should return the movie ID from route params", () => {
    const mockMovieId = "123";

    const movieId = useMovieId();

    expect(movieId).toBe(mockMovieId);
  });
});
