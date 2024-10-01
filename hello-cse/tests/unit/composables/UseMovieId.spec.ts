import { describe, it, expect, vi } from "vitest";
import { useRoute } from "vue-router";
import { useMovieId } from "@/composables/UseMovieId";

// Mock de useRoute
vi.mock("vue-router", () => ({
  useRoute: vi.fn(() => ({
    params: { id: "123" } // You can provide the mock ID here
  }))
}));

describe("useMovieId", () => {
  it("should return the movie ID from route params", () => {
    const mockMovieId = "123";

    const movieId = useMovieId(); // Assuming your composable uses useRoute to get the movieId

    expect(movieId).toBe(mockMovieId);
  });
});
