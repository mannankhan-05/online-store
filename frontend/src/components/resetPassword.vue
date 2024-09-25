<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="resetPasswordForm">
          <h2 class="mb-10">Password Reset</h2>
          <v-text-field
            clearable
            label="Password"
            :type="passwordVisible1 ? 'text' : 'password'"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            v-model="password"
          >
            <template v-slot:append-inner>
              <v-icon @click="passwordVisible1 = !passwordVisible1">
                {{
                  passwordVisible1 ? "mdi-eye-off-outline" : "mdi-eye-outline"
                }}
              </v-icon>
            </template></v-text-field
          >

          <v-text-field
            clearable
            label="Confirm Password"
            :type="passwordVisible2 ? 'text' : 'password'"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            v-model="confirmedPassword"
          >
            <template v-slot:append-inner>
              <v-icon @click="passwordVisible2 = !passwordVisible2">
                {{
                  passwordVisible2 ? "mdi-eye-off-outline" : "mdi-eye-outline"
                }}
              </v-icon>
            </template></v-text-field
          >
          <p v-if="!passwordLength" class="passwordLength">
            Password should be of atleast 8 characters Long
          </p>

          <div class="d-flex justify-center">
            <v-btn
              v-if="!loading"
              :disabled="!passwordLength"
              variant="tonal"
              class="resetPasswordButton mt-5 mb-5"
              @click="resetPassword"
            >
              Reset Password
            </v-btn>

            <v-btn variant="tonal" class="signInButton" v-if="loading">
              <v-progress-circular
                v-if="loading"
                indeterminate
                :width="5"
              ></v-progress-circular>
            </v-btn>
          </div>
        </div> </v-col
    ></v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "resetPassword",
  data() {
    return {
      passwordVisible1: false,
      passwordVisible2: false,
      password: "" as string,
      confirmedPassword: "" as string,
      loading: false as boolean,
    };
  },
  computed: {
    passwordLength() {
      return this.confirmedPassword.length >= 8;
    },
  },
  methods: {
    async resetPassword() {
      this.loading = true;
      if (this.password == this.confirmedPassword) {
        axios.put(
          `http://localhost:4000/resetPassword/${this.$route.params.userId}`,
          {
            password: this.confirmedPassword,
          }
        );
      } else {
        console.log("Passwords do not match");
      }
      this.loading = false;
    },
  },
});
</script>

<style>
.resetPasswordForm {
  margin: 0 auto;
  max-width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}

.resetPasswordButton {
  width: 50%;
  font-size: 17px;
  font-weight: 600;
}

.passwordLength {
  color: red;
  font-size: 13px;
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>
