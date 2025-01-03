<template>
  <v-container>
    <!-- Back Button -->
    <v-tooltip text="Back To Products" location="top">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          class="backButton d-none d-sm-flex mt-5"
          icon
          @click="this.$router.go(-1)"
          elevation="0"
        >
          <v-icon large>mdi-menu-left</v-icon>
        </v-btn>
      </template>
    </v-tooltip>

    <!-- Alert for stock unavailability -->
    <v-alert
      class="mb-7"
      v-if="stockUnavailable"
      closable
      title="Stock Unavailable"
      text="The stock is not available for the selected quantity."
      type="warning"
      variant="tonal"
    ></v-alert>

    <!-- Snackbar after item is added to the cart -->
    <v-snackbar v-model="snackbar">
      <h3>Product is added to the Cart!</h3>
      <template v-slot:actions>
        <v-btn color="yellow" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

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
        <v-card class="product-details-card">
          <v-card-title class="singleProductName">
            {{ selectedProduct.name }}
          </v-card-title>
          <v-card-subtitle class="stock-text">
            Available Stock :
            <span class="stock-number">{{ selectedProduct.stock }}</span>
          </v-card-subtitle>

          <v-card-subtitle class="category-text">
            Category: {{ selectedProduct.product_category?.category }}
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
              <v-row>
                <v-col cols="12" xs="12">
                  <v-text-field
                    v-model="quantity"
                    variant="outlined"
                    type="number"
                    min="1"
                    label="Quantity"
                    class="quantity-field"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn
                @click="increaseQuantity"
                class="inc-dec-buttons"
                variant="outlined"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </v-col>

            <!-- Total Price -->
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
            large
            @click="addToCart"
            :disabled="selectedProduct.stock === 0"
          >
            <span v-if="!loading">Add To Cart</span>
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
      <v-card class="not-loggedIn-dialog">
        <v-card-title>
          <v-icon large class="dialog-icon">mdi-account-lock</v-icon>
          <span class="dialog-title"> Access Restricted </span>
        </v-card-title>
        <v-card-text class="dialog-message">
          You need to <span class="dialog-message-words">Log In</span> to add
          items to your <span class="dialog-message-words">Cart</span>. Please
          log in or create an account to continue.
        </v-card-text>
        <v-card-actions class="dialog-actions">
          <v-btn color="grey darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn
            class="login-button"
            outlined
            @click="this.$router.push('/login')"
          >
            Login
          </v-btn>
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

interface UserCartProducts {
  user_id: number;
  product_id: number;
  quantity: number;
}

export default defineComponent({
  data() {
    return {
      userProductsInCart: [] as UserCartProducts[],
      selectedProduct: {
        name: "",
        image: "",
        description: "",
        category: "",
        stock: 0,
      } as Record<string, any>,
      quantity: 1,
      dialog: false,
      loading: false,
      productAlreadyInCart: false,
      stockUnavailable: false,
      snackbar: false,
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
      // user's all products in the cart
      let userProducts = await axios.get(
        `http://localhost:4000/userProducts/${this.$store.state.userId}`
      );
      this.userProductsInCart = userProducts.data;

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
      // check the availability of stock
      if (this.selectedProduct.stock < this.quantity) {
        this.stockUnavailable = true;
        setTimeout(() => {
          this.stockUnavailable = false;
        }, 4000);
        return;
      }

      this.loading = true;

      if (!this.isUserLoggedIn) {
        this.dialog = true;
      } else {
        // get all products in the cart
        let userProducts = await axios.get(
          `http://localhost:4000/userProducts/${this.$store.state.userId}`
        );
        this.userProductsInCart = userProducts.data;
        // Check if the product is already in the cart
        for (let i = 0; i < this.userProductsInCart.length; i++) {
          if (
            Number(this.$route.params.productId) ==
            this.userProductsInCart[i].product_id
          ) {
            this.productAlreadyInCart = true;
            break;
          }
        }

        // If the product is already in the cart
        if (this.productAlreadyInCart) {
          // Update the quantity of the product in the cart
          await axios.put(
            `http://localhost:4000/incrementProductQuantity/${this.$route.params.productId}`
          );
        } else {
          // Add the product to the cart if it's not already there
          await axios.post("http://localhost:4000/addUserProduct", {
            user_id: this.$route.params.userId,
            product_id: this.$route.params.productId,
            quantity: this.quantity,
          });

          await this.$store.dispatch("getUserProductsInCart");
          await this.$store.commit("showCartBadge");
          this.snackbar = true;
        }
      }
      this.loading = false;
      setTimeout(() => {
        this.snackbar = false;
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

.not-loggedIn-dialog {
  max-width: 600px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dialog-icon {
  color: rgb(117, 66, 15);
  margin-right: 10px;
}

.dialog-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-left: 5px;
}

.dialog-message {
  font-size: 16px;
  color: #555;
  line-height: 1.5;
  margin-top: 10px;
  text-align: center;
}

.dialog-message-words {
  color: rgb(117, 66, 15);
  font-weight: bold;
}

.dialog-actions {
  justify-content: flex-end;
  margin-top: 20px;
}

.centered-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  background-color: rgb(117, 66, 15);
  color: white;
  border-radius: 25px;
  padding: 5px 20px;
  transition: 0.3s ease-in-out;
}

.login-button:hover {
  background-color: white;
  color: rgb(117, 66, 15);
}

.singleProductImage {
  width: 100%;
  height: auto;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 12px rgb(116, 91, 46);
  transition: transform 0.3s ease-in-out;
}
.singleProductImage:hover {
  transform: scale(1.05);
}

.product-details-card {
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgb(116, 91, 46);
}

.singleProductName {
  font-size: 32px;
  font-weight: bold;
  color: #333333;
}

.stock-text {
  width: fit-content;
  font-size: 18px;
  font-weight: 700;
  color: black;
  border-radius: 40px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.stock-number {
  display: flex;
  justify-content: center;
  width: 40px;
  background-color: rgb(117, 66, 15);
  color: white;
  font-weight: bold;
  border-radius: 50px;
  padding: 5px;
  margin-left: 5px;
}

@media (max-width: 600px) {
  .stock-text {
    font-size: 16px; /* Slightly smaller font for mobile */
    text-align: center;
  }
}

.category-text {
  font-size: 18px;
  color: #757575;
}

.quantity-row {
  margin-top: 20px;
}

.quantity-field {
  width: 100px;
  margin-top: 19px;
}

.AddToCartButton {
  width: 100%;
  margin-top: 20px;
  font-size: 18px;
  transition: all 0.3s ease-in-out;
  border-radius: 30px;
  background: rgb(153, 113, 39);
  color: white;
  transition: 0.3s ease-in-out;
}
.AddToCartButton:hover {
  transform: scale(1.01);
  color: black;
}

.descriptionHeading {
  font-size: 26px;
  color: #424242;
}

.singleProductDescription {
  font-size: 18px;
  color: #5f6368;
  line-height: 1.6;
  padding: 10px 0;
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

.addedToCartText {
  margin-left: 8px; /* Space between the spinner and text */
  font-size: 20px;
  color: black;
}

.snackbar-background-color {
  background-color: rgb(153, 113, 39);
  color: white;
}
</style>
