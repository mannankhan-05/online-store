<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" sm="8">
        <v-card max-width="600" class="addProductForm pa-5 elevation-5">
          <v-card-title class="title text-h5 font-weight-bold text-center mb-4">
            Edit Profile
          </v-card-title>
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
            placeholder="Password should be of atleast 8 characters Long"
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

          <div class="d-flex justify-center">
            <v-btn
              v-if="!loading"
              :disabled="updateButtonDisabled"
              variant="tonal"
              class="editProfileButton mt-4 mb-4"
              @click="editUser"
            >
              Update
            </v-btn>

            <v-btn variant="tonal" class="editProfileButton" v-if="loading">
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

export default defineComponent({
  data() {
    return {
      name: "" as string,
      image: "" as string,
      imageUrl: "" as string,
      email: "" as string,
      password: "" as string,
      passwordVisible: false as boolean,
      loading: false as boolean,
    };
  },
  // async mounted() {
  // let response = await axios.get(
  //   `http://localhost:4000/user/${this.$route.params.userId}`
  // );
  // console.log(response.data);
  // this.name = response.data.name;
  // this.image = response.data.image;
  // this.email = response.data.email;

  // if (response.data.image) {
  // this.imageUrl = response.data.image;
  // }
  // },
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
      // const formData = new FormData();
      // formData.append("name", this.name);
      // formData.append("userImage", this.image);
      // formData.append("email", this.email);
      // formData.append("password", this.password);

      // try {
      //   this.loading = true;

      //   await axios.put(
      //     `http://localhost:4000/editUser/${this.$route.params.userId}`,
      //     formData,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     }
      //   );
      //   this.loading = false;
      // } catch (err) {
      //   console.log("Error at updating the user information : ", err);
      // }
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
.editProfileForm {
  margin: 0 auto;
  max-width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}

.editProfileButton {
  width: 50%;
  font-size: 19px;
  font-weight: 600;
}

.passwordLength {
  color: red;
  font-size: 13px;
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>
