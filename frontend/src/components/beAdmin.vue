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
        <v-col cols="6" class="text-right">
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
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "beAdmin",
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
  width: 260px;
  height: 260px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.userImage {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
