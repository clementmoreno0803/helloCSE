import { movieDetail } from "@/models/movieDetailInterface";

export const mockMovieDetail: movieDetail = {
  id: 1,
  title: 'Example Movie',
  overview: 'This is an example movie overview.',
  poster_path: '/example-movie-poster.jpg',
  vote_count: 100,
  vote_average: 7.8,
  genres: ['Action', 'Drama'],
  cast: [
    { id: 1, name: 'Actor One', character: 'Character One', profile_path: '/actor-one.jpg' },
    { id: 2, name: 'Actor Two', character: 'Character Two', profile_path: '/actor-two.jpg' },
    { id: 3, name: 'Actor Three', character: 'Character Three', profile_path: '/actor-three.jpg' },
    { id: 4, name: 'Actor Four', character: 'Character Four', profile_path: '/actor-four.jpg' },
  ],
  director: [{ id: 1, name: 'Director One', job: 'Director', profile_path: '/director-one.jpg' }],
};