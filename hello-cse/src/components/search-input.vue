<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="inputSearch"
      data-testid="input-search"
      class="search-input"
      placeholder="Veuillez renseigner un film"
      :style="{ width: widthInput }"
      @keydown="setSearchFilters(inputSearch)"
      @focusin="extandInput"
      @focusout="shrinkInput"
    />
  </div>
</template>

<script setup lang="ts">
import { useMovie } from "@/composables/UseMovie";
import { ref } from "vue";

const { setSearchFilters } = useMovie();

const inputSearch = ref("");
const widthInput = ref("2rem");

const extandInput = () => {
  widthInput.value = "16rem";
};

const shrinkInput = () => {
  widthInput.value = "2rem";
};
</script>

<style lang="scss" scoped>
.search-bar {
  position: relative;
  margin-left: 2rem;
}

.search-input {
  width: 1rem;
  padding: 0.25rem 0.75rem 0.25rem 2.5rem;
  font-size: 1rem;
  border: 1px solid $gris-clair;
  outline: none;
  background-image: url("@/assets/search.png");
  background-size: 1.2rem;
  background-position: 17px center;
  background-repeat: no-repeat;
  border-radius: 1.5rem;
  color: white;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
}
</style>
