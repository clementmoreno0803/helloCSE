<template>
  <div>
    <div>
      <v-skeleton-loader
        v-if="!isLoaded"
        :elevation="3"
        color="rgb(28,28,28)"
        type="paragraph"
        class="skeleton-title"
      ></v-skeleton-loader>
      <h2 v-else>Les nouveaux arrivants</h2>
      <v-skeleton-loader
        v-if="!isLoaded"
        :elevation="3"
        color="rgb(28,28,28)"
        type="card"
        class="top-movie-card__carousel-container"
      ></v-skeleton-loader>
      <div class="all-movies" v-else>
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
import { useMovie } from "@/composables/UseMovie";
import { useMovieService } from "@/services/UseMovieService";
import { useMovieStore } from "@/stores/movieStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

const { upComingMovies, getFilteredMovies, isLoaded } = storeToRefs(useMovieStore());
const { getUpCommingMovies } = useMovie();
const router = useRouter();

const goToDetail = (id: number) => {
  router.push({ name: "MovieDetail", params: { id } });
};

const hasMore = ref(true);
const isLoading = ref(false);

const page = ref(2);
async function api() {
  return useMovieService().upComingMovies(page.value);
}

const load = async ({ done }) => {
  if (!hasMore.value || isLoading.value) {
    done("ok");
    return;
  }

  isLoading.value = true;

  try {
    const newMovies = await api();

    if (newMovies.length > 0) {
      upComingMovies.value.push(...newMovies);
      page.value++;
    } else {
      hasMore.value = false;
    }

    done("ok");
  } catch (error) {
    console.error("Erreur lors du chargement des films :", error);
    done("error");
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getUpCommingMovies(1);
});
defineExpose({goToDetail})
</script>

<style lang="scss" scoped>
.skeleton-title {
  @include marginTopBottom(3vh);
  width: 30%;
}
.all-movies {
  position: relative;
  &::after {
    content: "";
    @include absoluteTopLeft;
    width: 100%;
    background: linear-gradient(0deg, rgb(23, 23, 23, 0%) 0%, rgba(0, 0, 0, 1) 100%);
    border-top-left-radius: $border-rounded;
    border-top-right-radius: $border-rounded;
    overflow: hidden;
    z-index: $z-top;
    height: 9.375rem;
  }
  &__carousel-container {
    height: auto;
  }
  &__infinite-scroll {
    @include responsive("mobile") {
      @include __infinite-scroll(space-around);
    }
    @include responsive("tablet") {
      @include __infinite-scroll(space-around);
    }
    @include responsive("desktop") {
      @include __infinite-scroll(lex-start);
    }
  }
  &__card-container {
    @include responsive("mobile") {
      width: 45vw;
      @include __card-container;
    }
    @include responsive("tablet") {
      width: 22vw;
      @include __card-container;
    }
    @include responsive("desktop") {
      width: 14vw;
      @include __card-container;
    }
  }
  &__card-title {
    @include responsive("mobile") {
      width: 45vw;
      @include __card-title;
    }
    @include responsive("tablet") {
      width: 22vw;
      @include __card-title;
    }
    @include responsive("desktop") {
      width: 14vw;
      @include __card-title;
    }
  }
  &__description {
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      @include flexGap(0.5rem);
      margin-left: 0.5rem;
      color: $gris-clair;
    }
  }
}
::v-deep .v-infinite-scroll__side {
  display: none;
}
</style>
