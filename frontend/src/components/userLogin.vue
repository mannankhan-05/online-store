<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="loginForm">
          <h2 class="mb-10">Login</h2>
          <v-text-field
            clearable
            label="Email"
            variant="outlined"
            prepend-inner-icon="mdi-email"
            v-model="email"
          ></v-text-field>
          <v-text-field
            clearable
            label="Password"
            :type="passwordVisible ? 'text' : 'password'"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            v-model="password"
          >
            <template v-slot:append-inner>
              <v-icon @click="passwordVisible = !passwordVisible">
                {{
                  passwordVisible ? "mdi-eye-off-outline" : "mdi-eye-outline"
                }}
              </v-icon>
            </template></v-text-field
          >

          <v-checkbox
            v-model="terms"
            label="I accept the terms and conditions"
          ></v-checkbox>

          <div class="d-flex justify-center">
            <v-btn
              v-if="!loading"
              :disabled="!email || !password"
              variant="tonal"
              class="loginButton"
              @click="registerUser"
            >
              Login
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

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      passwordVisible: false,
    };
  },
});
</script>

<style scoped>
.loginForm {
  margin: 0 auto;
  max-width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}

.loginButton {
  width: 50%;
  font-size: 19px;
  font-weight: 600;
}
</style>
