<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center mb-3">
          <v-icon color="orange">mdi-cart-arrow-down</v-icon>
          Cart
        </h1>
        <v-divider :thickness="2"></v-divider>
      </v-col>
    </v-row>

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
            Price: ${{ item.product.price * item.quantity }}
          </v-card-subtitle>
          <v-card-text> Quantity: {{ item.quantity }} </v-card-text>
          <v-spacer></v-spacer>
          <v-row justify="end ma-1">
            <v-tooltip text="Remove From Cart" location="top">
              <template v-slot:activator="{ props }">
                <div
                  class="removeFromCartContainer"
                  @click="removeProductFromCart(item.product.id)"
                >
                  <v-icon
                    class="removeFromCartButton"
                    color="red"
                    size="x-large"
                    v-bind="props"
                    >mdi-delete-circle</v-icon
                  >
                </div>
              </template>
            </v-tooltip>
          </v-row>
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
          large
          >Proceed to Checkout</v-btn
        >

        <!-- if cart is empty -->
        <div v-if="userProductsInCart.length == 0">
          <v-container
            class="empty-cart-container"
            justify="center"
            align="center"
          >
            <v-card class="empty-cart-card" elevation="3">
              <v-card-text class="d-flex flex-column align-center">
                <v-icon large color="orange" class="emptyCartIcon mb-2">
                  mdi-cart-outline
                </v-icon>
                <h3 class="text-center">Your Cart is Empty</h3>
                <p class="text-center">
                  It looks like you haven’t added any items to your cart yet.
                  Browse our products and start shopping!
                </p>
                <v-btn
                  outlined
                  class="mt-4 empty-cart-button"
                  @click="pushToProductsPage"
                >
                  Start Shopping
                </v-btn>
              </v-card-text>
            </v-card>
          </v-container>
        </div>
      </v-col>
    </v-row>

    <!-- stepper -->
    <v-dialog
      v-model="checkoutDialog"
      max-width="800"
      class="stepper-layout stepper-card"
    >
      <v-stepper v-model="step" alt-labels :items="items" hide-actions>
        <v-stepper-content v-if="step == 1" step="1">
          <!-- step 1 content -->
          <div class="pa-5">
            <div class="input-fields">
              <v-row justify="center">
                <v-col cols="12" lg="10" md="10" sm="10" xs="10">
                  <v-text-field
                    clearable
                    label="Enter Delivery Address"
                    placeholder="House # 123, Street # 123, area"
                    variant="outlined"
                    v-model="userDeliveryAddress"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6" sm="6" xs="12">
                  <v-text-field
                    clearable
                    label="Enter Phone Number"
                    placeholder="0333-2651785"
                    variant="outlined"
                    v-model="userPhoneNumber"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6" sm="6" xs="12">
                  <v-select
                    clearable
                    label="Select City"
                    :items="[
                      'Karachi',
                      'Lahore',
                      'Islamabad',
                      'Multan',
                      'Faisalabad',
                    ]"
                    variant="outlined"
                    v-model="userCity"
                  ></v-select>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-stepper-content>
        <v-stepper-content v-if="step == 2" step="2">
          <!-- step 2 content -->
          <div class="pa-5">
            <v-container fluid>
              <v-radio-group v-model="userPaymentMethod">
                <template v-slot:label>
                  <div class="text-h6">
                    Select Your
                    <strong>Payement Method</strong>
                  </div>
                </template>
                <v-radio :value="1">
                  <template v-slot:label>
                    <div class="text-subtitle-1">
                      <strong class="text-success">Cash on Dilevery</strong>
                    </div>
                  </template>
                </v-radio>
                <v-radio :value="2">
                  <template v-slot:label>
                    <div class="text-subtitle-1">
                      <strong class="text-primary">Credit Cart</strong>
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-container>
          </div>
        </v-stepper-content>
        <v-stepper-content v-if="step == 3" step="3">
          <!-- step 3 content -->
          <div class="pa-5">
            <div class="orderId">
              <span class="order-label">Order Id :</span>
              <strong class="order-value">{{ orderId }}</strong>
            </div>
            <v-card class="table-card">
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left table-header font-weight-bold">
                      Quantity
                    </th>
                    <th class="text-left table-header font-weight-bold">
                      Name
                    </th>
                    <th class="text-left table-header font-weight-bold">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in userProductsInCart" :key="item.id">
                    <td class="table-items">{{ item.quantity }}</td>
                    <td class="table-items">{{ item.product.name }}</td>
                    <td class="table-items">
                      {{ item.product.price * item.quantity }}$
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
            <div class="totalPriceOrder">
              <span class="totalPrice-label">Total :</span>
              <strong class="total-value">{{ totalOrderAmount }}$</strong>
            </div>
          </div>
        </v-stepper-content>
        <v-row justify="start" class="ma-5">
          <v-spacer></v-spacer>
          <v-btn
            @click="this.checkoutDialog = false"
            class="mr-5"
            variant="tonal"
            >Cancel</v-btn
          >
          <v-btn
            v-if="!loading"
            color="primary"
            @click="orderConfirmationSteps"
            :text="step == 3 ? 'Confirm Order' : 'Next'"
            :disabled="
              step == 1
                ? !userDeliveryAddress || !userPhoneNumber || !userCity
                : step == 2
                ? !userPaymentMethod
                : false
            "
          ></v-btn>
          <v-btn v-if="loading" color="primary">
            <v-progress-circular
              v-if="loading"
              indeterminate
              :width="5"
            ></v-progress-circular>
          </v-btn>
        </v-row>
      </v-stepper>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "../api/axiosInstance";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface User {
  id: number;
  name: string;
  image: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  product: Product;
  user: User;
}

