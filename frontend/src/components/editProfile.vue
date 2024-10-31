<template>
  <v-container>
    <!-- Header Section -->
    <v-row justify="center">
      <v-col cols="12" md="6" sm="8">
        <h2 class="header-title">User Profile Management</h2>
        <v-divider :thickness="2" class="border-opacity-50"></v-divider>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6" sm="8">
        <v-card class="edit-profile-card" :elevation="8">
          <v-card-title class="edit-profile-title">Edit Profile</v-card-title>
          <v-text-field
            clearable
            label="Name"
            variant="outlined"
            prepend-inner-icon="mdi-account"
            v-model="name"
          ></v-text-field>
          <v-file-input
            clearable
            name="userImage"
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
            placeholder="Email should contain @ and ."
            variant="outlined"
            prepend-inner-icon="mdi-email"
            v-model="email"
          ></v-text-field>

          <v-text-field
            clearable
            label="Leave the password empty if you don't want to change it"
            placeholder="Password should be at least 8 characters long"
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
            </template>
          </v-text-field>

          <div class="button-container">
            <v-btn
              v-if="!loading"
              :disabled="updateButtonDisabled"
              variant="contained"
              class="edit-profile-button"
              @click="editUser"
            >
              Update
            </v-btn>

            <v-btn variant="contained" class="loading-button" v-if="loading">
              <v-progress-circular
                v-if="loading"
                indeterminate
                :width="5"
                color="white"
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
      passwordVisible: false,
      loading: false,
    };
  },
  methods: {
    async editUser() {
      this.loading = true;
      const { name, image, email, password } = this;

      try {
        await this.$store.dispatch("editUser", {
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
    emailFormat() {
      return this.email.includes("@") && this.email.includes(".");
    },
    passwordLength() {
      return this.password.length >= 8;
    },
    updateButtonDisabled() {
      return !this.name || !this.image || !this.email || !this.emailFormat;
    },
  },
});
</script>

<style scoped>
.header-title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: rgba(32, 93, 114, 1);
}

.edit-profile-card {
  background-color: rgba(32, 93, 114, 0.85);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.edit-profile-title {
  text-align: center;
  font-size: 28px;
  color: white;
  font-weight: 700;
  margin-bottom: 20px;
}

.v-text-field,
.v-file-input {
  margin-bottom: 20px;
  color: white;
  font-size: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
}

.edit-profile-button {
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  color: black;
  border: none;
  background-color: white;
  transition: 0.3s ease-in-out;
}

.edit-profile-button:hover {
  background-color: rgba(91, 115, 124, 0.85);
  color: white;
}

.loading-button {
  width: 100%;
  justify-content: center;
}
</style>
