<template>
  <div>
    <div class="get-all-comments__title">
      <h3>Commentaires:</h3>
      <span class="get-all-comments__number-of-comments">{{ props.comments.length }}</span>
    </div>
    <v-list class="get-all-comments__list-of-comments" lines="three">
      <v-list-item v-for="comment in props.comments" :key="comment.name">
        <h3>Nom complet: {{ comment.name }}</h3>
        <p>Date de publication: {{ dayjs(comment.dateCreation).format("DD/MM/YYYY") }}</p>
        <h2>{{ comment.commentPart }}</h2>
        <h2>{{ comment.note }}</h2>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { CommentForm } from "@/models/commentInterface";
import dayjs from "dayjs";
import { defineProps } from "vue";

const props = defineProps<{
  comments: CommentForm[];
}>();

const getInitials = (fullName) => {
  const nameArray = fullName.trim().split(" ");
  if (nameArray.length > 1) {
    return nameArray[0][0].toUpperCase() + nameArray[1][0].toUpperCase();
  } else {
    return nameArray[0][0].toUpperCase();
  }
};
</script>

<style lang="scss" scoped>
::v-deep .v-list-item {
  background: transparent;
}
.get-all-comments {
  display: flex;
  justify-content: flex-start;
  &__title {
    display: flex;
    gap: 1rem;
  }
  &__number-of-comments {
    background: rgb(255, 145, 105);
    border-radius: 1rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
  }
  &__list-of-comments {
    background: transparent;
    color: white;
  }
}
</style>