export default defineComponent({
  data() {
    return {
      userProductsInCart: [] as CartItem[],
      checkoutDialog: false,
      step: 1 as number,
      items: ["Address", "Payment", "Confirmation"],
      loading: false,
      userDeliveryAddress: "" as string,
      userPhoneNumber: "" as string,
      userCity: "" as string,
      userPaymentMethod: 0 as number,
      orderId: "" as string,
      totalOrderAmount: 0 as number,
    };
  },
  async mounted() {
    let response = await axiosInstance.get(
      `/userProducts/${this.$route.params.userId}`
    );
    this.userProductsInCart = response.data;

    // generate the order id
    this.orderId = Math.random().toString(36).slice(2);

    // hiding the cart badge
    this.$store.commit("hideCartBadge");

    // calculate the total order amount
    this.userProductsInCart.forEach((item: any) => {
      this.totalOrderAmount += item.product.price * item.quantity;
    });
    return this.totalOrderAmount;
  },
  methods: {
    async checkout() {
      this.checkoutDialog = true;

      try {
        // get the information of the user if exists
        let response = await axiosInstance.get(
          `/userAddress/${this.$store.state.userId}`
        );

        if (response.data) {
          this.userDeliveryAddress = response.data.address;
          this.userPhoneNumber = response.data.phoneNumber;
          this.userCity = response.data.city;
        } else {
          // Handle the case when the user address doesn't exist
          this.userDeliveryAddress = "";
          this.userPhoneNumber = "";
          this.userCity = "";
        }
      } catch (error) {
        console.error("Error fetching user address:", error);
      }
    },
    async emptyCart() {
      await axiosInstance.delete(
        `/deleteProductsFromCart/${this.$route.params.userId}`
      );

      this.userProductsInCart = [];
    },
    async orderConfirmationSteps() {
      if (this.step == 1) {
        this.loading = true;
        console.log("User Information going");

        try {
          await axiosInstance.put(
            `/checkUserInformation/${this.$store.state.userId}`,
            {
              address: this.userDeliveryAddress,
              phoneNumber: this.userPhoneNumber,
              city: this.userCity,
            }
          );

          console.log("User Information");

          this.userDeliveryAddress = "";
          this.userPhoneNumber = "";
          this.userCity = "";
          this.loading = false;

          this.step = 2;
        } catch (err) {
          console.log(
            "Error when adding / updating the user information : " + err
          );
        }
      } else if (this.step == 2) {
        this.loading = true;
        this.step++;
        this.loading = false;
      } else if (this.step == 3) {
        this.loading = true;
        // create the order in the database
        await axiosInstance.post("/createNewOrder", {
          orderId: this.orderId,
          orderItems: this.userProductsInCart.length,
          orderAmount: this.totalOrderAmount,
          userId: this.$store.state.userId,
        });

        // create order items in the database
        for (let i = 0; i < this.userProductsInCart.length; i++) {
          await axiosInstance.post("/createOrderItem", {
            orderId: this.orderId,
            productId: this.userProductsInCart[i].product.id,
          });

          // decrement the stock of the product
          await axiosInstance.put(
            `/decrementStock/${this.userProductsInCart[i].product.id}`,
            {
              quantity: this.userProductsInCart[i].quantity,
            }
          );

          // to update the sells in the database if product already has some sells
          await axiosInstance.post("/addProductSales", {
            productId: this.userProductsInCart[i].product.id,
            totalSales: this.userProductsInCart[i].quantity,
          });
        }

        this.loading = false;
        this.checkoutDialog = false;
        this.emptyCart();
      }
    },
    async removeProductFromCart(productId: number) {
      await axiosInstance.delete("/removeProductFromCart", {
        data: {
          userId: this.$store.state.userId,
          productId: productId,
        },
      });

      // remove the product from the cart
      this.userProductsInCart = this.userProductsInCart.filter((item: any) => {
        return item.product.id != productId;
      });
    },
    pushToProductsPage() {
      this.$router.push({
        name: "user",
        params: { userId: this.$store.state.userId },
      });
    },
  },
});
</script>

