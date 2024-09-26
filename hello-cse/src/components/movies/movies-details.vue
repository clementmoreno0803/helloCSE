<template>
  <v-skeleton-loader v-if="!movieDetails" :elevation="13" type="card"></v-skeleton-loader>
  <v-card v-else class="movies-details">
    <div class="movies-details__container">
      <img :src="movieDetails?.poster_path" alt="image-film" />
      <div class="movies-details__global-informations">
        <div class="movies-details__description">
          <h2>{{ movieDetails?.title }}</h2>
          <p>{{ movieDetails?.overview }}</p>
        </div>
        <div class="movies-details__gender">
          <v-chip v-for="genre in movieDetails.genres" :key="genre" variant="outlined">
            {{ genre }}
          </v-chip>
        </div>
        <div class="movies-details__votes">
          {{ movieDetails.vote_average }}
          {{ movieDetails.vote_count }}
        </div>

        <div class="movies-details__team">
          <v-list lines="three" class="movies-details__crew">
            <v-list-item
              v-for="crew in movieDetails.director"
              :key="crew.id"
              :title="crew.name"
              :subtitle="crew.job"
              :prepend-avatar="`https://image.tmdb.org/t/p/w185/${crew.profile_path}`"
            ></v-list-item>
          </v-list>
        </div>
      </div>
    </div>
    <v-list lines="two" class="movies-details__cast">
      <template v-for="cast in movieDetails.cast" :key="cast.id">
        <v-list-item
          class="movies-details__cast--width"
          v-if="cast.profile_path"
          :title="cast.name"
          :subtitle="cast.character"
          :prepend-avatar="`https://image.tmdb.org/t/p/w185/${cast.profile_path}`"
        ></v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useMovie } from "@/composables/UseMovie";
import { storeToRefs } from "pinia";
import { useMovieStore } from "@/stores/movieStore";

const { getMovieDetail } = useMovie();
const { movieDetails } = storeToRefs(useMovieStore());

const route = useRoute();

onMounted(async () => {
  const movieId = String(route.params.id);
  console.log(typeof movieId);
  await getMovieDetail(movieId);
});
</script>

<style lang="scss" scoped>
.movies-details {
  max-width: 95vw;
  margin: 0 auto;
  &__container {
    display: flex;
    img {
      height: 400px;
      width: auto;
      border-radius: 12px;
    }
  }
  &__global-informations {
    margin: 2rem 0 0 5vw;
  }
  &__description {
    max-width: 30vw;
    text-align: left;

    display: flex;
    flex-direction: column;
  }
  &__gender {
    display: flex;
    margin-top: 2rem;
    gap: 1rem;
    width: fit-content;
  }
  &__crew {
    display: flex;
  }
  &__cast {
    display: flex;
    flex-wrap: wrap;
    &--width {
      width: 250px;
    }
  }
}
</style>
