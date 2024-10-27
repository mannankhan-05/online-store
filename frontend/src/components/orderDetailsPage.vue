<template>
  <v-container>
    <v-row justify="center">
      <!-- Order Details Card -->
      <v-col
        cols="12"
        md="4"
        xs="12"
        sm="6"
        v-for="order in orderItems"
        :key="order.order_id"
      >
        <v-card :elevation="8" color="grey lighten-4" class="orderDetailsCard">
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

      <!-- Placeholder for Additional Content -->
      <v-col cols="12" md="4" xs="12" sm="6">
        <v-card :elevation="8" class="pa-3">Placeholder Content</v-card>
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
      orderItems: [] as object[],
    };
  },
  async mounted() {
    let response = await axios.get(
      `http://localhost:4000/orderItems/${this.$route.params.orderId}`
    );
    this.orderItems = response.data;
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
</style>
