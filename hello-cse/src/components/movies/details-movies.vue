<template>
  <div>
    <v-skeleton-loader
      v-if="!movieDetails"
      color="rgb(28,28,28)"
      class="movies-details"
      :elevation="13"
      type="card"
    ></v-skeleton-loader>
    <v-card v-else class="movies-details" variant="tonal">
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
            <p>Taux de satisfaction sur {{ movieDetails.vote_count }} votants :</p>
            <v-tooltip :text="movieDetails.vote_average" location="bottom">
              <template v-slot:activator="{ props }">
                <v-progress-linear :model-value="movieDetails.vote_average" v-bind="props"></v-progress-linear>
              </template>
            </v-tooltip>
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
          <v-list lines="two" class="movies-details__cast">
            <template v-for="cast in listTop4Actors" :key="cast.id">
              <v-list-item
                class="movies-details__cast--width"
                v-if="cast.profile_path"
                :title="cast.name"
                :subtitle="cast.character"
                :prepend-avatar="`https://image.tmdb.org/t/p/w185/${cast.profile_path}`"
              ></v-list-item>
            </template>
          </v-list>
        </div>
      </div>
      <comments-area></comments-area>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useMovie } from "@/composables/UseMovie";
import { storeToRefs } from "pinia";
import { useMovieStore } from "@/stores/movieStore";
import { useMovieId } from "@/composables/UseMovieId";
import commentsArea from "../comments/comments-area.vue";

const { getMovieDetail } = useMovie();
const { movieDetails, listTop4Actors } = storeToRefs(useMovieStore());
const movieId = useMovieId();

onMounted(async () => {
  await getMovieDetail(movieId);
});
</script>

<style lang="scss" scoped>
.movies-details {
  max-width: 95vw;
  margin: 0 auto;
  padding: 1rem;
  background: rgb(28, 28, 28);
  color: white;
  &__container {
    display: flex;
    justify-content: flex-start;
    img {
      height: 500px;
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
    margin: 1rem 0;
    gap: 1rem;
    width: fit-content;
  }
  &__votes {
    text-align: left;
    max-width: 20rem;
  }
  &__crew {
    display: flex;
    background: #1c1c1c;
    color: white;
  }
  &__cast {
    display: flex;
    flex-wrap: wrap;
    background: #1c1c1c;
    color: white;

    &--width {
      width: calc(100% / 4);
    }
  }
}
</style>
