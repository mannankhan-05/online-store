<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card :elevation="8" class="resetPassword">
          <h2 class="card-title mb-10">Forget Password</h2>
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
        </v-card> </v-col
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
            <v-btn block class="submitCodeButton mt-4" @click="submitOtp" large>
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
import axiosInstance from "../api/axiosInstance";

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

      let response = await axiosInstance.post("/forgetPassword", {
        email: this.email,
      });
      this.verificationCode = response.data.code;
      this.userId = response.data.userId;
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

<style scoped>
.resetPassword {
  margin: 0 auto;
  max-width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: rgb(117, 66, 15);
  box-shadow: 0 2px 5px #ccc;
}

.card-title {
  display: flex;
  justify-content: center;
  color: white;
}

.v-text-field,
.v-file-input {
  margin-bottom: 20px;
  color: white;
  font-size: 20px;
}

.resetButton {
  width: 80%;
  border-radius: 30px;
  font-size: 15px;
  background-color: white;
  color: rgb(100, 50, 0);
  font-weight: 550;
}

.resetButton:hover {
  background-color: rgb(212, 164, 75) !important;
  color: white;
}

.otp-card {
  max-width: 500px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.otp-input {
  font-size: 24px;
  font-weight: bold;
  color: black;
  text-align: center;
}

.submitCodeButton {
  border-radius: 30px;
  background-color: rgb(212, 164, 75) !important;
  color: white !important;
  transition: 0.3s ease-in-out;
}

.submitCodeButton:hover {
  transform: scale(1.02);
  background-color: rgb(185, 105, 25) !important;
  color: rgb(100, 50, 0) !important;
}
</style>
