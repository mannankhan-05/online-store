<template>
  <v-container class="mb-0">
    <v-row>
      <v-col>
        <v-app-bar
          scroll-behavior="fade-image inverted"
          scroll-threshold="0"
          image="https://picsum.photos/1920/1080?random"
        >
          <router-link :to="{ name: 'home' }">
            <img class="logo" :src="require('../assets/logo.png')" />
          </router-link>

          <v-spacer></v-spacer>

          <!-- Cart logo -->
          <router-link
            :to="{ name: 'cart', params: { userId: this.$store.state.userId } }"
          >
            <v-btn icon class="cartIconButton">
              <v-icon class="cartIcon">mdi-cart-outline</v-icon>
            </v-btn>
          </router-link>

          <!-- Login and Register buttons -->
          <div class="d-none d-sm-flex" v-if="!isLoggedIn">
            <router-link :to="{ name: 'login' }">
              <v-btn
                variant="tonal"
                class="loginButton bg-black mr-5 font-weight-bold"
              >
                Login
              </v-btn>
            </router-link>

            <router-link :to="{ name: 'signUp' }">
              <v-btn
                variant="tonal"
                class="registerButton bg-black mr-8 font-weight-bold"
              >
                Sign Up
              </v-btn>
            </router-link>
          </div>

          <!-- Avatar for logged in users -->
          <div v-if="isLoggedIn" class="avatar">
            <v-menu
              v-model="showAvatarMenu"
              offset-y
              right
              transition="slide-y-transition"
              class="d-flex flex-row-reverse mt-15 mr-3"
            >
              <!-- Avatar that triggers the menu -->
              <template v-slot:activator="{ on, attrs }">
                <v-avatar
                  color="surface-variant"
                  :image="avatarImage"
                  size="53"
                  class="mr-5"
                  v-bind="attrs"
                  v-on="on"
                  @click="showAvatarMenu = !showAvatarMenu"
                ></v-avatar>
              </template>

              <!-- Menu Content (options like Edit Profile, Logout) -->
              <v-list>
                <v-list-item>
                  <v-list-item-title>{{ userName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item @click="editProfile">
                  <v-list-item-title
                    ><v-btn variant="text">Edit</v-btn></v-list-item-title
                  >
                </v-list-item>

                <v-list-item @click="logoutUser">
                  <v-list-item-title
                    ><v-btn variant="text">Logout</v-btn></v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <!-- menu bar for smaller screens -->
          <div
            class="d-flex d-sm-none"
            @click="showMenu = !showMenu"
            v-if="!isLoggedIn"
          >
            <v-menu
              v-model="showMenu"
              offset-y
              bottom
              left
              transition="slide-y-transition"
              class="d-flex d-sm-none"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  variant="text"
                  class="bg-blue-grey-lighten-5 mr-7"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <router-link :to="{ name: 'login' }">
                    <v-list-item-title><v-btn>Login</v-btn></v-list-item-title>
                  </router-link>
                  <router-link :to="{ name: 'signUp' }">
                    <v-list-item-title><v-btn>SignUp</v-btn></v-list-item-title>
                  </router-link>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-app-bar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      showMenu: false as boolean,
      showAvatarMenu: false as boolean,
    };
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("logoutUser", {
        router: this.$router,
      });
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isUserLoggedIn;
    },
    avatarImage() {
      const userImage = this.$store.state.userImage;
      if (userImage) {
        // constructing a url for the user image
        return `http://localhost:4000/userImages/${userImage}`;
      } else {
        return "";
      }
    },
    userName() {
      return this.$store.state.userName;
    },
    userEmail() {
      return this.$store.state.userEmail;
    },
  },
});
</script>

<style>
.logo {
  width: 55px;
  height: 55px;
  margin-left: 20px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  display: flex;
}

.logo:hover {
  cursor: pointer;
}

.loginButton,
.registerButton {
  border: 1px solid white;
  transition: 1s ease-in-out;
}

.loginButton:hover,
.registerButton:hover {
  border: none;
  background-color: white;
  color: black;
}

.avatar:hover {
  cursor: pointer;
}

/* Cart Button */
.cartIconButton {
  display: inline-flex;
  margin-right: 23px;
  background-color: #424242; /* Dark background for the button */
  border-radius: 50%; /* Circular button */
  padding: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease; /* Smooth transition */
  display: flex;
  justify-content: center;
  align-items: center;
}

.cartIconButton:hover {
  background-color: #ff9800; /* Orange color on hover */
  transform: scale(1.1); /* Slight zoom effect on hover */
}

/* Cart Icon */
.cartIcon {
  width: 45px; /* Reduced size for a sleeker look */
  height: 45px;
  color: white; /* Icon color */
  transition: color 0.3s ease; /* Smooth color transition */
}

.cartIconButton:hover .cartIcon {
  color: #000; /* Change icon color on hover */
}
</style>
