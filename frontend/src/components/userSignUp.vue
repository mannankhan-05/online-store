<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="344" title="User Registration">
          <v-container>
            <v-text-field
              v-model="first"
              color="primary"
              label="First name"
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="last"
              color="primary"
              label="Last name"
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="email"
              color="primary"
              label="Email"
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="password"
              color="primary"
              label="Password"
              placeholder="Enter your password"
              variant="underlined"
            ></v-text-field>

            <v-checkbox
              v-model="terms"
              color="secondary"
              label="I agree to site terms and conditions"
            ></v-checkbox>
          </v-container>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="success">
              Complete Registration

              <v-icon icon="mdi-chevron-right" end></v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
body {
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6l9OBM_WTg33izdLZ9YL0F_oRmOK8Sx8dZc-9cdjaJSGM1rtUqEUzJCwUm2R2rAMa8Lw&usqp=CAU");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
