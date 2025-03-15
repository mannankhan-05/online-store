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

    <!-- Header Section -->
    <v-row justify="center">
      <v-col cols="12" md="6" sm="12">
        <h2 class="header-title d-flex justify-center">
          <v-icon color="orange mr-2">mdi-view-dashboard</v-icon>
          Order Administration Dashboard
        </h2>
        <v-divider :thickness="2" class="border-opacity-50"></v-divider>
      </v-col>
    </v-row>

    <!-- Sort Orders -->
    <v-row justify="center">
      <v-col cols="12" class="d-flex justify-center">
        <v-btn-toggle v-model="sortOrder" class="sortButton">
          <v-chip-group variant="flat" class="mr-3">
            <v-chip
              class="sorting-chips"
              label
              @click="setSortOrder('ascending')"
            >
              <v-icon
                class="sorting-icons"
                icon="mdi-sort-ascending"
                start
              ></v-icon>
              Order Amount</v-chip
            >
            <v-chip
              class="sorting-chips"
              label
              @click="setSortOrder('descending')"
            >
              <v-icon
                class="sorting-icons"
                icon="mdi-sort-descending"
                start
              ></v-icon>
              Order Amount</v-chip
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
        <v-card class="order-card mx-auto mb-4" max-width="400" :elevation="4">
          <p class="orderDate">
            {{ new Date(order.order_date).toLocaleDateString() }}
          </p>
          <v-divider class="mb-7"></v-divider>
          <v-card-title class="d-inline mb-8">
            Order ID :
            <span class="order-id">{{ order.order_id }}</span>
          </v-card-title>
          <v-card-title>
            <p class="mt-4">
              Order Amount :
              <span class="order-amount"
                ><span class="dollar-sign">$</span
                >{{ order.order_amount }}</span
              >
            </p>
          </v-card-title>
          <v-card-actions class="actionsAlignment mt-7">
            <v-btn class="viewDetailsButton">View Details</v-btn>
          </v-card-actions>
        </v-card>
        <v-divider class="divider-color border-opacity-75"></v-divider>
      </v-col>
    </v-row>

    <!-- Loading More Orders (Progress Circular) -->
    <div class="loading-more-products">
      <v-progress-circular
        v-if="loadingMoreOrders"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "../api/axiosInstance";

export default defineComponent({
  data() {
    return {
      orders: [] as object[],
      sortOrder: "" as string, // Default sorting order
      list: false,
      limit: 6,
      page: 0,
      totalPages: 0,
      loadingMoreOrders: false,
    };
  },
  async mounted() {
    window.addEventListener("scroll", this.handleScroll);
    await this.fetchOrders();
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
    async fetchOrders() {
      try {
        let response = await axiosInstance.get("/orders", {
          params: {
            limit: this.limit,
            page: this.page,
          },
        });

        // When loading more, append the products instead of replacing
        if (this.page == 0) {
          this.orders = response.data.orders;
        } else {
          this.orders = [...this.orders, ...response.data.orders];
        }
        this.totalPages = Math.ceil(response.data.totalOrders / this.limit);
      } catch (err) {
        console.log("Error fetching orders: ", err);
      }
    },
    handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 600;
      if (scrollPosition >= threshold) {
        this.loadMoreOrders();
      }
    },
    async loadMoreOrders() {
      if (this.loadingMoreOrders) return;

      this.loadingMoreOrders = true;

      if (this.page < this.totalPages - 1) {
        this.page++;
        await this.fetchOrders();
      }
      this.loadingMoreOrders = false;
    },
  },
});
</script>

<style scoped>
.order-card {
  border-radius: 12px;
}

.orderDate {
  background-color: rgb(163, 132, 75);
  height: 36px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

.order-id,
.order-amount {
  background-color: rgb(238, 230, 230);
  border-radius: 30px;
  color: rgb(114, 87, 37);
  padding: 3px 25px;
}

.dollar-sign {
  color: rgb(22, 18, 9);
}

.actionsAlignment {
  display: flex;
  justify-content: center;
}

.viewDetailsButton {
  background-color: rgb(206, 147, 39);
  border-radius: 30px;
  color: white;
  width: 95%;
  transition: 0.3s ease-in-out;
}

.viewDetailsButton:hover {
  background-color: rgb(163, 132, 75);
  color: black;
  transform: scale(1.02);
}

.loading-more-products {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.sorting-chips {
  background-color: rgb(206, 147, 39);
  color: black;
  border-radius: 30px;
  padding: 3px 25px;
  transition: 0.3s ease-in-out;
}

.sorting-chips:hover {
  color: white;
}

.sorting-icons {
  color: white;
  font-weight: bold;
  font-size: 22px;
}

.divider-color {
  color: rgb(150, 119, 61);
}
</style>
