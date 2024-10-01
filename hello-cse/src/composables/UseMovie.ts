import { CommentForm } from "@/models/commentInterface";
import { useMovieService } from "@/services/UseMovieService";
import { useMovieStore } from "@/stores/movieStore";
import { useMovieId } from "./UseMovieId";

export const useMovie = () => {
  const { topMovies, upComingMovies, movieDetails } = useMovieService();
  const { setTopMovies, setUpComingMovies, setMovieFilterByName, setMovieDetails } = useMovieStore();
  const movieId = useMovieId();

  const getTopMovies = async () => {
    const topMoviesArray = await topMovies();
    setTopMovies(topMoviesArray);
  };

  const getUpCommingMovies = async (pageNumber: number) => {
    const upComingMoviesArray = await upComingMovies(pageNumber);
    setUpComingMovies(upComingMoviesArray);
  };

  const setSearchFilters = (input: string) => {
    setMovieFilterByName(input);
  };

  const getMovieDetail = async (id: string) => {
    const details = await movieDetails(id);
    setMovieDetails(details);
  };

  const setMovieComment = (comment: CommentForm) => {
    const existingComments = JSON.parse(localStorage.getItem(`comments_${movieId}`) || "[]");
    existingComments.push(comment);
    localStorage.setItem(`comments_${movieId}`, JSON.stringify(existingComments));
  };

  const getMovieComment = (movieId: string) => {
    const comments = JSON.parse(localStorage.getItem(`comments_${movieId}`) || "[]");
    const commentsSorted = comments.sort(
      (a: CommentForm, b: CommentForm) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime()
    );
    return commentsSorted;
  };

  return { getTopMovies, getUpCommingMovies, getMovieDetail, setSearchFilters, setMovieComment, getMovieComment };
};
