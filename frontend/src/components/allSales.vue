<template>
  <v-container>
    <!-- Back Button -->
    <v-tooltip text="Back To Panel" location="top">
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

    <!-- Header Section -->
    <v-row justify="center">
      <v-col cols="12" md="6" sm="12">
        <h2 class="header-title d-flex justify-center">
          <v-icon color="orange mr-2">mdi-poll</v-icon>
          Sales Report
        </h2>
        <v-divider :thickness="2" class="border-opacity-50"></v-divider>
      </v-col>
    </v-row>

    <!-- Sales Report Statistics -->
    <v-row>
      <!-- Week Sales -->
      <v-col cols="12" lg="6" md="6" sm="6" xs="12">
        <v-card :height="250" class="week-sales-card mt-5" :elevation="6">
          <v-card-title class="week-sales-title">
            <v-icon color="white" class="mr-2">mdi-calendar-week</v-icon>
            Weekly Sales
          </v-card-title>
          <v-card-text class="mt-10 week-sales-content d-flex justify-center">
            <span class="dollar">$</span>{{ weekSales }}
          </v-card-text>
          <v-card-actions class="week-sales-actions">
            <v-btn class="viewWeeklySales" @click="viewDetails"
              >View Details</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Monthly Sales -->
      <v-col cols="12" lg="6" md="6" sm="6" xs="12">
        <v-card :height="250" class="week-sales-card mt-5" :elevation="6">
          <v-card-title class="week-sales-title">
            <v-icon color="white" class="mr-2">mdi-calendar-month</v-icon>
            Monthly Sales
          </v-card-title>
          <v-card-text class="mt-10 week-sales-content d-flex justify-center">
            <span class="dollar">$</span>{{ monthSales }}
          </v-card-text>
          <v-card-actions class="week-sales-actions">
            <v-btn class="viewMonthlySales" @click="viewDetails"
              >View Details</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Yearly Sales -->
    <v-row justify="center">
      <v-col cols="12" lg="10" md="10" sm="10" xs="12">
        <v-card :height="250" class="week-sales-card mt-5" :elevation="6">
          <v-card-title class="week-sales-title">
            <v-icon color="white" class="mr-2">mdi-calendar-month</v-icon>
            Yearly Sales
          </v-card-title>
          <v-card-text class="mt-10 week-sales-content d-flex justify-center">
            <span class="dollar">$</span>{{ yearSales }}
          </v-card-text>
          <v-card-actions class="week-sales-actions">
            <v-btn class="viewYearlySales" @click="viewDetails"
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
import axiosInstance from "../api/axiosInstance";

export default defineComponent({
  data() {
    return {
      weekSales: 0 as number,
      monthSales: 0 as number,
      yearSales: 0 as number,
    };
  },
  async mounted() {
    // week sales
    let response = await axiosInstance.post("/totalSales", {
      days: 10,
    });
    this.weekSales = response.data;

    // month sales
    let response2 = await axiosInstance.post("/totalSales", {
      days: 30,
    });
    this.monthSales = response2.data;

    // yearly sales
    let response3 = await axiosInstance.post("/totalSales", {
      days: 365,
    });
    this.yearSales = response3.data;
  },
});
</script>

<style scoped>
.week-sales-card {
  border-radius: 12px;
  background: linear-gradient(135deg, #ff8c00, #ffcc00);
  color: white;
}

.week-sales-title {
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 16px;
}

.week-sales-content {
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 20px;
  color: white;
}

.dollar {
  font-size: 2rem;
  font-weight: bold;
  color: green;
}

.week-sales-actions {
  justify-content: space-between;
  padding: 0 16px 8px 16px;
}

.viewWeeklySales,
.viewMonthlySales,
.viewYearlySales {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20px;
  width: 94%;
  border-radius: 35px;
  background: #da7f11;
  color: white;
  font-weight: 700;
}
</style>
