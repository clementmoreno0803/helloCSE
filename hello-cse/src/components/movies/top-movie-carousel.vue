<template>
  <div>
    <div v-if="getTopFiveMovies.length == 0">
      <v-skeleton-loader :elevation="3" type="card" class="top-movie-card__carousel-container"></v-skeleton-loader>
    </div>
    <div class="top-movie-card" v-else>
      <h2 class="top-movie-card__title">Top 5 Movies</h2>
      <v-carousel hide-delimiter-background :show-arrows="false" class="top-movie-card__carousel-container">
        <v-carousel-item v-for="movie in getTopFiveMovies" :key="movie.id" :src="movie.backdrop_path" cover>
          <div class="top-movie-card__carousel-item">
            <h2>{{ movie.title }}</h2>
            <v-progress-circular :model-value="movie.vote_average" :size="40" :width="4" color="white">
              <p>{{ movie.vote_average }}</p>
            </v-progress-circular>
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useMovie } from "@/composables/UseMovie";
import { useMovieStore } from "@/stores/movieStore";
import { storeToRefs } from "pinia";

const { getTopMovies } = useMovie();
const { getTopFiveMovies } = storeToRefs(useMovieStore());

onMounted(async () => {
  await getTopMovies();
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;900&display=swap");

* {
  font-family: "Poppins";
}
::v-deep .v-window__container {
  height: 100%;
  object-fit: 50%;
  object-position: center;
}
// score vote
::v-deep .v-progress-circular {
  font-size: 0.5rem;
}

::v-deep .v-responsive__sizer {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.4780505952) 15%, rgba(0, 0, 0, 0.0858937325) 44%);
}
// item carousel
::v-deep .v-btn--icon.v-btn--density-default {
  width: 0.5rem;
  height: 0.5rem;
  background: white;
}
::v-deep .v-carousel__controls__item {
  background: white;
  opacity: 0.4;
  &:hover {
    opacity: 0.7;
  }
}

::v-deep .v-responsive__content {
  position: absolute;
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  bottom: 0;
  left: 100%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 100%);
}

.top-movie-card {
  position: relative;
  &__title {
    width: fit-content;
    position: absolute;
    color: white;
    z-index: 9999;
    font-size: 1.5rem;
    left: 2rem;
    top: 2rem;
    text-transform: uppercase;
    font-family: "Poppins";
    font-weight: 600;
  }
  &__carousel-container {
    max-width: 60vw;
    max-height: 20rem;
    border-radius: 12px;
    position: relative;
  }

  &__carousel-item {
    display: flex;
    width: calc(100% - 4rem);
    justify-content: space-between;
    align-items: center;
    max-height: 20rem;
    position: absolute;
    left: 2rem;
    bottom: 2rem;
    h2 {
      color: white;
      text-align: left;
      font-size: 1.75rem;
      font-weight: 600;
    }
  }
}
</style>
