<template>
  <div class="home">
    <div class="home__carousel">
      <top-movie-carousel></top-movie-carousel>
      <now-playing-carousel></now-playing-carousel>
    </div>
    <all-movies></all-movies>
  </div>
</template>

<script setup lang="ts">
import topMovieCarousel from "@/components/movies/carousels/top-movie-carousel.vue";
import allMovies from "@/components/movies/all-movies.vue";
import NowPlayingCarousel from "@/components/movies/carousels/now-playing-carousel.vue";
</script>

<style lang="scss" scoped>
.home {
  width: 95vw;
  @include marginCenter(0);
  &__carousel {
    @include responsive("mobile") {
      display: flex;
      flex-direction: column;
    }
    @include responsive("tablet") {
      display: flex;
      justify-content: space-between;
    }
    @include responsive("desktop") {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
