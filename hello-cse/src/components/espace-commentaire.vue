<template>
  <form>
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

    <div>
      <editor
        :api-key="MYSIWYG_API_KEY"
        v-model="comment.commentPart"
        @blur="v$.commentPart.$touch"
        @input="v$.commentPart.$touch"
        rules=""
        :init="{
          height: 500,
          menubar: false,
          plugins: 'lists link image code',
          toolbar:
            'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | code'
        }"
      ></editor>
      <div v-if="v$.commentPart.$error" class="error-message">
        {{ v$.commentPart.$errors[0].$message }}
      </div>
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

    <v-btn class="me-4" @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
  <div v-for="t in allComments" :key="t.id">
    <h3>{{ t }}</h3>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { alpha, between, maxLength, minLength, numeric, required } from "@vuelidate/validators";
import { CommentForm } from "@/models/commentInterface";
import Editor from "@tinymce/tinymce-vue";
import { MYSIWYG_API_KEY } from "@/constants/wysiwyg";
import { useMovieId } from "@/composables/UseMovieId";
import { useMovie } from "@/composables/UseMovie";

const movieId = useMovieId();
const { setMovieComment, getMovieComment } = useMovie();

const comment = ref<CommentForm>({
  id: movieId,
  name: "",
  commentPart: "",
  note: 1
});

const allComments = ref<CommentForm[]>([]);

const rules = {
  name: { required, minLength: minLength(3), maxLength: maxLength(50), alpha },
  commentPart: {
    required,
    // Du fait que le Wysiwyg créer des balises HTML en sortie ce qui fait qu'on
    //est déjà au dessus de 3 caractères avant de saisir quoi que ce soit
    minLength: minLength(3),
    maxLength: maxLength(500)
  },
  note: { required, numeric, between: between(1, 10) }
};
const v$ = useVuelidate(rules, comment);

const submit = () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    setMovieComment(comment.value);
    allComments.value = getMovieComment(movieId);
    clear();
  } else {
    console.log("Formulaire invalide");
  }
};

const clear = () => {
  v$.value.$reset();
  comment.value = {
    id: movieId,
    name: "",
    commentPart: "",
    note: 1
  };
};

onMounted(() => {
  allComments.value = getMovieComment(movieId);
});
</script>

<style scoped>
.error-message {
  font-size: 0.8rem;
  color: red;
}
</style>
