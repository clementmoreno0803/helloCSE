<template>
  <div>
    <v-carousel show-arrows="hover">
      <v-carousel-item src="" cover></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useMovie } from "@/composables/UseMovie";

const { getTopMovies } = useMovie();

onMounted(async () => {
  await getTopMovies();
});
</script>

<style scoped></style>

function useMovie() { throw new Error("Function not implemented."); }
