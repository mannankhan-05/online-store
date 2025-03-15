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

      <!-- Product Description -->
      <v-col cols="12" sm="6" md="6">
        <h2 class="descriptionHeading">Description</h2>
        <p class="singleProductDescription">
          {{ selectedProduct.description }}
        </p>

        <!-- Product Details Card -->
        <v-col cols="12" sm="12" md="12">
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
      </v-col>
    </v-row>

    <!-- Divider -->
    <v-row justify="center" align="center">
      <v-col cols="5">
        <v-divider class="mt-10 mb-5 border-opacity-25"></v-divider>
      </v-col>
      <v-col cols="auto" class="text-center">
        <v-icon color="orange">mdi-star</v-icon>
      </v-col>
      <v-col cols="5">
        <v-divider class="mt-10 mb-5 border-opacity-25"></v-divider>
      </v-col>
    </v-row>

    <!-- Product Reviews -->
    <v-row justify="center">
      <v-col
        v-for="review in productReviews"
        :key="review.id"
        cols="12"
        lg="10"
        md="10"
        sm="10"
        xs="12"
      >
        <div class="product-comment-box mb-3">
          <v-row>
            <v-col cols="12" lg="8" md="8" sm="8" xs="12">
              <span class="user-name">{{ review.user.name }}</span>
              <div>{{ review.review }}</div>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="4" xs="12">
              <v-rating
                class="product-rating"
                :value="review.rating"
                color="red-lighten-3"
                active-color="orange"
                readonly
              ></v-rating>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <!-- Add a product review -->
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="8" xs="10">
        <v-btn class="addReviewButton" @click="gotoAddReviewPage">
          <v-icon class="mr-5">mdi-comment-text-multiple-outline</v-icon>
          Share Your Feedback
        </v-btn>
      </v-col>
    </v-row>

    <!-- Add Review Dialog -->
    <v-dialog v-model="addReviewDialog" max-width="600">
      <v-card class="reviewDialog pa-3">
        <!-- Add Comment -->
        <v-card-title>
          <v-icon large class="dialog-icon"
            >mdi-comment-text-multiple-outline</v-icon
          >
          <span class="dialog-title"> Add a Comment </span>
        </v-card-title>
        <v-card-text>
          <v-textarea
            label="Your review matters to us! "
            row-height="15"
            rows="1"
            variant="outlined"
            auto-grow
            v-model="review"
          ></v-textarea>
        </v-card-text>

        <!-- Add Rating -->
        <v-card-title>
          <v-icon large class="dialog-icon"
            >mdi-star-box-multiple-outline</v-icon
          >
          <span class="dialog-title"> Add a Rating </span>
        </v-card-title>
        <v-card-text>
          <v-rating
            hover
            :length="5"
            :size="41"
            v-model="rating"
            color="red-lighten-3"
            active-color="warning"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey darken-1" text @click="addReviewDialog = false">
            Close
          </v-btn>
          <v-btn class="login-button" outlined @click="submitReview">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "../api/axiosInstance";

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
      productReviews: [] as object[],
      quantity: 1 as number,
      dialog: false as boolean,
      loading: false as boolean,
      productAlreadyInCart: false as boolean,
      stockUnavailable: false as boolean,
      snackbar: false as boolean,
      addReviewDialog: false as boolean,
      review: "" as string,
      rating: 0 as number,
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
      let userProducts = await axiosInstance.get(
        `/userProducts/${this.$store.state.userId}`
      );
      this.userProductsInCart = userProducts.data;

      const response = await axiosInstance.get(
        `/product/${this.$route.params.productId}`
      );
      this.selectedProduct = response.data;

      // to get all reviews of the product
      const reviews = await axiosInstance.get(
        `/reviews/${this.$route.params.productId}`
      );
      this.productReviews = reviews.data;
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
        let userProducts = await axiosInstance.get(
          `/userProducts/${this.$store.state.userId}`
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
          await axiosInstance.put(
            `/incrementProductQuantity/${this.$route.params.productId}`
          );
        } else {
          // Add the product to the cart if it's not already there
          await axiosInstance.post("/addUserProduct", {
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
    gotoAddReviewPage() {
      this.addReviewDialog = true;
    },
    async submitReview() {
      await axiosInstance.post("/addReview", {
        product_id: this.$route.params.productId,
        user_id: this.$store.state.userId,
        review: this.review,
        rating: this.rating,
      });

      this.addReviewDialog = false;
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Pacifico&family=SUSE:wght@100..800&display=swap");
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
  border: 2px solid rgb(131, 95, 28);
  border-radius: 12px;
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
  font-family: "Pacifico", serif;
  font-size: 32px;
  color: rgb(131, 95, 28);
}

.singleProductDescription {
  font-size: 18px;
  color: #5f6368;
  line-height: 1.3;
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

.reivews-section-heading {
  font-family: "Pacifico", serif;
  font-size: 32px;
}

.addReviewButton {
  width: 100%;
  background-color: whitesmoke;
  color: rgb(128, 95, 34);
  border-radius: 25px;
  padding: 5px 20px;
  transition: 0.3s ease-in-out;
  font-weight: bold;
  font-size: 18px;
}

.addReviewButton:hover {
  background-color: rgb(128, 95, 34);
  color: whitesmoke;
}

.reviewDialog {
  border-radius: 12px;
}

.user-name {
  font-weight: bold;
  font-size: 13px;
  color: rgb(117, 66, 15);
}

.product-comment-box {
  background-color: rgb(238, 234, 231);
  padding: 2px 13px;
  font-size: 18px;
  border-radius: 5px;
  border-top-right-radius: 20px;
  color: black;
}
</style>
