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
  background: rgb(17, 17, 17);
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
  }
}
</style>
