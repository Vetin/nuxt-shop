export default {
  state: () => ({
    products: null
  }),
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    updateProducts(state, product) {
      const products = [...state.products];
      products.push(product);
      state.products = products;
    },
    removeProduct(state, id) {
      if (state) {
        const products = [...state.products];
        const idx = products.findIndex(el => el._id == id);
        products.splice(idx, 1);
        state.products = products;
      }
    },
    editProduct(state, product) {
      const id = product._id;
      const products = [...state.products];
      const idx = products.findIndex(prod => prod._id === id);
      products[idx] = product;
      state.products = products;
    }
  },
  actions: {
    async getProducts({ state, commit, dispatch }) {
      let products;
      if (state.products) {
        products = state.products;
        return products;
      } else {
        try {
          products = await this.$axios.$get("/api/product/getAll");
          commit("setProducts", products);
          return products;
        } catch (error) {
          console.log(error);
          dispatch(
            "initNotify",
            { type: "error", message: "Что-то пошло не так :/" },
            { root: true }
          );
        }
      }
    },
    async getProductById({ state }, id) {
      if (state.products !== null) {
        const product = state.products.find(el => el._id == id);
        return product;
      } else {
        try {
          const product = await this.$axios.$get(`/api/product/${id}`);
          return product;
        } catch (error) {
          console.log(error);
          return null;
        }
      }
    },
    async removeProductById({ state, commit, dispatch }, id) {
      try {
        const response = await this.$axios.$delete(`/api/product/${id}`);
        await commit("removeProduct", id);
        await dispatch(
          "initNotify",
          { type: "success", message: response },
          { root: true }
        );
        return state.products;
      } catch (err) {
        dispatch(
          "initNotify",
          { type: "error", message: error },
          { root: true }
        );
      }
    },
    async addProduct({ commit, dispatch }, product) {
      try {
        const response = await this.$axios.$post("/api/product/add", product);
        await commit("updateProducts", response);
        dispatch(
          "initNotify",
          { type: "success", message: "Товар успешно добавлен" },
          { root: true }
        );
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async updateProduct({ state, commit, dispatch }, product) {
      try {
        const response = await this.$axios.$put(
          `api/product/${product._id}`,
          product
        );
        if (!state.products) {
          dispatch("initProducts");
        } else {
          await commit("editProduct", response);
        }
        dispatch(
          "initNotify",
          { type: "success", message: "Продукт успешно обновлен" },
          { root: true }
        );
      } catch (error) {
        dispatch(
          "initNotify",
          { type: error, message: "Что-то пошло не так :/" },
          { root: true }
        );
        throw new Error(error);
      }
    }
  },
  getters: {}
};
