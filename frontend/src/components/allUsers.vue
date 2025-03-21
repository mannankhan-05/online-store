<template>
  <v-container>
    <!-- Back Button -->
    <v-tooltip text="Back To Panel" location="top">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          class="backButton d-none d-sm-flex mb-5"
          icon
          @click="this.$router.go(-1)"
          elevation="0"
        >
          <v-icon large>mdi-menu-left</v-icon>
        </v-btn>
      </template>
    </v-tooltip>

    <!-- Seach User -->
    <v-row justify="center">
      <v-col cols="12" md="8" sm="8" xs="10">
        <div class="rounded-input-container mb-5">
          <input
            type="text"
            class="rounded-input"
            placeholder="Search To Find Users"
            v-model="search"
          />
          <v-icon class="search-icon" left>mdi-magnify-minus-outline</v-icon>
          <v-icon class="search-icon-right">mdi-send-circle-outline</v-icon>
        </div>
      </v-col>
    </v-row>

    <!-- total no. of users -->
    <v-row justify="center">
      <v-card elevation="4" class="mb-5 pt-2 pb-2 pl-5 pr-5">
        <p>
          Total Users : <strong>{{ users.length }}</strong>
        </p>
      </v-card>
    </v-row>

    <!-- Displaying the empty icon if the searched user doesn't exists -->
    <v-empty-state
      v-if="searchUsers.length === 0"
      icon="mdi-magnify"
      title="We couldn't find a match."
      text="We couldn't find any user that matches your search"
    ></v-empty-state>

    <!-- All Users -->
    <v-row justify="center">
      <v-col
        cols="12"
        lg="2"
        md="3"
        sm="3"
        xs="3"
        v-for="user in searchUsers"
        :key="user.id"
      >
        <v-card elevation="4" class="users-card mb-4">
          <v-card-title class="pa-0">
            <v-img
              size="150"
              :src="user.image"
              class="img mb-3"
              height="80"
            ></v-img>
            <div class="pl-3">
              <h5>{{ user.name }}</h5>
              <p class="text-caption">{{ user.email }}</p>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle class="pa-4">
            <div>
              <strong>Status: </strong>
              <v-chip :color="user.isAdmin ? 'green' : 'blue'" dark small>
                {{ user.isAdmin ? "admin" : "user" }}
              </v-chip>
            </div>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "../api/axiosInstance";

export default defineComponent({
  data() {
    return {
      users: [] as object[],
      search: "" as string,
    };
  },
  async mounted() {
    let response = await axiosInstance.get("/users");
    this.users = response.data;
  },
  computed: {
    searchUsers: function () {
      return this.users.filter((user: any) => {
        return user.name.match(this.search);
      });
    },
  },
});
</script>

<style scoped>
.users-card {
  border-radius: 10px;
  height: 200px;
}

.img {
  width: 100%;
}
</style>
