<template>
  <v-container>
    <!-- Back Button -->
    <v-tooltip text="Back To Orders History" location="top">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          class="backButton d-none d-sm-flex"
          icon
          @click="this.$router.go(-1)"
          elevation="0"
        >
          <v-icon large>mdi-menu-left</v-icon>
        </v-btn>
      </template>
    </v-tooltip>

    <v-row justify="center">
      <!-- Order Details -->
      <v-col
        cols="12"
        lg="5"
        md="5"
        xs="12"
        sm="6"
        v-for="order in orderDetails"
        :key="order.order_id"
      >
        <v-card
          :elevation="8"
          color="grey lighten-4"
          class="orderDetailsCard mb-10"
        >
          <div class="orderDetailsHeading">Order Details</div>
          <div class="pa-3 pt-6">
            <!-- Order ID -->
            <div class="orderIdHeading d-flex justify-start">
              Order ID: <span class="orderId">{{ order.order_id }}</span>
            </div>
            <v-divider class="mt-5 mb-5" :thickness="2"></v-divider>

            <!-- Order Amount -->
            <div class="orderDetailField">
              Order Amount:
              <span class="orderAmount">${{ order.order.order_amount }}</span>
            </div>
            <v-divider class="mt-5 mb-5" :thickness="2"></v-divider>

            <!-- Order Date -->
            <div class="orderDetailField">
              Order Date:
              <span class="orderDate">{{
                formatDate(order.order.order_date)
              }}</span>
            </div>
            <v-divider class="mt-5 mb-5" :thickness="2"></v-divider>

            <!-- Order Items Count -->
            <div class="orderDetailField">
              Items Ordered:
              <span class="orderItems">{{ order.order.order_items }}</span>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- Total Items In Order -->
      <v-col cols="12" lg="5" md="5" xs="12" sm="6">
        <v-expansion-panels
          v-for="(item, index) in orderItems"
          :key="item.id"
          v-model="expansionPanel"
        >
          <v-expansion-panel class="expansionPanel mb-5">
            <v-expansion-panel-title class="item-title"
              >Item
              <span class="product-index-number">{{
                index + 1
              }}</span></v-expansion-panel-title
            >
            <v-divider></v-divider>
            <v-expansion-panel-text>
              <v-row justify="center">
                <v-col cols="6">
                  <div class="pa-3">
                    <!-- Product Image -->
                    <div class="text-center">
                      <img
                        class="productImage mt-5 mb-4"
                        :src="item.product.image"
                        alt="Product Image"
                      />
                    </div>
                  </div>
                </v-col>
                <v-col cols="6">
                  <!-- Product Name -->
                  <div class="productField mt-3">
                    <strong>Name : </strong>
                    <span class="productDetails">{{ item.product.name }}</span>
                  </div>
                  <v-divider class="my-3"></v-divider>

                  <!-- Category -->
                  <div class="productField">
                    <strong>Category : </strong>
                    <span class="productDetails">{{
                      item.product.category
                    }}</span>
                  </div>
                  <v-divider class="my-3"></v-divider>

                  <!-- Price -->
                  <div class="productField">
                    <strong>Price : </strong>
                    <span class="productDetails"
                      >${{ item.product.price }}</span
                    >
                  </div>
                  <v-divider class="my-3"></v-divider>

                  <!-- Description -->
                  <div class="productField">
                    <strong>Description : </strong>
                    <p class="mt-1">{{ item.product.description }}</p>
                  </div>
                  <v-divider class="my-3"></v-divider>

                  <!-- Created Date -->
                  <div class="productField">
                    <strong>Added On : </strong>
                    <span class="productDetails">{{
                      formatDate(item.product.createdAt)
                    }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
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
      orderDetails: [] as object[],
      orderItems: [] as object[],
      expansionPanel: [0, 1],
    };
  },
  async mounted() {
    let response1 = await axios.get(
      `http://localhost:4000/orderDetails/${this.$route.params.orderId}`,
      {
        params: {
          limit: 1,
        },
      }
    );
    this.orderDetails = response1.data;

    let response2 = await axios.get(
      `http://localhost:4000/orderItems/${this.$route.params.orderId}`
    );
    this.orderItems = response2.data;
    console.log(this.orderItems);
  },
  methods: {
    formatDate(date: string) {
      return new Date(date).toLocaleDateString();
    },
  },
});
</script>

<style scoped>
.orderDetailsCard {
  border-radius: 20px;
}

.orderDetailsHeading {
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(17, 77, 100);
  color: white;
  font-size: 25px;
  font-weight: bold;
  margin-top: 0;
}

.orderIdHeading,
.orderDetailField {
  font-size: 18px;
  color: black;
  margin-top: 10px;
}

.orderId,
.orderAmount,
.orderDate,
.orderItems {
  margin-left: 10px;
  padding: 2px 10px;
  background-color: rgb(17, 77, 100);
  border-radius: 40px;
  color: white;
  font-weight: bold;
}

.expansionPanel {
  border-radius: 16px;
}

.productImage {
  width: 170px;
  height: 200px;
  border-radius: 10px;
}

.productDetails {
  border: 1px solid rgb(25, 80, 102);
  border-radius: 40px;
  padding: 2px 15px;
  font-size: 17px;
}

.item-title {
  font-size: 18px;
  font-weight: bold;
}

.product-index-number {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(24, 70, 88);
  color: white;
  border-radius: 50%;
  font-weight: bold;
  margin-left: 8px;
}
</style>
