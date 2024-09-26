<template>
  <div>
    <nav>
      <h1>NETFLIX</h1>
      <router-link to="/">Home</router-link>
      <v-container id="input-usage" fluid>
        <v-row>
          <v-col cols="12">
            <v-input :messages="['Messages']" append-icon="mdi-close" prepend-icon="mdi-phone">Default Slot</v-input>
          </v-col>
        </v-row>
      </v-container>
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
