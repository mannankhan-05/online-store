<template>
  <v-container>
    <!-- products in cart -->
    <v-row>
      <v-col
        v-for="item in userProductsInCart"
        :key="item.id"
        cols="12"
        md="3"
        sm="4"
        xs="12"
        lg="3"
        class="mb-5"
      >
        <v-card class="product-card">
          <v-img
            :src="`http://localhost:4000/productImages/${item.product.image}`"
            alt=""
            class="product-image"
            height="200px"
            cover
          ></v-img>
          <v-card-title class="title">{{ item.product.name }}</v-card-title>
          <v-card-subtitle class="price">
            Price: ${{ item.product.price }}
          </v-card-subtitle>
          <v-card-text> Quantity: {{ item.quantity }} </v-card-text>
        </v-card>

        <div class="lines">
          <div class="line"></div>
          <div class="line"></div>
        </div>
      </v-col>
    </v-row>

    <!-- checkout button -->
    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn
          v-if="userProductsInCart.length != 0"
          @click="checkout"
          class="checkout-button"
          color="primary"
          large
          >Proceed to Checkout</v-btn
        >

        <h1 class="empty-cart-message" v-if="userProductsInCart.length == 0">
          Cart Is Empty
        </h1>
      </v-col>
    </v-row>

    <!-- stepper for checkout -->
    <v-overlay v-model="step" v-if="checkoutDialog" class="stepper-overlay">
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-stepper show-actions class="stepper" max-width="600">
            <v-stepper-header>
              <v-stepper-step step="1">Order</v-stepper-step>
              <v-stepper-step step="2">Shipping</v-stepper-step>
              <v-stepper-step step="3">Confirm</v-stepper-step>
            </v-stepper-header>

            <!-- Step 1 -->
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card v-if="step === 1">
                  <h3 class="text-h6">Order</h3>
                  <h2>Order</h2>
                  <v-btn color="primary" @click="step = 2">Next</v-btn>
                </v-card>
              </v-stepper-content>

              <!-- Step 2 -->
              <v-stepper-content step="2">
                <v-card v-if="step === 2">
                  <h3 class="text-h6">Shipping</h3>
                  <v-btn color="primary" @click="step = 1">Back</v-btn>
                  <v-btn color="primary" @click="step = 3">Next</v-btn>
                </v-card>
              </v-stepper-content>

              <!-- Step 3 -->
              <v-stepper-content step="3">
                <v-card v-if="step === 3">
                  <h3 class="text-h6">Confirm</h3>
                  <v-btn color="primary" @click="step = 2">Back</v-btn>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-overlay>

    <!-- <v-row>
      <v-col>
        <v-dialog v-model="checkoutDialog" max-width="500">
          <v-card>
            <v-card-title class="headline">Order Confirmation</v-card-title>
            <v-card-text>
              <p>Thank you for your purchase!</p>
              <p class="d-inline">Your order Id is:</p>
              <v-chip
                class="ma-2 block text-center"
                style="width: 100%"
                color="blue darken-2"
                dark
                label
                large
                >{{ orderNumber }}</v-chip
              >
              <p>Your Total Amount Is :</p>
              <v-chip
                class="ma-2 block text-center"
                color="blue darken-2"
                dark
                label
                large
                style="width: 100%"
                >$
                {{
                  userProductsInCart.reduce((acc, item) => {
                    return acc + item.product.price * item.quantity;
                  }, 0)
                }}</v-chip
              >
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="checkoutDialog = false"
                >Close</v-btn
              >
              <v-btn color="primary" @click="emptyCart">Confirm</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      userProductsInCart: [] as object[],
      checkoutDialog: true,
      orderNumber: "" as string,
      step: 1,
    };
  },
  async mounted() {
    let response = await axios.get(
      `http://localhost:4000/userProducts/${this.$route.params.userId}`
    );
    this.userProductsInCart = response.data;
  },
  methods: {
    checkout() {
      // this.checkoutDialog = true;
      // // to generate a random string with characters of the order
      // const randomString: string = Math.random().toString(36).substring(2, 15);
      // this.orderNumber = randomString;
    },
    async emptyCart() {
      await axios.delete(
        `http://localhost:4000/deleteProductsFromCart/${this.$route.params.userId}`
      );
      this.checkoutDialog = false;
    },
  },
});
</script>

<style scoped>
.product-card {
  max-width: 300px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.product-card:hover {
  transform: scale(1.01);
}

.product-image {
  border-bottom: 1px solid #e0e0e0;
}

.title {
  font-weight: bold;
  font-size: 18px;
}

.price {
  color: #1282df;
  font-size: 16px;
}

.v-card-actions {
  justify-content: flex-end;
}

.lines {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.line {
  width: 60px;
  height: 2px;
  background-color: #2196f3;
  margin: 5px 0;
}

.checkout-button {
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
}

.headline {
  font-size: 24px;
  font-weight: bold;
}

v-chip {
  font-size: 18px;
  padding: 10px;
  border-radius: 8px;
}

.empty-cart-message {
  font-size: 2rem;
  text-align: center;
  color: rgb(51, 51, 168);
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 4px;
  margin-top: 40px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.empty-cart-message:hover {
  transform: scale(1.03);
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15);
}

.stepper-overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(114, 104, 104, 0.5);
}

.stepper {
  margin-top: 10%;
  max-width: 600px;
  width: 100%;
}
</style>
