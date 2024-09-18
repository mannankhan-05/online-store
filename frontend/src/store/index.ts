import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    isUserLoggedIn: localStorage.getItem("isUserLoggedIn") === "true",
    userId: localStorage.getItem("userId"),
    userName: localStorage.getItem("userName"),
    userEmail: localStorage.getItem("userEmail"),
  },
  getters: {},
  mutations: {
    setIsUserLoggedIn(state, isUserLoggedIn) {
      state.isUserLoggedIn = isUserLoggedIn;
      localStorage.setItem("isUserLoggedIn", isUserLoggedIn);
    },
    setUserId(state, userId) {
      state.userId = userId;
      localStorage.setItem("userId", userId);
    },
    setUserName(state, userName) {
      state.userName = userName;
      localStorage.setItem("userName", userName);
    },
    setUserEmail(state, userEmail) {
      state.userEmail = userEmail;
      localStorage.setItem("userEmail", userEmail);
    },
  },
  actions: {
    async registerUser(
      { state, commit },
      { name, image, email, password, router }
    ) {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("userImage", image);
        formData.append("email", email);
        formData.append("password", password);

        const response = await axios.post(
          "http://localhost:4000/registerUser",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        state.isUserLoggedIn = true; // means, the user is logged in
        commit("setIsUserLoggedIn", true);

        const userId: number = response.data.id;
        commit("setUserId", userId);

        const userName: string = response.data.name;
        const userEmail: string = response.data.email;

        commit("setUserName", userName);
        commit("setUserEmail", userEmail);

        router.push({ name: "user", params: { userId: userId } });
        console.log("name: ", userName);
        console.log("email: ", userEmail);
      } catch (err) {
        console.error("Error registering User : ", err);
      }
    },
    async loginUser({ state, commit }, { email, password }) {
      try {
        await axios.post("http://localhost:4000/loginUser", {
          email,
          password,
        });
        state.isUserLoggedIn = true;
        commit("setIsUserLoggedIn", true);
      } catch (err) {
        console.error("Error logging in user: ", err);
      }
    },
  },
  modules: {},
});
