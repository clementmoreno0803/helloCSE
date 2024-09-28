<template>
  <div>
    <v-skeleton-loader
      v-if="!isLoaded"
      :elevation="3"
      color="rgb(28,28,28)"
      type="card"
      class="top-movie-card__carousel-container"
    ></v-skeleton-loader>
    <div v-else>
      <h2>Les nouveaux arrivants</h2>
      <div class="all-movies">
        <v-infinite-scroll class="all-movies__infinite-scroll" :height="1000" :items="getFilteredMovies" :onLoad="load">
          <div v-for="movie in getFilteredMovies" :key="movie.id">
            <v-card
              class="all-movies__card-container"
              :style="{ backgroundImage: `url(${movie.poster_path})`, backgroundSize: 'cover' }"
              variant="tonal"
              @click="goToDetail(movie.id)"
            ></v-card>
            <v-tooltip :text="movie.title" location="bottom">
              <template v-slot:activator="{ props }">
                <p class="all-movies__card-title" v-bind="props">{{ movie.title }}</p>
              </template>
            </v-tooltip>
            <div class="all-movies__description">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="12"
                height="12"
              >
                <path
                  fill="yellow"
                  d="M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453Z"
                />
              </svg>
              <p>{{ `${movie.vote_average}%` }} | {{ dayjs(movie.release_date).year() }}</p>
            </div>
          </div>
        </v-infinite-scroll>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useMovie } from "@/composables/UseMovie";
import { useMovieService } from "@/services/UseMovieService";
import { useMovieStore } from "@/stores/movieStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

// const { getUpCommingMovies } = useMovie();
const { upComingMovies, getFilteredMovies } = storeToRefs(useMovieStore());
const router = useRouter();

const page = ref(1);
const hasMore = ref(true);
const isLoaded = ref(false);

const goToDetail = (id: number) => {
  router.push({ name: "MovieDetail", params: { id } });
};

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

  done("ok");
};
setTimeout(() => {
  isLoaded.value = true;
}, 5000);
</script>

<style lang="scss" scoped>
.all-movies {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    background: linear-gradient(0deg, rgb(23, 23, 23, 0%) 0%, rgba(0, 0, 0, 1) 100%);
    left: 0;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    overflow: hidden;
    z-index: 9999;
    height: 150px;
  }
  &__infinite-scroll {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2vw;
    margin: 0 auto;
    justify-content: flex-start;
    position: relative;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  &__card-container {
    width: 14vw;
    height: 20rem;
    border-radius: 12px;
    object-fit: cover;
  }
  &__card-title {
    max-width: 14vw;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__description {
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      display: flex;
      gap: 0.5rem;
      margin-left: 0.5rem;
    }
  }
}
::v-deep .v-infinite-scroll__side {
  display: none;
}
</style>
