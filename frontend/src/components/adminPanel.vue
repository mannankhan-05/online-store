<template>
  <v-container>
    <!-- heading of admin panel -->
    <v-row justify="center" class="admin-heading">
      <v-col>
        <v-card elevation="3" class="pt-3 pb-3 rounded">
          <h1 class="headline text-center">Admin Panel</h1>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6" sm="6" xs="10" class="d-flex justify-center">
        <v-sheet :height="170" :width="300" border class="sheet-button sheet1">
          <v-tooltip text="Add A Product" location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props">mdi-plus</v-icon>
            </template>
          </v-tooltip>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="6" sm="6" xs="10" class="d-flex justify-center">
        <v-sheet :height="170" :width="300" border class="sheet-button sheet2">
          <v-tooltip text="See All Product" location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props">mdi-view-list</v-icon>
            </template>
          </v-tooltip>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="6" sm="6" xs="10" class="d-flex justify-center">
        <v-sheet :height="170" :width="300" border class="sheet-button sheet3">
          <v-tooltip text="See All Users" location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props">mdi-account-multiple-outline</v-icon>
            </template>
          </v-tooltip>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="6" sm="6" xs="10" class="d-flex justify-center">
        <v-sheet :height="170" :width="300" border class="sheet-button sheet4">
          <v-tooltip text="View Orders" location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props">mdi-cart-arrow-down</v-icon>
            </template>
          </v-tooltip>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
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

.sheet-button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  border-radius: 20px;
  transition: 0.3s ease-in-out;
}

.sheet-button:hover {
  cursor: pointer;
  transform: scale(1.03);
}

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
</style>
