<template>
  <div>
    <v-list lines="three">
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
</script>

<style scoped>
::v-deep .v-list-item {
  border: 1px solid black;
  width: 50rem;
  margin-bottom: 1rem;
  border-radius: 12px;
}
</style>
