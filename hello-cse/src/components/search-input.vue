<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="inputSearch"
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
  widthInput.value = "20rem";
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
  padding: 4px 12px 4px 40px; /* Padding pour laisser la place à l'image */
  font-size: 16px;
  border: 1px solid #c1c1c1;
  outline: none;
  background-image: url("@/assets/search.png"); /* Lien vers l'image */
  background-size: 18px;
  background-position: 17px center; /* Positionner l'image */
  background-repeat: no-repeat; /* Éviter la répétition de l'image */
  border-radius: 24px;
  color: white;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
}
</style>
