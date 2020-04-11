export default {
  state: () => ({
    notify: {
      type: "",
      message: ""
    }
  }),
  mutations: {
    setNotify(state, { type, message }) {
      state.notify = {
        type,
        message
      };
    },
    clearNotify(state) {
      state.notify = {
        type: "",
        message: ""
      };
    }
  },
  actions: {
    async initNotify({ commit }, data) {
      await commit("setNotify", data);
      $nuxt.$router.push("#notify");
      setTimeout(async () => await commit("clearNotify"), 3000);
    },
    nuxtServerInit({ dispatch }) {
      dispatch("auth/autoLogin");
    }
  },
  getters: {}
};
