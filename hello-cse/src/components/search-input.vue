<template>
  <div><input type="text" name="" id="" v-model="inputSearch" @keydown="setSearchFilters(inputSearch)" /></div>
  {{ inputSearch }}
</template>

<script setup lang="ts">
import { useMovie } from "@/composables/UseMovie";
import { ref } from "vue";

const { setSearchFilters } = useMovie();

const inputSearch = ref("");
</script>

<style scoped></style>
