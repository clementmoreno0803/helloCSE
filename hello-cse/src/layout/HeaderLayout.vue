<template>
  <header>
    <nav>
      <router-link to="/"><h1>HELLO CSE</h1></router-link>
      <search-input></search-input>
    </nav>
    <router-view />
  </header>
</template>

<script setup lang="ts">
import searchInput from "@/components/search-input.vue";
</script>

<style lang="scss" scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 99999;
  padding: 30px;
  display: flex;
  background: rgb(23, 23, 23);
  a {
    font-weight: bold;
    color: white;
    opacity: 0.6;
    text-decoration: none;
  }
}
</style>
