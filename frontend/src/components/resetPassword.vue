<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="resetPasswordForm" :elevation="8">
          <h1 class="password-reset-heading mb-10">Password Reset</h1>
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
            New Password should be of atleast 8 characters Long
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
        </v-card> </v-col
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
  background-color: rgb(117, 66, 15);
  margin: 0 auto;
  max-width: 100%;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}

.password-reset-heading {
  color: white;
  display: flex;
  justify-content: center;
}

.resetPasswordButton {
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  border-radius: 30px;
  color: rgb(100, 50, 0) !important;
  border: none;
  background-color: white;
  transition: 0.3s ease-in-out;
}

.resetPasswordButton:hover {
  background-color: rgb(212, 164, 75);
  color: white !important;
}

.v-text-field {
  margin-top: 20px;
  color: white;
  font-size: 22px;
}

.passwordLength {
  color: rgb(150, 122, 122);
  font-size: 13px;
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>
