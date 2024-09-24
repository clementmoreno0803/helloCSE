<template>
  <div>
    <v-carousel class="top-movie-card__carousel-container" show-arrows hide-delimiters>
      <v-carousel-item v-for="movie in topMovies" :key="movie.id" :src="movie.poster_path" cover>
        <div class="top-movie-card__carousel-item">
          <div>
            <h2>{{ movie.title }}</h2>
            <h3>{{ movie.release_date }}</h3>
          </div>
          <v-progress-circular :model-value="movie.vote_average" :size="40" :width="4" color="white">
            <p>{{ `${movie.vote_average}%` }}</p>
          </v-progress-circular>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useMovie } from "@/composables/UseMovie";
import { useMovieStore } from "@/stores/movieStore";
import { storeToRefs } from "pinia";

const { getTopMovies } = useMovie();
const { topMovies } = storeToRefs(useMovieStore());

onMounted(async () => {
  await getTopMovies();
});
</script>

<style lang="scss" scoped>
::deep .v-window__container {
  height: 100%;
  object-fit: 50%;
  object-position: 50%;
}
::v-deep .v-progress-circular {
  font-size: 0.5rem;
}

::v-deep .v-responsive__content {
  position: absolute;
  width: 100%;
  height: 35%;
  backdrop-filter: blur(9px);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  bottom: 0;
  left: 100%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.0618040966386554) 0%, rgba(0, 0, 0, 1) 100%);
}

.top-movie-card {
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
    h2,
    h3 {
      color: white;
    }
  }
}
</style>
