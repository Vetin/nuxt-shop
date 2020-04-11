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
      const cart = [...state.cart];
      const idx = cart.findIndex(product => product._id === item._id);
      if (idx > -1) {
        cart[idx].count++;
      } else {
        cart.push(item);
      }
      state.cart = cart;
    },
    changeCount(state, { type, id }) {
      const cart = [...state.cart];
      const item = cart.find(el => el.id == id);
      const idx = cart.findIndex(el => el.id == id);

      if (type === "+") {
        item.count += 1;
        cart[idx] = item;
      } else {
        if (item.count === 1) {
          cart.splice(idx, 1);
        } else {
          item.count -= 1;
          cart[idx] = item;
        }
      }
      state.cart = cart;
    }
  },
  actions: {
    initCart({ state, commit }) {
      let cart = JsCookie.get("cart");
      if (cart == undefined) {
        JsCookie.set("cart", state.cart);
      } else {
        cart = JSON.parse(cart);
        if (cart.length !== 0) {
          commit("setCart", cart);
        }
      }
    },
    async addItem({ state, commit }, item) {
      commit("addToCart", item);
      JsCookie.set("cart", state.cart);
    },
    async changeItemCount({ state, commit }, data) {
      await commit("changeCount", data);
      JsCookie.set("cart", state.cart);
    },
    getFullPrice({ state }) {
      const price = state.cart.reduce(
        (acc, item) => acc + item.price * item.count
      );
      return price;
    }
  },
  getters: {}
};
