import Cookie from "cookie";
import JsCookie from "js-cookie";
import JwtDecode from "jwt-decode";
import isAdminFunc from "~/server/middleware/isAdmin";

export default {
  state: () => ({
    token: false,
    isAdmin: false
  }),
  mutations: {
    setToken(state, value) {
      state.token = value;
    },
    checkAdmin(state, value) {
      state.isAdmin = value;
    },
    removeAuth(state) {
      state.token = false;
      state.isAdmin = false;
    }
  },
  actions: {
    async login({ commit, dispatch }, form) {
      try {
        const { token } = await this.$axios.$post("/api/auth/login", form);
        dispatch("setAuth", token);
      } catch (error) {
        dispatch(
          "initNotify",
          { type: "error", message: error.response.data },
          { root: true }
        );
        throw new Error(error);
      }
    },
    async setAuth({ commit }, token) {
      const isAdmin = isAdminFunc(JwtDecode(token).userId);
      await commit("setToken", token);
      await commit("checkAdmin", isAdmin);
      JsCookie.set("jwt-token", token);
    },
    async createUser({ dispatch }, data) {
      try {
        const response = await this.$axios.$post("/api/auth/register", data);
        dispatch(
          "initNotify",
          {
            type: "success",
            message: response
          },
          { root: true }
        );
      } catch (error) {
        dispatch(
          "initNotify",
          {
            type: "error",
            message: error.response.data
          },
          { root: true }
        );
        throw new Error(error);
      }
    },
    autoLogin({ dispatch }) {
      const cookieStorage = this.browser
        ? document.cookie
        : this.app.context.req.headers.cookie;
      if (cookieStorage) {
        const cookie = Cookie.parse(cookieStorage);
        const token = cookie["jwt-token"];
        dispatch("setAuth", token);
      }
    },
    async logout({ commit }) {
      await commit("removeAuth");
      JsCookie.remove("jwt-token");
    },
    getId({ state }) {
      return JwtDecode(state.token).userId;
    }
  }
};
