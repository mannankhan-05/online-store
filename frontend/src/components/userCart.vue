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

    <!-- stepper -->
    <v-overlay v-model="checkoutDialog" class="stepper-layout">
      <v-row justify="center">
        <v-col cols="12" md="12" sm="12">
          <v-card
            width="900"
            elevation="8"
            border
            class="mx-auto pa-5 stepper-card"
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
                    <v-radio-group v-model="userPayementMethod">
                      <template v-slot:label>
                        <div class="text-h6">
                          Select Your
                          <strong>Payement Method</strong>
                        </div>
                      </template>
                      <v-radio :value="1">
                        <template v-slot:label>
                          <div class="text-subtitle-1">
                            <strong class="text-success"
                              >Cash on Dilevery</strong
                            >
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
                          <td class="table-items">{{ item.product.price }}$</td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-card>
                  <div class="totalPriceOrder">
                    <span class="totalPrice-label">Total :</span>
                    <strong class="total-value">10$</strong>
                  </div>
                </div>
              </v-stepper-content>
              <v-row justify="start" class="ma-5">
                <v-spacer></v-spacer>
                <v-btn
                  v-if="!loading"
                  color="primary"
                  @click="orderConfirmationSteps"
                  :text="step == 3 ? 'Confirm Order' : 'Next'"
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
          </v-card>
        </v-col>
      </v-row>
    </v-overlay>
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
      step: 3 as number,
      items: ["Address", "Payment", "Confirmation"],
      loading: false,
      userDeliveryAddress: "" as string,
      userPhoneNumber: "" as string,
      userCity: "" as string,
      userPayementMethod: 0 as number,
      orderId: "" as string,
    };
  },
  async mounted() {
    let response = await axios.get(
      `http://localhost:4000/userProducts/${this.$route.params.userId}`
    );
    this.userProductsInCart = response.data;

    // generate the order id
    this.orderId = Math.random().toString(36).slice(2);
    console.log("order id : " + this.orderId);
  },
  // computed: {
  //   totalOrderPrice() {
  //     this.userProductsInCart.forEach((product) => {
  //       this.totalSum += product.price;
  //     });
  //     return this.totalSum;
  //   },
  // },
  methods: {
    checkout() {
      this.checkoutDialog = true;

      // generate the order id
      // this.orderId = Math.random().toString(36).slice(2);
      // console.log("order id : " + this.orderId);
    },
    async emptyCart() {
      await axios.delete(
        `http://localhost:4000/deleteProductsFromCart/${this.$route.params.userId}`
      );
      this.checkoutDialog = false;
    },
    async orderConfirmationSteps() {
      this.loading = true;
      if (this.step == 1) {
        await axios.post("http://localhost:4000/addUserAddress", {
          userId: this.$store.state.userId,
          address: this.userDeliveryAddress,
          phoneNumber: this.userPhoneNumber,
          city: this.userCity,
        });

        this.userDeliveryAddress = "";
        this.userPhoneNumber = "";
        this.userCity = "";
        this.loading = false;

        this.step = 2;
      } else if (this.step == 2) {
        this.loading = true;
        console.log("User Payment method : " + this.userPayementMethod);
        this.step++;
        this.loading = false;
      }
      // if (this.step == 3) {
      //   // generate the order id
      //   this.orderId = Math.random().toString(36).slice(2);
      //   console.log("order id : " + this.orderId);
      // }
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

.stepper-layout {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.stepper-card {
  border-radius: 10px;
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
</style>
