<template>
  <v-container>
    <!-- heading of admin -->
    <v-row justify="center" class="admin-heading">
      <v-col>
        <v-card elevation="8" class="pt-6 pb-6">
          <h1 class="headline text-center">Be Admin</h1>
          <v-divider></v-divider>
          <p class="subheading text-center">
            Manage Users, Products, and Orders Efficiently
          </p>
        </v-card>
      </v-col>
    </v-row>

    <!-- display the user's info -->
    <div>
      <v-row justify="end">
        <v-col cols="6">
          <v-card elevation="8">
            <v-card-title class="headline">User Information</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Name</v-list-item-title>
                    <v-list-item-subtitle>{{
                      this.$store.state.userName
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Email</v-list-item-title>
                    <v-list-item-subtitle>{{
                      this.$store.state.userEmail
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" class="d-flex justify-end">
          <v-card elevation="8" class="userImageCard">
            <img
              :src="`http://localhost:4000/userImages/${this.$store.state.userImage}`"
              alt=""
              class="userImage"
            />
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-divider class="bg-black-darken-2 mt-8 mb-3" :thickness="3"></v-divider>
    <v-divider :thickness="3" class="mb-8"></v-divider>

    <!-- to send the verification code -->
    <v-row justify="center">
      <v-col cols="12" md="5" sm="6">
        <v-card elevation="8">
          <v-card-title class="headline">Send Verification Code</v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="10">
                  <v-text-field
                    v-model="userEmail"
                    label="Email"
                    outlined
                    required
                    :disabled="editEmailButtonDisabled"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <div class="container-email-edit-icon">
                    <v-icon
                      class="email-edit-icon"
                      @click="toggleEmailEditButton"
                    >
                      mdi-email-edit-outline
                    </v-icon>
                  </div>
                </v-col>
              </v-row>
              <v-btn
                v-if="!loading"
                color="primary"
                @click="sendAdminCode"
                class="mt-4"
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
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "beAdmin",
  data() {
    return {
      editEmailButtonDisabled: true,
      loading: false,
    };
  },
  computed: {
    // to get the user's email
    userEmail() {
      return this.$store.state.userEmail;
    },
  },
  methods: {
    toggleEmailEditButton() {
      this.editEmailButtonDisabled = !this.editEmailButtonDisabled;
    },
    async sendAdminCode() {
      this.loading = true;
      if (this.userEmail !== this.$store.state.userEmail) {
        this.$store.dispatch("editUserEmail", this.userEmail);
        console.log("email updated");

        // send the verification code to the edited email
      } else {
        // send the verification code to the user's email
      }
      this.loading = false;
    },
  },
});
</script>

<style scoped>
.admin-heading {
  margin: 2rem 0;
  text-align: center;
}

.headline {
  font-size: 2rem;
  color: #1976d2;
}

.subheading {
  font-size: 1.2rem;
  color: #555;
}

.userImageCard {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.userImage {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.container-email-edit-icon {
  position: absolute;
  top: 75px;
}

.email-edit-icon {
  font-size: 2.5rem;
  color: black;
  transition: 0.3s ease-in-out;
}

.email-edit-icon:hover {
  cursor: pointer;
  color: rgb(39, 39, 196);
}
</style>
