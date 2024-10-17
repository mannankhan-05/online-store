<template>
  <v-container>
    <!-- heading of admin panel -->
    <v-row justify="center" class="admin-heading">
      <v-col>
        <v-card elevation="3" class="pt-3 pb-3 rounded admin-panel-card">
          <h1 class="headline text-center">Admin Panel</h1>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6" sm="6" xs="10" class="d-flex justify-center">
        <v-sheet
          :height="170"
          :width="300"
          border
          class="sheet-button sheet1 fade-in"
        >
          <v-tooltip text="Add A Product" location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" @click="pushToAddProduct">mdi-plus</v-icon>
            </template>
          </v-tooltip>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="6" sm="6" xs="10" class="d-flex justify-center">
        <v-sheet
          :height="170"
          :width="300"
          border
          class="sheet-button sheet2 fade-in"
        >
          <v-tooltip text="See All Products" location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" @click="pushToAdminProducts"
                >mdi-view-list</v-icon
              >
            </template>
          </v-tooltip>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="6" sm="6" xs="10" class="d-flex justify-center">
        <v-sheet
          :height="170"
          :width="300"
          border
          class="sheet-button sheet3 fade-in"
        >
          <v-tooltip text="See All Users" location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" @click="gotoAllUsers"
                >mdi-account-multiple-outline</v-icon
              >
            </template>
          </v-tooltip>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="6" sm="6" xs="10" class="d-flex justify-center">
        <v-sheet
          :height="170"
          :width="300"
          border
          class="sheet-button sheet4 fade-in"
        >
          <v-tooltip text="View Orders" location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" @click="gotoAllOrders"
                >mdi-cart-arrow-down</v-icon
              >
            </template>
          </v-tooltip>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    pushToAddProduct() {
      this.$router.push({
        name: "addProduct",
        params: { userId: this.$store.state.userId },
      });
    },
    pushToAdminProducts() {
      this.$router.push({
        name: "adminProducts",
        params: { userId: this.$store.state.userId },
      });
    },
    gotoAllUsers() {
      this.$router.push({
        name: "allUsers",
        params: { userId: this.$store.state.userId },
      });
    },
    gotoAllOrders() {
      this.$router.push({
        name: "allOrders",
        params: { userId: this.$store.state.userId },
      });
    },
  },
});
</script>

<style scoped>
/* General styles */
.admin-heading {
  margin: 2rem 0;
  text-align: center;
}

.headline {
  font-size: 2rem;
  color: #1976d2;
  text-transform: uppercase;
}

/* Admin panel card */
.admin-panel-card {
  border-radius: 15px;
  animation: fadeInUp 0.5s ease-out;
}

/* Animation keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Sheet buttons */
.sheet-button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  border-radius: 20px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.sheet-button:hover {
  cursor: pointer;
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

/* Individual sheet button colors */
.sheet1 {
  background-color: #ff9800;
}

.sheet2 {
  background-color: #4caf50;
}

.sheet3 {
  background-color: #2196f3;
}

.sheet4 {
  background-color: #f44336;
}

/* Adding a delay for the fade-in animation */
.sheet1 {
  animation-delay: 0.1s;
}
.sheet2 {
  animation-delay: 0.2s;
}
.sheet3 {
  animation-delay: 0.3s;
}
.sheet4 {
  animation-delay: 0.4s;
}
</style>
