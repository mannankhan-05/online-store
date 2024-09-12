<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="signUpForm">
          <h2 class="mb-10">SignUp</h2>
          <v-text-field
            clearable
            label="Name"
            variant="outlined"
            prepend-inner-icon="mdi-account"
            v-model="name"
          ></v-text-field>
          <v-file-input
            clearable
            label="Picture"
            variant="outlined"
            prepend-inner-icon="mdi-camera"
            v-model="image"
            @change="handleFileChange($event)"
          >
            <template v-slot:selection="{ text }">
              <v-avatar v-if="imageUrl" size="30" class="mr-3 rounded">
                <img :src="imageUrl" alt="Selected Image" />
              </v-avatar>
              {{ text }}
            </template>
          </v-file-input>
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
              :disabled="!name || !image || !email || !password"
              variant="tonal"
              class="signInButton"
              @click="registerUser"
            >
              Sign Up
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
      name: "",
      image: "",
      imageUrl: "",
      email: "",
      password: "",
      terms: false,
      loading: false,
      passwordVisible: false,
    };
  },
  methods: {
    async registerUser() {
      this.loading = true;
      const { name, image, email, password } = this;

      try {
        await this.$store.dispatch("registerUser", {
          name,
          image,
          email,
          password,
        });

        this.name = "";
        this.image = "";
        this.imageUrl = "";
        this.email = "";
        this.password = "";
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    handleFileChange(event: any) {
      const file = event.target.files[0];
      if (file && file instanceof File) {
        this.imageUrl = URL.createObjectURL(file);
      } else {
        this.imageUrl = "";
      }
    },
  },
});
</script>

<style scoped>
.signUpForm {
  margin: 0 auto;
  max-width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}

.signInButton {
  width: 50%;
  font-size: 19px;
  font-weight: 600;
}
</style>
