<template>
  <div><input type="text" name="" id="" v-model="inputSearch" @keydown="setSearchFilters(inputSearch)" /></div>
  {{ inputSearch }}
</template>

<script setup lang="ts">
import { useMovie } from "@/composables/UseMovie";
import { ref } from "vue";

const { setSearchFilters } = useMovie();

const inputSearch = ref("");

// watch(inputSearch, (newValue: string) => {
//   inputSearch.value = newValue;
//   console.log(inputSearch.value, "inputSearch");
// });
</script>

<style scoped></style>
