<template>
  <div class="comments-area">
    <form>
      <div class="comments-area__informations">
        <v-text-field
          v-model="comment.name"
          :counter="10"
          label="Nom d'utilisateur"
          required
          @blur="v$.name.$touch"
          @input="v$.name.$touch"
        ></v-text-field>
        <div v-if="v$.name.$error" class="error-message">
          {{ v$.name.$errors[0].$message }}
        </div>

        <v-text-field
          v-model="comment.note"
          label="Note"
          required
          @blur="v$.note.$touch"
          @input="v$.note.$touch"
        ></v-text-field>
        <div v-if="v$.note.$error" class="error-message">
          {{ v$.note.$errors[0].$message }}
        </div>
      </div>

      <div class="comments-area__comment-editor">
        <editor
          :api-key="MYSIWYG_API_KEY"
          v-model="comment.commentPart"
          placeholder="Ajoutez un commentaire..."
          @blur="v$.commentPart.$touch"
          @input="v$.commentPart.$touch"
          :init="{
            height: 200,
            menubar: false,
            plugins: 'lists link image code',
            toolbar:
              'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | code'
          }"
        />
        <div v-if="v$.commentPart.$error" class="error-message">
          {{ v$.commentPart.$errors[0].$message }}
        </div>
        <div class="comments-area__submit-button-container">
          <v-btn class="comments-area__submit-button" @click="submitComment">submit</v-btn>
        </div>
      </div>
    </form>
    <v-divider class="comments-area__divider" :thickness="3"></v-divider>
    <get-all-comments :comments="allComments"></get-all-comments>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { alpha, between, maxLength, minLength, numeric, required } from "@vuelidate/validators";
import { CommentForm } from "@/models/commentInterface";
import Editor from "@tinymce/tinymce-vue";
import { MYSIWYG_API_KEY } from "@/constants/wysiwyg";
import { useMovieId } from "@/composables/UseMovieId";
import { useMovie } from "@/composables/UseMovie";
import dayjs from "dayjs";
import getAllComments from "@/components/comments/get-all-comments.vue";

const movieId = useMovieId();
const { setMovieComment, getMovieComment } = useMovie();

const comment = ref<CommentForm>({
  profilPicture: "https://thispersondoesnotexist.com/",
  name: "",
  commentPart: "",
  note: parseInt("1"),
  dateCreation: dayjs().toISOString()
});

const stripHtmlTags = (input: string) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = input;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const submitComment = () => {
  const cleanedComment = stripHtmlTags(comment.value.commentPart);
  comment.value.commentPart = cleanedComment;

  v$.value.$touch();
  if (!v$.value.$invalid) {
    console.log(comment.value, "comment");

    setMovieComment(comment.value);
    allComments.value = getMovieComment(movieId);
    clear();
  } else {
    console.log("Formulaire invalide");
  }
};

const allComments = ref<CommentForm[]>([]);

const rules = {
  name: { required, minLength: minLength(3), maxLength: maxLength(50), alpha },
  commentPart: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(500)
  },
  note: { required, numeric, between: between(1, 10) }
};
const v$ = useVuelidate(rules, comment);

const clear = () => {
  v$.value.$reset();
  comment.value = {
    profilPicture: "https://thispersondoesnotexist.com/",
    name: "",
    commentPart: "",
    note: parseInt("1"),
    dateCreation: new Date().toISOString()
  };
};

onMounted(() => {
  allComments.value = getMovieComment(movieId);
});
</script>

<style scoped lang="scss">
.error-message {
  font-size: 0.8rem;
  color: red;
}
::v-deep .v-text-field {
  width: 50%;
  border-radius: 0.775rem;
}
.comments-area {
  width: 93vw;
  padding: 3vh 2vw;
  @include marginCenter(5vh);
  background: rgb(23, 23, 23);
  border-radius: 0.5rem;
  &__informations {
    @include flexGap(1rem);
  }
  &__submit-button-container {
    position: relative;
    bottom: 80px;
  }
  &__submit-button {
    position: absolute;
    right: 1rem;
    border-radius: 0.5rem;
    background: rgb(255, 145, 105);
    color: white;
    font-weight: $bold;
  }
  &__divider {
    @include marginCenter(5vh);
  }
}
</style>
