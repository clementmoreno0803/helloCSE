<template>
  <div>
    <div class="get-all-comments__title">
      <h3>Commentaires:</h3>
      <span class="get-all-comments__number-of-comments">{{ props.comments.length }}</span>
    </div>
    <v-list class="get-all-comments__list-of-comments" lines="two">
      <v-list-item v-for="comment in props.comments" :key="comment.name" :prepend-avatar="comment.profilPicture">
        <div class="get-all-comments__comment-part">
          <div class="get-all-comments__name">
            <h3>{{ comment.name }}</h3>
            <p>
              <span :style="{ color: 'orange' }">{{ comment.note }}</span>
              /10
            </p>
          </div>
          <h4>{{ `Il y a ${getMinutesSincePublished(comment.dateCreation)} minutes` }}</h4>
          <p>{{ comment.commentPart }}</p>
        </div>
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

const getMinutesSincePublished = (dateCreation: string | Date) => {
  const now = dayjs();
  const createdAt = dayjs(dateCreation);

  if (now.diff(createdAt, "minute") < 60) {
    return now.diff(createdAt, "minute");
  } else if (now.diff(createdAt, "minute") > 60 && now.diff(createdAt, "minute") < 1440) {
    return now.diff(createdAt, "hours");
  } else {
    return now.diff(createdAt, "days");
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
    @include flexGap(1rem);
  }
  &__profil-picture {
    width: 24px;
    height: 24px;
    border-radius: 25%;
  }
  &__number-of-comments {
    background: $orange;
    border-radius: 1rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
  }
  &__list-of-comments {
    background: transparent;
    color: white;
    text-align: left;
  }
  &__name {
    @include flexGap(2rem);
    align-items: center;
  }
}
</style>
