<template>
  <form>
    <v-text-field
      v-model="comment.name"
      :counter="10"
      label="Nom d'utilisateur"
      :error-messages="v$.name.$errors.map((e) => e.$message)"
      required
      @blur="v$.name.$touch"
      @input="v$.name.$touch"
    ></v-text-field>

    <v-text-field
      v-model="comment.commentPart"
      label="Comment"
      :error-messages="v$.commentPart.$errors.map((e) => e.$message)"
      required
      @blur="v$.commentPart.$touch"
      @input="v$.commentPart.$touch"
    ></v-text-field>

    <v-text-field
      v-model="comment.note"
      label="Note"
      :error-messages="v$.note.$errors.map((e) => e.$message)"
      required
      @blur="v$.note.$touch"
      @input="v$.note.$touch"
    ></v-text-field>
    <v-btn class="me-4" @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { alpha, alphaNum, between, maxLength, minLength, numeric, required } from "@vuelidate/validators";
import { CommentForm } from "@/models/commentInterface";

const comment = ref<CommentForm>({
  name: "",
  commentPart: "",
  note: 1
});

const rules = {
  name: { required, minLength: minLength(3), maxLength: maxLength(50), alpha },
  commentPart: { required, minLength: minLength(3), maxLength: maxLength(500), alphaNum },
  note: { required, numeric, between: between(1, 10) }
};
const v$ = useVuelidate(rules, comment);

function submit() {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    // Si valide, on envoie les données
    console.log("Formulaire valide :", comment.value);
  } else {
    console.log("Formulaire invalide");
  }
}

const clear = () => {
  v$.value.$reset();
  comment.value = {
    name: "",
    commentPart: "",
    note: 1
  };
};
</script>

<style scoped></style>
