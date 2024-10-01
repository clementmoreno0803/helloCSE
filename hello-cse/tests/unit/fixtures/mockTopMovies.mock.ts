import { topMovieInterface } from "@/models/topMovieInterface";

export const mockTopMovies: topMovieInterface[] = [
  {
    id: 1,
    title: "Movie One",
    backdrop_path: "/path/to/backdrop1.jpg",
    vote_average: 8.5,
    release_date: "2023-01-01",
    genre_ids: [1, 24],
    overview: "this is an overview for Movie One",
    poster_path: "/path/to/backdrop1.jpg"
  },
  {
    id: 2,
    title: "Movie Two",
    backdrop_path: "/path/to/backdrop2.jpg",
    vote_average: 7.2,
    release_date: "2023-02-15",
    genre_ids: [16, 35],
    overview: "this is an overview for Movie Two",
    poster_path: "/path/to/backdrop2.jpg"
  },
  {
    id: 3,
    title: "Movie Three",
    backdrop_path: "/path/to/backdrop3.jpg",
    vote_average: 9.0,
    release_date: "2023-03-10",
    genre_ids: [16, 43],
    overview: "this is an overview for Movie Three",
    poster_path: "/path/to/backdrop3.jpg"
  },
  {
    id: 4,
    title: "Movie Four",
    backdrop_path: "/path/to/backdrop4.jpg",
    vote_average: 6.8,
    release_date: "2023-04-20",
    genre_ids: [65, 35],
    overview: "this is an overview for Movie Four",
    poster_path: "/path/to/backdrop4.jpg"
  },
  {
    id: 5,
    title: "Movie Five",
    backdrop_path: "/path/to/backdrop5.jpg",
    vote_average: 8.0,
    release_date: "2023-05-30",
    genre_ids: [16, 35],
    overview: "this is an overview for Movie Five",
    poster_path: "/path/to/backdrop5.jpg"
  }
];
