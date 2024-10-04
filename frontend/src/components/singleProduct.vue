<template>
  <v-container>
    <!-- Back Button -->
    <v-btn
      class="backButton d-none d-sm-flex"
      icon
      @click="this.$router.go(-1)"
      elevation="0"
    >
      <v-icon large>mdi-menu-left</v-icon>
    </v-btn>

    <!-- Cicular after item is added to the cart -->
    <div v-if="showAddedToCart" class="fadeInOut addedToCartDiv">
      <div class="addedToCartText">Item added to cart!</div>
    </div>

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
            v-if="!loading"
            class="AddToCartButton"
            color="primary"
            large
            @click="addToCart"
          >
            Add To Cart
          </v-btn>

          <v-btn v-if="loading" variant="tonal" class="signInButton">
            <v-progress-circular
              v-if="loading"
              indeterminate
              :width="5"
            ></v-progress-circular>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- when the user is not logged In -->
    <v-dialog v-model="dialog" class="centered-dialog">
      <v-card>
        <v-card-title class="headline">
          <v-icon>mdi-arrow-top-right-thin</v-icon>
          <p>Please Login to Add Items to the Cart</p></v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="this.$router.push('/login')"
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      dialog: false,
      loading: false,
      showAddedToCart: false,
    };
  },
  computed: {
    totalPrice() {
      return this.selectedProduct.price * this.quantity;
    },
    isUserLoggedIn() {
      return this.$store.state.isUserLoggedIn;
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
    async addToCart() {
      this.loading = true;
      if (!this.isUserLoggedIn) {
        this.dialog = true;
      } else {
        // Add the product to the cart
        await axios.post("http://localhost:4000/addUserProduct", {
          user_id: this.$route.params.userId,
          product_id: this.$route.params.productId,
          quantity: this.quantity,
        });
        this.showAddedToCart = true;
      }
      this.loading = false;
      setTimeout(() => {
        this.showAddedToCart = false;
      }, 4000);
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

.centered-dialog {
  max-width: 500px;
  height: 40%;
  display: flex;
  justify-content: center;
}

.headline {
  display: flex;
  align-items: center;
}

.addedToCartDiv {
  width: 100%;
  height: 35px;
  border-radius: 3px;
  background-color: rgb(113, 145, 113);
  color: white;
  font-size: 23px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.addedToCartText {
  margin-left: 8px; /* Space between the spinner and text */
  font-size: 20px;
  color: black;
}

.fadeInOut {
  animation: fadeOut 2s forwards;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  10% {
    opacity: 0.9;
  }
  20% {
    opacity: 0.8;
  }
  30% {
    opacity: 0.7;
  }
  40% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.5;
  }
  60% {
    opacity: 0.4;
  }
  70% {
    opacity: 0.3;
  }
  80% {
    opacity: 0.2;
  }
  90% {
    opacity: 0.1;
  }
  100% {
    opacity: 0;
    display: none; /* Optionally hide element after fading out */
  }
}
</style>
