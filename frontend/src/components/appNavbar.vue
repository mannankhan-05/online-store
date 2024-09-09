<template>
  <v-container class="mb-15">
    <v-row>
      <v-col>
        <v-app-bar
          scroll-behavior="fade-image inverted"
          scroll-threshold="0"
          image="https://picsum.photos/1920/1080?random"
        >
          <router-link :to="{ name: 'home' }">
            <img class="logo" :src="logo" />
          </router-link>

          <v-spacer></v-spacer>

          <div class="d-none d-sm-flex">
            <router-link :to="{ name: 'login' }">
              <v-btn variant="tonal" class="bg-black mr-5 font-weight-bold">
                Login
              </v-btn>
            </router-link>

            <router-link :to="{ name: 'signUp' }">
              <v-btn variant="tonal" class="bg-black mr-8 font-weight-bold">
                Sign Up
              </v-btn>
            </router-link>
          </div>

          <div class="d-flex d-sm-none" @click="showMenu = !showMenu">
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
import logo from "../assets/logo.png";

export default defineComponent({
  data() {
    return {
      logo,
      showMenu: false as boolean,
    };
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
</style>
