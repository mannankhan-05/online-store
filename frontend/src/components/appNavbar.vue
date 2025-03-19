<template>
  <v-container class="mb-0">
    <v-row>
      <v-col>
        <v-app-bar
          scroll-behavior="fade-image inverted"
          scroll-threshold="0"
          class="navbar-background"
        >
          <router-link :to="{ name: 'home' }">
            <img class="logo" :src="require('../assets/storeLogo.png')" />
          </router-link>
          <h1 class="nex-cart-heading d-none d-sm-flex">NexCart</h1>

          <v-spacer></v-spacer>

          <!-- orders logo -->
          <router-link
            v-if="isLoggedIn && this.$store.state.userId"
            :to="{
              name: 'userAllOrders',
              params: { userId: this.$store.state.userId },
            }"
          >
            <v-btn
              icon
              v-if="isLoggedIn"
              class="cartIconButton d-none d-sm-flex"
            >
              <v-icon class="cartIcon">mdi-view-list</v-icon>
            </v-btn>
          </router-link>

          <!-- Cart logo -->
          <router-link
            v-if="isLoggedIn && this.$store.state.userId"
            :to="{ name: 'cart', params: { userId: this.$store.state.userId } }"
          >
            <v-btn icon v-if="isLoggedIn" class="cartIconButton">
              <v-badge
                v-if="this.$store.state.showCartBadge"
                :content="this.$store.state.userProductsInCart.length"
                :value="0"
                color="red"
                overlap
                offset-x="0"
                offset-y="0"
                class="cartBadge"
              >
                <v-icon class="cartIcon">mdi-cart-outline</v-icon>
              </v-badge>
              <v-icon v-else class="cartIcon">mdi-cart-outline</v-icon>
            </v-btn>
          </router-link>

          <!-- Login and Register buttons -->
          <div class="d-none d-sm-flex" v-if="!isLoggedIn">
            <router-link :to="{ name: 'login' }">
              <v-btn class="loginButton mr-5 font-weight-bold">
                <v-icon class="mr-2">mdi-login</v-icon>
                Login
              </v-btn>
            </router-link>

            <router-link :to="{ name: 'signUp' }">
              <v-btn
                variant="text"
                class="registerButton mr-8 font-weight-bold"
              >
                <v-icon class="mr-2">mdi-account-plus</v-icon>
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
                  <v-row justify="center">
                    <v-col cols="3">
                      <v-list-item-avatar>
                        <v-avatar
                          class="avatarBorder"
                          :size="60"
                          :color="avatarColor"
                        >
                          <v-img :src="avatarImage"></v-img>
                        </v-avatar>
                      </v-list-item-avatar>
                    </v-col>
                    <v-col cols="9">
                      <v-list-item-title class="ml-3">{{
                        userName
                      }}</v-list-item-title>
                      <v-list-item-subtitle class="ml-3">{{
                        userEmail
                      }}</v-list-item-subtitle>
                      <!-- admin badge -->
                      <div v-if="isAdmin" class="adminBadge">
                        <v-icon class="pr-2">mdi-security</v-icon>
                        admin
                      </div>
                      <div v-if="!isAdmin" class="adminBadge">
                        <v-icon class="pr-2">mdi-account-outline</v-icon>
                        user
                      </div>
                    </v-col>
                  </v-row>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item @click="editProfile">
                  <v-list-item-title>
                    <v-icon class="mr-2">mdi-account-edit-outline</v-icon>
                    Edit Profile</v-list-item-title
                  >
                </v-list-item>

                <v-list-item @click="gotoAllOrders" class="d-flex d-sm-none">
                  <v-list-item-title>
                    <v-icon class="mr-2">mdi-view-list</v-icon>
                    Your Orders</v-list-item-title
                  >
                </v-list-item>

                <v-list-item @click="logoutDialog = true">
                  <v-list-item-title>
                    <v-icon class="mr-2">mdi-logout</v-icon>
                    Logout</v-list-item-title
                  >
                </v-list-item>
                <v-list-item class="list" v-if="!isAdmin">
                  <v-btn @click="gotoAdminComponent" class="adminPanelButton">
                    <v-icon class="mr-3"
                      >mdi-arrow-top-right-thin-circle-outline</v-icon
                    >
                    Be Admin</v-btn
                  >
                </v-list-item>
                <v-list-item class="list" v-if="isAdmin">
                  <v-btn @click="gotoAdminPanel" class="adminPanelButton">
                    <v-icon class="mr-3"
                      >mdi-arrow-top-right-thin-circle-outline</v-icon
                    >
                    Admin Panel</v-btn
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

    <!-- Logout Dialog -->
    <v-row justify="center">
      <v-col cols="12" xs="12" sm="8" md="4">
        <v-dialog v-model="logoutDialog" max-width="440">
          <v-card class="pa-3 elevation-5">
            <v-card-title
              class="d-flex justify-center text-h5 font-weight-bold"
            >
              <v-icon color="orange">mdi-logout</v-icon>
              Logout
            </v-card-title>
            <p class="d-flex justify-center pl-3 mb-3 mt-7">
              Are you sure you want to logout from your account ?
            </p>
            <v-divider class="mt-3 mb-7"></v-divider>
            <v-btn
              class="mb-3"
              variant="outlined"
              color="orange"
              text
              @click="logoutDialog = false"
            >
              Cancel
            </v-btn>
            <v-btn class="logoutButton" text @click="logoutUser">
              Logout
            </v-btn>
          </v-card>
        </v-dialog>
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
      logoutDialog: false as boolean,
    };
  },
  methods: {
    async logoutUser() {
      await this.$store.dispatch("logoutUser", {
        router: this.$router,
      });
      this.logoutDialog = false;
    },
    editProfile() {
      this.$router.push({
        name: "editProfile",
        params: { userId: this.$store.state.userId },
      });
    },
    gotoCart() {
      this.$router.push({
        name: "cart",
        params: { userId: this.$store.state.userId },
      });
    },
    gotoAllOrders() {
      this.$router.push({
        name: "userAllOrders",
        params: { userId: this.$store.state.userId },
      });
    },
    gotoAdminComponent() {
      this.$router.push({
        name: "beAdmin",
        params: { userId: this.$store.state.userId },
      });
    },
    gotoAdminPanel() {
      this.$router.push({
        name: "adminPanel",
        params: { userId: this.$store.state.userId },
      });
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isUserLoggedIn;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    },
    avatarImage() {
      const userImage = this.$store.state.userImage;
      if (userImage) {
        // constructing a url for the user image
        return `https://online-store-production-16af.up.railway.app/userImages/${userImage}`;
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
.navbar-background {
  background-color: #e3e6e9 !important;
  color: white;
}

.logo {
  width: 55px;
  height: 55px;
  margin-left: 20px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  display: flex;
  transition: 0.3s ease-in-out;
}

.logo:hover {
  cursor: pointer;
  transform: scale(1.04);
}

.nex-cart-heading {
  margin-top: 30px;
  margin-left: 7px;
  color: rgb(168, 123, 39);
}

.loginButton {
  background-color: rgb(192, 152, 79);
  border-radius: 30px;
  color: white !important;
}

.registerButton {
  color: rgb(192, 152, 79) !important;
}

.loginButton,
.registerButton {
  transition: 0.2s ease-in-out;
}

.loginButton:hover,
.registerButton:hover {
  transform: scale(1.03);
}

.avatar:hover {
  cursor: pointer;
}

.avatarBorder {
  border: 1px solid rgb(78, 76, 76);
  margin-right: 10px;
}

.cartIconButton {
  display: inline-flex;
  margin-right: 23px;
  background-color: #424242;
  border-radius: 50%;
  padding: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease; /* Smooth transition */
  display: flex;
  justify-content: center;
  align-items: center;
}

.cartIconButton:hover {
  background-color: #ff9800;
  transform: scale(1.07);
}

.cartIcon {
  width: 45px;
  height: 45px;
  color: white;
  transition: color 0.3s ease;
}

.cartIconButton:hover .cartIcon {
  color: #000;
}

.adminPanelButton {
  background: orange;
  color: black;
  width: 100%;
  transition: 0.3s ease-in-out;
}

.adminPanelButton:hover {
  transform: scale(1.04);
  color: white;
}

.adminBadge {
  margin-top: 4px;
  margin-bottom: 4px;
  width: 100px;
  height: 25px;
  border: 1px solid rgb(68, 66, 66);
  color: black;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 26px;
  padding: 5px;
  margin-left: 10px;
}

.logoutButton {
  background-color: orange;
  color: black;
  transition: 0.3s ease-in-out;
}

.logoutButton:hover {
  color: white;
}
</style>
