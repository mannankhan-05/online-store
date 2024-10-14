<template>
  <v-container>
    <!-- Back Button -->
    <v-tooltip text="Back To Panel" location="top">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          class="backButton d-none d-sm-flex mb-3"
          icon
          @click="this.$router.go(-1)"
          elevation="0"
        >
          <v-icon large>mdi-menu-left</v-icon>
        </v-btn>
      </template>
    </v-tooltip>

    <!-- Product that admin can update or delete -->
    <v-row justify="center">
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        md="3"
        sm="5"
        xs="5"
      >
        <v-card class="productCard mx-auto" max-width="400">
          <v-img class="productImage" height="200" :src="product.image"></v-img>
          <v-card-title>
            <h2>{{ product.name }}</h2>
          </v-card-title>
          <v-card-text>
            <p>{{ product.price }}$</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" variant="tonal" class="updateButton"
              >Update</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn color="error" variant="tonal" class="deleteButton"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      products: [] as object[],
    };
  },
  async mounted() {
    let response = await axios.get("http://localhost:4000/products");
    this.products = response.data;
    console.log(this.products);
  },
});
</script>

<style scoped>
.productCard {
  transition: 0.3s ease-in-out;
}

.productCard:hover {
  transform: scale(1.02);
  box-shadow: 1px 1px 10px 1px black;
}

.updateButton,
.deleteButton {
  transition: 0.3s ease-in-out;
}

.updateButton:hover,
.deleteButton:hover {
  transform: scale(1.04);
}
</style>
