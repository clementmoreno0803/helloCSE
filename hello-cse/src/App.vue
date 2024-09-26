<template>
  <nav>
    <h1>NETFLIX</h1>
    <search-input></search-input>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import searchInput from "./components/search-input.vue";
</script>

<style scoped></style>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  display: flex;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
