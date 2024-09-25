<template>
  <v-container>
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

    <v-row>
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
              <v-btn color="primary">Confirm</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      userProductsInCart: [] as object[],
      checkoutDialog: false,
      orderNumber: "" as string,
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
      this.checkoutDialog = true;

      // to generate a random string with characters of the order
      const randomString: string = Math.random().toString(36).substring(2, 15);
      this.orderNumber = randomString;
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
  margin-top: 20px; /* Space above the button */
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
  font-size: 2rem; /* Larger font for the message */
  text-align: center; /* Center the text horizontally */
  color: rgb(51, 51, 168); /* Light red color to indicate an empty cart */
  background-color: #f5f5f5; /* Light background to make the message stand out */
  padding: 20px; /* Add some padding around the text */
  border-radius: 4px; /* Rounded corners for a softer look */
  margin-top: 40px; /* Space above the message */
  margin-bottom: 20px; /* Space below the message */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
  font-weight: bold; /* Bold font for emphasis */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transitions for hover effect */
}

.empty-cart-message:hover {
  transform: scale(1.03); /* Slight zoom effect on hover */
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15); /* Enhanced shadow on hover */
}
</style>
