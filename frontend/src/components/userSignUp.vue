<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="signUpForm" :elevation="8">
          <h2 class="signUp-title">Sign Up</h2>
          <v-text-field
            clearable
            label="Name"
            variant="outlined"
            prepend-inner-icon="mdi-account"
            v-model="name"
            class="text-field-color"
          ></v-text-field>
          <v-file-input
            clearable
            name="userImage"
            label="Picture"
            variant="outlined"
            prepend-inner-icon="mdi-camera"
            v-model="image"
            class="text-field-color"
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
            placeholder="Email should contain @ and ."
            variant="outlined"
            prepend-inner-icon="mdi-email"
            v-model="email"
            class="text-field-color"
          ></v-text-field>
          <v-text-field
            clearable
            label="Password"
            placeholder="Password should be at least 8 characters"
            :type="passwordVisible ? 'text' : 'password'"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            v-model="password"
            class="text-field-color"
          >
            <template v-slot:append-inner>
              <v-icon @click="passwordVisible = !passwordVisible">
                {{
                  passwordVisible ? "mdi-eye-off-outline" : "mdi-eye-outline"
                }}
              </v-icon>
            </template>
          </v-text-field>
          <div class="button-container">
            <v-btn
              :disabled="signUpButtonDisabled"
              variant="contained"
              class="signUpButton"
              @click="registerUser"
            >
              <span v-if="!loading">Sign Up</span>
              <v-progress-circular
                v-if="loading"
                indeterminate
                :width="5"
                color="primary"
              ></v-progress-circular>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
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
          router: this.$router,
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
  computed: {
    passwordLength() {
      return this.password.length >= 8;
    },
    emailFormat() {
      return this.email.includes("@") && this.email.includes(".");
    },
    signUpButtonDisabled() {
      return (
        !this.name ||
        !this.image ||
        !this.email ||
        !this.password ||
        !this.passwordLength ||
        !this.emailFormat
      );
    },
  },
});
</script>

<style scoped>
.signUpForm {
  background-color: rgb(117, 66, 15); /* Matching theme */
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.signUp-title {
  text-align: center;
  font-size: 28px;
  color: white;
  font-weight: 700;
  margin-bottom: 20px;
}

.v-text-field,
.v-file-input {
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
}

.signUpButton {
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  border-radius: 30px;
  color: rgb(100, 50, 0);
  background-color: white;
  transition: 0.3s ease-in-out;
}

.signUpButton:hover {
  background-color: rgb(212, 164, 75) !important;
  color: white;
}

.v-text-field,
.v-file-input {
  margin-bottom: 20px;
  color: white;
  font-size: 20px;
}

.signUpButton:hover {
  background-color: rgb(221, 215, 215);
  transition: 0.3s ease-in-out;
}

.loadingButton {
  width: 100%;
  justify-content: center;
}

.text-field-color {
  color: #ffcc00 !important;
  font-weight: bold;
}
</style>
