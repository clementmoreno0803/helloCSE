<template>
  <div>
    <input type="text" id="search" placeholder="Insérer le nom d'un film" v-model="" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const test = ref("");

console.log(test, "test");
</script>

<style scoped></style>
