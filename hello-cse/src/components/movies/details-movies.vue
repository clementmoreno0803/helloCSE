<template>
  <div>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
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
                :subtitle="cast.character"
                :prepend-avatar="`https://image.tmdb.org/t/p/w185/${cast.profile_path}`"
              >
                <v-tooltip :text="cast.name" location="bottom">
                  <template v-slot:activator="{ props }">
                    <p class="all-movies__card-title" v-bind="props">{{ cast.name }}</p>
                  </template>
                </v-tooltip>
              </v-list-item>
            </template>
          </v-list>
        </div>
      </div>
      <comments-area></comments-area>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMovie } from "@/composables/UseMovie";
import { storeToRefs } from "pinia";
import { useMovieStore } from "@/stores/movieStore";
import { useMovieId } from "@/composables/UseMovieId";
import commentsArea from "../comments/comments-area.vue";

const { getMovieDetail } = useMovie();
const { movieDetails, listTop4Actors } = storeToRefs(useMovieStore());
const movieId = useMovieId();
const items = ref([
  {
    title: "Home",
    disabled: false,
    href: "/"
  },
  {
    title: `${movieId}`,
    disabled: true
  }
]);

onMounted(async () => {
  await getMovieDetail(movieId);
});
</script>

<style lang="scss" scoped>
.movies-details {
  max-width: 95vw;
  @include marginCenter(0);
  padding: 1rem;
  background: $background-black;
  color: white;
  &__container {
    @include responsive("mobile") {
      @include __container(column);
    }
    @include responsive("tablet") {
      @include __container(column);
    }
    @include responsive("desktop") {
      @include __container(row);
    }
    img {
      height: 500px;
      width: auto;
      border-radius: $border-rounded;
    }
  }
  &__global-informations {
    @include responsive("mobile") {
      margin: 0;
    }
    @include responsive("tablet") {
      margin: 0;
    }
    @include responsive("desktop") {
      margin: 2rem 0 0 5vw;
    }
  }
  &__description {
    @include responsive("mobile") {
      @include __description(90vw);
    }
    @include responsive("tablet") {
      @include __description(90vw);
    }
    @include responsive("desktop") {
      @include __description(30vw);
    }
  }
  &__gender {
    @include flexGap(1rem);
    @include marginTopBottom(1rem);
    width: fit-content;
  }
  &__votes {
    text-align: left;
    max-width: 20rem;
  }
  &__crew {
    @include responsive("mobile") {
      @include __crew;
      justify-content: center;
      margin-top: 3rem;
    }
    @include responsive("tablet") {
      @include __crew;
      justify-content: center;
      margin-top: 3rem;
    }
    @include responsive("desktop") {
      @include __crew;
    }
  }
  &__cast {
    @include responsive("mobile") {
      @include __cast;
      justify-content: center;
      flex-wrap: wrap;
    }
    @include responsive("tablet") {
      @include __cast;
      flex-wrap: wrap;
    }
    @include responsive("desktop") {
      @include __cast;
      flex-wrap: wrap;
    }

    &--width {
      @include responsive("mobile") {
        @include __cast;
        flex-wrap: nowrap;
        width: calc(100% / 2);
      }
      @include responsive("tablet") {
        @include __cast;
        width: calc(100% / 4);
      }
      @include responsive("desktop") {
        @include __cast;
        width: calc(100% / 4);
      }
    }
  }
}
.v-breadcrumbs-item {
  color: white;
}
</style>
