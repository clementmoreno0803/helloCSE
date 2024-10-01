<template>
  <header>
    <nav>
      <router-link to="/"><h1>STREAM</h1></router-link>
      <search-input></search-input>
    </nav>
    <router-view />
  </header>
</template>

<script setup lang="ts">
import searchInput from "@/components/search-input.vue";
</script>

<style lang="scss" scoped>
h1 {
  @include title(2vh, 1.2rem);
}
nav {
  position: sticky;
  top: 0;
  z-index: 2 * $z-top;
  padding: 2rem;
  display: flex;
  background: $background-black;
  align-items: center;
  a {
    font-weight: $bold;
    color: white;
    opacity: 0.6;
    text-decoration: none;
  }
}
</style>
