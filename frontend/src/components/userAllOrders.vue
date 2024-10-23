<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center mb-6">Your All Orders</h2>
      </v-col>

      <v-col
        v-for="(order, index) in userOrders"
        :key="index"
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card class="ordersCard mx-auto" elevation="3">
          <v-card-title class="d-flex justify-space-between align-center">
            <div class="orderId">
              <span> Order ID: {{ order.order_id }} </span>
            </div>
          </v-card-title>

          <v-card-subtitle class="orderDate">
            <v-divider></v-divider>
            Order Date: {{ new Date(order.order_date).toLocaleDateString() }}
            <v-divider></v-divider>
          </v-card-subtitle>

          <v-card-text class="orderAmount">
            <div class="d-flex justify-space-between align-center">
              <span>Total Amount:</span>
              <strong>${{ order.order_amount.toFixed(2) }}</strong>
            </div>
          </v-card-text>

          <v-card-actions class="cardActions">
            <v-btn
              class="viewDetailsButton"
              color="primary"
              variant="outlined"
              width="100%"
              >View Details</v-btn
            >
          </v-card-actions>
        </v-card>
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
      userOrders: [] as object[],
    };
  },
  async mounted() {
    const response = await axios.get(
      `http://localhost:4000/orders/${this.$store.state.userId}`
    );
    this.userOrders = response.data;
  },
});
</script>

<style scoped>
.text-center {
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: #2c3e50;
}

.ordersCard {
  border-radius: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #f7f9fc;
  overflow: hidden;
}

.ordersCard:hover {
  transform: translateY(-10px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
}

.orderId {
  font-weight: 600;
  font-size: 1.2rem;
  color: #2c3e50;
}

.orderDate {
  font-size: 0.9rem;
  color: #6c7b7c;
}

.orderAmount {
  margin-top: 10px;
  font-size: 1.1rem;
  color: #34495e;
}

.cardActions {
  padding: 16px;
}

.viewDetailsButton {
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.viewDetailsButton:hover {
  background-color: #2c3e50;
  color: #ffffff;
}
</style>
