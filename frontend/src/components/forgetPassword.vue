<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="resetPassword">
          <h2 class="mb-10">Forget Password</h2>
          <v-text-field
            clearable
            label="Email"
            placeholder="Email should contain @ and ."
            variant="outlined"
            prepend-inner-icon="mdi-email"
            v-model="email"
          ></v-text-field>

          <div class="d-flex justify-center">
            <v-btn
              v-if="!loading"
              variant="tonal"
              class="resetButton mt-5 mb-5"
              @click="sendVerificationCode"
            >
              Send Verification Code
            </v-btn>

            <v-btn variant="tonal" class="signInButton" v-if="loading">
              <v-progress-circular
                v-if="loading"
                indeterminate
                :width="5"
              ></v-progress-circular>
            </v-btn>
          </div>
        </div> </v-col
    ></v-row>

    <!-- OTP Overlay -->
    <v-overlay
      class="d-flex align-center justify-center"
      v-model="code"
      absolute
      :value="true"
      persistent
      style="z-index: 9999; background-color: rgba(0, 0, 0, 0.6)"
    >
      <v-container class="d-flex align-center justify-center" fill-height>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-card class="otp-card pa-4 text-center" outlined>
            <h2 class="text-center">Enter OTP</h2>
            <v-otp-input
              v-model="otp"
              length="6"
              class="my-4"
              input-class="otp-input"
            ></v-otp-input>
            <v-btn block class="mt-4" @click="submitOtp" color="primary" large>
              Submit
            </v-btn>
          </v-card>
        </v-col>
      </v-container>
    </v-overlay>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      email: "",
      loading: false,
      verificationCode: 0 as number,
      userId: 0 as number,
      otp: 0 as number,
      code: false as boolean,
    };
  },
  methods: {
    async sendVerificationCode() {
      this.loading = true;

      let response = await axios.post("http://localhost:4000/forgetPassword", {
        email: this.email,
      });
      this.verificationCode = response.data.code;
      this.userId = response.data.userId;
      console.log("Verification Code : " + this.verificationCode);
      console.log("User ID : " + this.userId);
      this.email = "";
      this.loading = false;
      this.code = true;
    },
    submitOtp() {
      if (Number(this.otp) === this.verificationCode) {
        this.$router.push({
          name: "resetPassword",
          params: { userId: this.userId },
        });
      } else {
        console.log("Invalid OTP");
      }
      this.code = false;
      console.log("verification code : " + this.verificationCode);
      console.log("otp : " + this.otp);
    },
  },
  computed: {
    emailFormat() {
      return this.email.includes("@") && this.email.includes(".");
    },
  },
});
</script>

<style>
.resetPassword {
  margin: 0 auto;
  max-width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}

.resetButton {
  width: 80%;
  font-size: 15px;
  font-weight: 550;
}

.otp-card {
  max-width: 500px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.otp-input {
  font-size: 24px;
  color: black;
  text-align: center;
}
</style>
