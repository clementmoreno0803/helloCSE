import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { topMovieDtoToTopmovie } from "@/mappers/topMovieDtoToTopmovie";
import { movieDtoTomovie } from "@/mappers/movieDtoTomovie";
import { movieAndCrewDtoToMovieDetails } from "@/mappers/movieAndCrewDtoToMovieDetails";
import { useMovieService } from "@/services/UseMovieService";

vi.mock("axios");
vi.mock("@/mappers/topMovieDtoToTopmovie");
vi.mock("@/mappers/movieDtoTomovie");
vi.mock("@/mappers/movieAndCrewDtoToMovieDetails");

describe("useMovieService", () => {
  describe("topMovies", () => {
    it("should fetch and transform top movies", async () => {
      vi.spyOn(axios, "get").mockResolvedValue({
        data: {
          results: [
            { id: 1, title: "Movie 1", vote_average: 8 },
            { id: 2, title: "Movie 2", vote_average: 7 }
          ]
        }
      });
      const { topMovies } = useMovieService();
      const result = await topMovies();

      expect(axios.get).toHaveBeenCalledWith(expect.any(String), expect.any(Object));

      expect(topMovieDtoToTopmovie).toHaveBeenCalledWith({ id: 2, title: "Movie 2", vote_average: 7 });
      expect(result).toEqual(expect.any(Array));
    });
  });

  describe("upComingMovies", () => {
    it("should fetch and transform upcoming movies", async () => {
      const mockApiResponse = { data: { results: [{ id: 2, title: "Upcoming Movie 1" }] } };
      vi.spyOn(axios, "get").mockResolvedValue(mockApiResponse);

      const { upComingMovies } = useMovieService();
      const result = await upComingMovies(1);

      expect(axios.get).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
      expect(movieDtoTomovie).toHaveBeenCalledWith({ id: 2, title: "Upcoming Movie 1" });
      expect(result).toEqual(expect.any(Array));
    });
  });

  describe("movieDetails", () => {
    it("should fetch and transform movie details with crew", async () => {
      const mockMovieDetailsResponse = { data: { id: 1, title: "Movie 1" } };
      const mockCrewResponse = { data: { crew: [{ id: 1, name: "Director" }] } };

      vi.spyOn(axios, "get").mockResolvedValueOnce(mockMovieDetailsResponse).mockResolvedValueOnce(mockCrewResponse);

      const { movieDetails } = useMovieService();
      await movieDetails("1");

      expect(axios.get).toHaveBeenNthCalledWith(1, "https://api.themoviedb.org/3/movie/1", {
        params: { api_key: "44bdb41409ffedfbd839554006826336" }
      });
      expect(axios.get).toHaveBeenNthCalledWith(2, "https://api.themoviedb.org/3/movie/1/credits", {
        params: { api_key: "44bdb41409ffedfbd839554006826336" }
      });
      expect(movieAndCrewDtoToMovieDetails).toHaveBeenCalledWith(mockMovieDetailsResponse.data, mockCrewResponse.data);
    });

    it("should return undefined if movie details or crew data is missing", async () => {
      vi.spyOn(axios, "get").mockResolvedValueOnce({ data: null });

      const { movieDetails } = useMovieService();
      const result = await movieDetails("1");

      expect(result).toBeUndefined();
    });

    it("should handle errors in movieDetails", async () => {
      vi.spyOn(axios, "get").mockRejectedValue(new Error("Network Error"));

      const { movieDetails } = useMovieService();
      const result = await movieDetails("1");

      expect(result).toBeUndefined();
    });
  });
});
