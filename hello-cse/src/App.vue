<template>
  <Header />
</template>

<script setup lang="ts">
import Header from "@/layout/HeaderLayout.vue";
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $gris-anthracite;
  background: $background-black;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

h2 {
  @include title(3vh, 1.2rem);
}
h4 {
  @include title(0, 0.7rem);
}
</style>
