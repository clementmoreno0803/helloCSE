<template>
  <div>
    <v-infinite-scroll class="all-movies" :height="1000" :items="getFilteredMovies" :onLoad="load">
      <div v-for="movie in getFilteredMovies" :key="movie.id">
        <v-card
          class="all-movies__cart-container"
          :style="{ backgroundImage: `url(${movie.poster_path})`, backgroundSize: '100%' }"
          variant="tonal"
        >
          <div class="all-movies__cart-informations">
            <div class="all-movies__cart-description">
              <h2>{{ movie.title }}</h2>
              <v-tooltip :text="movie.overview" location="bottom">
                <template v-slot:activator="{ props }">
                  <p v-bind="props">{{ movie.overview }}</p>
                </template>
              </v-tooltip>
            </div>
            <h3>{{ movie.release_date }}</h3>
          </div>
          {{ movie.vote_average }}
        </v-card>
      </div>
    </v-infinite-scroll>
  </div>
</template>

<script setup lang="ts">
import { useMovie } from "@/composables/UseMovie";
import { useMovieService } from "@/services/UseMovieService";
import { useMovieStore } from "@/stores/movieStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const { getUpCommingMovies } = useMovie();
const { upComingMovies, getFilteredMovies } = storeToRefs(useMovieStore());

const page = ref(1);
const hasMore = ref(true);

const load = async ({ done }) => {
  if (!hasMore.value) {
    done();
    return;
  }

  const newMovies = await useMovieService().upComingMovies(page.value);

  if (newMovies.length > 0) {
    upComingMovies.value.push(...newMovies);
    page.value++;
  } else {
    hasMore.value = false;
  }

  done();

  onMounted(() => {
    getUpCommingMovies(page.value);
  });
};
</script>

<style lang="scss" scoped>
.all-movies {
  display: flex;
  flex-direction: row;
  width: 96vw;
  flex-wrap: wrap;
  gap: 2vw;
  margin: 10vh auto;
  justify-content: space-between;
  &__cart-container {
    width: 30vw;
    height: 25rem;
    border-radius: 12px;
    object-fit: cover;
  }
  &__cart-informations {
    position: absolute;
    bottom: 0px;
    text-align: left;
    display: flex;
    left: 0;
    color: white;
    padding: 10px 15px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 100%);
  }
}
::v-deep .v-infinite-scroll__side {
  display: none;
}
</style>