<style scoped>
.product-card {
  max-width: 350px;
  box-shadow: 2px 2px 7px 2px rgb(134, 111, 67);
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
  color: #06355c;
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
  max-width: 500px;
  margin-top: 20px;
  background-color: rgb(134, 104, 47);
  color: white;
  border-radius: 30px;
  font-weight: 28px;
  font-weight: bold;
  transition: 0.3s ease-in-out;
}

.checkout-button:hover {
  background-color: #e9e3e3;
  color: rgb(134, 104, 47);
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

.empty-cart-container {
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.empty-cart-card {
  max-width: 400px;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  background-color: #f5f5f5;
}

.empty-cart-button {
  background-color: orange;
  color: black;
  transition: 0.3s ease-in-out;
}

.empty-cart-button:hover {
  color: white;
  scale: 1.02;
}

.emptyCartIcon {
  font-size: 48px;
}

.stepper-overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(114, 104, 104, 0.5);
}

.stepper-layout {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.stepper-card {
  border-radius: 20px;
}

.stepper {
  border-radius: 10px;
}

.table-card {
  border: 1px solid black;
}

.orderId,
.totalPriceOrder {
  background-color: #e9e3e3;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.totalPriceOrder {
  margin-top: 20px;
  justify-content: end;
}

.order-label,
.totalPrice-label {
  font-size: 18px;
  color: #333;
  margin-right: 10px; /* Space between label and value */
}

.order-value,
.total-value {
  font-size: 20px;
  color: #007bff;
  font-weight: bold;
}

.table-items,
.table-header {
  font-size: 18px;
}

.total {
  font-size: 20px;
}

.removeFromCartContainer {
  border-radius: 50%;
  margin-right: 13px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  transition: 0.3s ease-in-out;
}

.removeFromCartContainer:hover {
  background-color: rgb(212, 207, 207);
}

.removeFromCartButton {
  width: 100%;
  height: 100%;
  font-size: 40px;
  transition: 0.3s ease-in-out;
}

.removeFromCartButton:hover {
  cursor: pointer;
  scale: 1.1;
}
</style>
