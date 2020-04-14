import JsCookie from "js-cookie";

export default {
  state: () => ({
    cart: []
  }),
  mutations: {
    setCart(state, cart) {
        state.cart = cart;
    },
    addToCart(state, item) {
      let cart = [...state.cart];
      const idx = cart.findIndex(product => product._id === item._id);
      if (idx > -1 && cart[idx].sizes[0] === item.sizes[0]) {
        cart[idx].count++;
      } else {
        cart.push(item);
      }
      state.cart = cart;
    },
    changeCount(state, { type, index }) {
      const cart = [...state.cart];
      if (type === "+") {
        cart[index].count += 1;
      } else {
        if (cart[index].count === 1) {
          cart.splice(idx, 1);
        } else {
          cart[index].count -= 1;
        }
      }
      state.cart = cart;
    },
    clearCart(state) {
      state.cart = [];
    }
  },
  actions: {
    async initCart({ state, commit }) {
      let cart = JsCookie.get("cart");
      if (cart == undefined) {
        JsCookie.set("cart", state.cart);
      } else {
        cart = JSON.parse(cart);
        if (cart.length !== 0) {
          await commit("setCart", cart);
        }
      }
    },
    async addItem({ state, commit }, item) {
      await commit("addToCart", item);
      JsCookie.set("cart", state.cart);
    },
    async changeItemCount({ state, commit }, data) {
      await commit("changeCount", data);
      JsCookie.set("cart", state.cart);
    },
    async clear({ state, commit }) {
      await commit('clearCart');
      JsCookie.set("cart", state.cart);
    }
  },
  getters: {}
};
