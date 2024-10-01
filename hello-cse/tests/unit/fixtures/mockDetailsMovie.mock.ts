import { movieDetail } from "@/models/movieDetailInterface";

export const mockMovieDetail: movieDetail = {
  title: "Example Movie",
  overview: "This is an example movie overview.",
  poster_path: "/example-movie-poster.jpg",
  vote_count: 100,
  vote_average: "7.8",
  genres: ["Action", "Drama"],
  cast: [
    {
      id: 1,
      name: "Actor One",
      character: "Character One",
      profile_path: "/actor-one.jpg",
      adult: false,
      gender: 2,
      known_for_department: "Acting",
      original_name: "Actor One",
      popularity: 5.6,
      cast_id: 101,
      credit_id: "abc123",
      order: 0
    },
    {
      id: 2,
      name: "Actor Two",
      character: "Character Two",
      profile_path: "/actor-two.jpg",
      adult: false,
      gender: 2,
      known_for_department: "Acting",
      original_name: "Actor One",
      popularity: 5.9,
      cast_id: 106,
      credit_id: "abc123",
      order: 0
    },
    {
      id: 3,
      name: "Actor Three",
      character: "Character Three",
      profile_path: "/actor-three.jpg",
      adult: false,
      gender: 1,
      known_for_department: "Acting",
      original_name: "Actor Three",
      popularity: 5.6,
      cast_id: 104,
      credit_id: "abc123",
      order: 0
    },
    {
      id: 4,
      name: "Actor Four",
      character: "Character Four",
      profile_path: "/actor-four.jpg",
      adult: false,
      gender: 2,
      known_for_department: "Acting",
      original_name: "Actor Four",
      popularity: 6.4,
      cast_id: 102,
      credit_id: "abc123",
      order: 0
    }
  ],
  director: [
    {
      adult: false,
      gender: 1,
      id: 1267329,
      known_for_department: "Realisation",
      name: "Lupita Nyong'o",
      original_name: "Lupita Nyong'o",
      popularity: 29.93,
      profile_path: "/y40Wu1T742kynOqtwXASc5Qgm49.jpg",
      credit_id: "65c03d8ffc65380163eaf41c",
      job: "Director",
      department: "Realisation"
    }
  ]
};
