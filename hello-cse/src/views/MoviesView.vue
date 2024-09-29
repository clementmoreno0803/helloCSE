<template>
  <div class="home">
    <top-movie-carousel></top-movie-carousel>
    <all-movies></all-movies>
  </div>
</template>

<script setup lang="ts">
import topMovieCarousel from "@/components/movies/top-movie-carousel.vue";
import allMovies from "@/components/movies/all-movies.vue";
</script>

<style lang="scss" scoped>
.home {
  width: 95vw;
  @include marginCenter(0);
}
</style>
