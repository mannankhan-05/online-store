<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="signUpForm">
          <h2>SignUp</h2>
          <v-text-field
            clearable
            label="Label"
            variant="outlined"
          ></v-text-field>
          <v-file-input
            clearable
            label="File input"
            variant="outlined"
          ></v-file-input>
          <v-text-field
            clearable
            label="Label"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            clearable
            label="Label"
            variant="outlined"
          ></v-text-field>
        </div> </v-col
    ></v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      first: "",
      last: "",
      email: "",
      password: "",
      terms: false,
    };
  },
});
</script>

<style scoped></style>
