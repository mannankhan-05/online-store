<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" sm="8" xs="10">
        <v-textarea
          class="searchProducts"
          clearable
          label="Search for Products"
          prepend-icon="$vuetify"
          variant="outlined"
          rows="1"
          v-model="search"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      search: "" as string,
    };
  },
  // computed: {
  //   searchProducts: function () {
  //     return this.products.filter((product: any) => {
  //       return product.name.match(this.search);
  //     });
  //   },
  // },
});
</script>

<style>
.searchProducts {
  width: 100%;
}
</style>
