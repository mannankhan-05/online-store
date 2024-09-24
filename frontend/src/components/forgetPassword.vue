<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="resetPassword">
          <h2 class="mb-10">Forget Password</h2>
          <v-text-field
            clearable
            label="Email"
            variant="outlined"
            prepend-inner-icon="mdi-email"
            v-model="email"
          ></v-text-field>
          <p v-if="!emailFormat" class="validEmail">
            Email should contain @ and .
          </p>

          <div class="d-flex justify-center">
            <v-btn
              v-if="!loading"
              variant="tonal"
              class="resetButton mt-5 mb-5"
              @click="sendVerificationCode"
            >
              Send Verification Code
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
      loading: false,
    };
  },
  methods: {
    sendVerificationCode() {
      this.loading = true;
    },
  },
  computed: {
    emailFormat() {
      return this.email.includes("@") && this.email.includes(".");
    },
  },
});
</script>

<style>
.resetPassword {
  margin: 0 auto;
  max-width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}

.resetButton {
  width: 80%;
  font-size: 15px;
  font-weight: 550;
}

.validEmail {
  color: red;
  font-size: 13px;
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>
