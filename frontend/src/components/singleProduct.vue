<template>
  <v-container>
    <!-- Back Button -->
    <v-btn
      class="backButton d-none d-sm-flex"
      icon
      @click="this.$router.go(-1)"
      elevation="0"
    >
      <v-icon large>mdi-arrow-left-circle</v-icon>
    </v-btn>

    <v-row class="product-details-row" justify="center">
      <!-- Product Image -->
      <v-col cols="12" sm="6" md="6" class="d-flex justify-center">
        <v-img
          :src="selectedProduct.image"
          class="singleProductImage"
          alt="Product Image"
          max-width="400"
        ></v-img>
      </v-col>

      <!-- Product Details -->
      <v-col cols="12" sm="6" md="6">
        <v-card class="product-details-card" elevation="2">
          <v-card-title class="singleProductName">
            {{ selectedProduct.name }}
          </v-card-title>

          <v-card-subtitle class="category-text">
            Category: {{ selectedProduct.category }}
          </v-card-subtitle>

          <!-- Quantity Selector -->
          <v-row class="quantity-row">
            <v-col cols="6" sm="6" class="d-flex align-center">
              <v-btn
                @click="decreaseQuantity"
                class="inc-dec-buttons"
                variant="outlined"
                ><v-icon>mdi-minus</v-icon></v-btn
              >
              <v-text-field
                v-model="quantity"
                variant="outlined"
                type="number"
                min="1"
                label="Quantity"
                class="quantity-field"
              ></v-text-field>
              <v-btn
                @click="increaseQuantity"
                class="inc-dec-buttons"
                variant="outlined"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </v-col>

            <v-col cols="6" class="d-flex justify-end align-center">
              <div>
                <v-chip class="totalPrice" color="primary" dark>
                  ${{ totalPrice }}
                </v-chip>
              </div>
            </v-col>
          </v-row>

          <!-- Add to Cart Button -->
          <v-btn
            class="AddToCartButton"
            variant="outlined"
            large
            @click="addToCart"
          >
            Add To Cart
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Product Description -->
    <v-row>
      <v-col cols="12">
        <h2 class="descriptionHeading text-decoration-underline">
          Description
        </h2>
        <p class="singleProductDescription">
          {{ selectedProduct.description }}
        </p>
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
      selectedProduct: {
        name: "",
        image: "",
        description: "",
        category: "",
      } as Record<string, any>,
      quantity: 1,
    };
  },
  computed: {
    totalPrice() {
      return this.selectedProduct.price * this.quantity;
    },
  },
  async mounted() {
    try {
      const response = await axios.get(
        `http://localhost:4000/product/${this.$route.params.productId}`
      );
      this.selectedProduct = response.data;
    } catch (err) {
      console.log("Error fetching single product: " + err);
    }
  },
  methods: {
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
  },
});
</script>

<style scoped>
.backButton {
  position: fixed;
  top: 80px;
  left: 15px;
  font-size: 28px;
  color: #708396;
}

.singleProductImage {
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #bebcbc;
  margin-bottom: 20px;
}

.product-details-card {
  padding: 20px;
}

.singleProductName {
  font-size: 30px;
  font-weight: bold;
  color: #424242;
}

.category-text {
  font-size: 18px;
  color: #757575;
}

.quantity-row {
  margin-top: 20px;
}

.quantity-field {
  width: 25%;
  margin-top: 19px;
}

.AddToCartButton {
  width: 100%;
  margin-top: 20px;
  font-size: 18px;
}

.descriptionHeading {
  font-size: 26px;
  color: #424242;
}

.singleProductDescription {
  font-size: 18px;
  color: #616161;
  line-height: 1.5;
}

.inc-dec-buttons {
  height: 50px;
  margin: 5px;
}

.totalPrice {
  font-size: 20px;
  font-weight: bold;
}
</style>
