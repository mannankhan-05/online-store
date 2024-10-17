<template>
  <v-container>
    <!-- Back Button -->
    <v-tooltip text="Back To Panel" location="top">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          class="backButton d-none d-sm-flex mb-5"
          icon
          @click="this.$router.go(-1)"
          elevation="0"
        >
          <v-icon large>mdi-menu-left</v-icon>
        </v-btn>
      </template>
    </v-tooltip>

    <!-- Sort Orders -->
    <v-row justify="center">
      <v-col cols="12" class="d-flex justify-center">
        <v-btn-toggle v-model="sortOrder" class="sortButton">
          <v-chip-group variant="flat" class="mr-3">
            <v-chip color="primary" label @click="setSortOrder('ascending')">
              <v-icon icon="mdi-sort-ascending" start></v-icon>
              Sort By Order Amount</v-chip
            >
            <v-chip color="primary" label @click="setSortOrder('descending')">
              <v-icon icon="mdi-sort-descending" start></v-icon>
              Sort By Order Amount</v-chip
            >
          </v-chip-group>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <!-- All Orders -->
    <v-row>
      <v-col
        cols="12"
        xs="6"
        sm="6"
        md="4"
        lg="4"
        v-for="order in orders"
        :key="order.id"
      >
        <v-card class="mx-auto mb-4" max-width="400" elevation="4">
          <p class="orderDate mt-2 mb-2">
            {{ new Date(order.order_date).toLocaleDateString() }}
          </p>
          <v-divider></v-divider>
          <v-card-title class="mt-3 mb-4">
            Order ID :
            <v-btn color="primary" variant="tonal">{{ order.order_id }}</v-btn>
          </v-card-title>
          <v-card-title class="mb-3">
            <p>
              Order Amount :
              <v-btn color="primary" variant="tonal"
                >${{ order.order_amount }}</v-btn
              >
            </p>
          </v-card-title>
          <v-card-actions class="actionsAlignment">
            <v-btn class="viewDetailsButton" color="primary" variant="flat"
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
      orders: [] as object[],
      sortOrder: "" as string, // Default sorting order
      list: false,
    };
  },
  async mounted() {
    let response = await axios.get("http://localhost:4000/orders");
    this.orders = response.data;
  },
  methods: {
    setSortOrder(order: string) {
      this.sortOrder = order; // Set the sort order
      this.sortOrdersByPrice(); // Sort orders based on the selected order
    },
    sortOrdersByPrice() {
      // Sort the orders based on the current sortOrder
      this.orders.sort((a: any, b: any) => {
        const priceA = a.order_amount;
        const priceB = b.order_amount;

        return this.sortOrder === "ascending"
          ? priceA - priceB
          : priceB - priceA;
      });
    },
  },
});
</script>

<style>
.orderDate {
  display: flex;
  justify-content: center;
  align-items: center;
}

.actionsAlignment {
  display: flex;
  justify-content: center;
}

.viewDetailsButton {
  width: 95%;
  transition: 0.3s ease-in-out;
}

.viewDetailsButton:hover {
  background-color: #f5f5f5;
  transform: scale(1.02);
}
</style>
