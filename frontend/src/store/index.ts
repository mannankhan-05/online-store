import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    isUserLoggedIn: localStorage.getItem("isUserLoggedIn") === "true",
    userId: localStorage.getItem("userId"),
    userName: localStorage.getItem("userName"),
    userEmail: localStorage.getItem("userEmail"),
    userImage: localStorage.getItem("userImage"),
    isAdmin: localStorage.getItem("isAdmin") === "true",
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
    setUserImage(state, userImage) {
      state.userImage = userImage;
      localStorage.setItem("userImage", userImage);
    },
    setIsAdmin(state, isAdmin) {
      state.isAdmin = isAdmin;
      localStorage.setItem("isAdmin", isAdmin);
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
        const userName: string = response.data.name;
        const userEmail: string = response.data.email;
        const userImage: string = response.data.image;
        const isAdmin: boolean = response.data.isAdmin;

        commit("setUserId", userId);
        commit("setUserName", userName);
        commit("setUserEmail", userEmail);
        commit("setUserImage", userImage);
        commit("setIsAdmin", isAdmin);

        if (userId) {
          router.push({ name: "user", params: { userId: userId } });
        } else {
          console.error("userId is missing, cannot navigate to user profile.");
        }
      } catch (err) {
        console.error("Error registering User : ", err);
      }
    },
    async loginUser({ state, commit }, { email, password, router }) {
      try {
        const response = await axios.post("http://localhost:4000/loginUser", {
          email,
          password,
        });
        state.isUserLoggedIn = true;
        commit("setIsUserLoggedIn", true);

        const userId: number = response.data.id;
        const userName: string = response.data.name;
        const userEmail: string = response.data.email;
        const userImage: string = response.data.image;
        const isAdmin: boolean = response.data.isAdmin;

        commit("setUserId", userId);
        commit("setUserName", userName);
        commit("setUserEmail", userEmail);
        commit("setUserImage", userImage);
        commit("setIsAdmin", isAdmin);

        if (userId) {
          router.push({ name: "user", params: { userId: userId } });
        } else {
          console.error("userId is missing, cannot navigate to user profile.");
        }
      } catch (err) {
        console.error("Error logging in user: ", err);
      }
    },
    async editUser(
      { state, commit },
      { name, image, email, password, router }
    ) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("userImage", image);
      formData.append("email", email);
      formData.append("password", password);

      try {
        const response = await axios.put(
          `http://localhost:4000/editUser/${state.userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const userName: string = response.data.name;
        const userEmail: string = response.data.email;
        const userImage: string = response.data.image;

        commit("setUserName", userName);
        commit("setUserEmail", userEmail);
        commit("setUserImage", userImage);
      } catch (err) {
        console.log("Error at updating the user information : ", err);
      }
    },
    async logoutUser({ state, commit }, { router }) {
      try {
        state.isUserLoggedIn = false;
        commit("setIsUserLoggedIn", false);

        state.userId = "";
        commit("setUserId", "");

        state.userName = "";
        commit("setUserName", "");

        state.userEmail = "";
        commit("setUserEmail", "");

        state.userImage = "";
        commit("setUserImage", "");

        state.isAdmin = false;
        commit("setIsAdmin", false);

        router.push({ name: "home" });
      } catch (err) {
        console.error("Error logging out user: ", err);
      }
    },
  },
});
