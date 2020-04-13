export default {
  actions: {
    async create({ dispatch }, data) {
      try {
        const responseId = await this.$axios.$post("/api/order/create", data);
        return responseId;
      } catch (error) {
        console.log(error);
        await dispatch(
          "initNotify",
          { type: "error", message: error },
          { root: true }
        );
      }
    },
    async getByUserId({ dispatch }, id) {
      try {
        const orders = await this.$axios.$get(`/api/order/${id}`);
        return orders;
      } catch (error) {
        await dispatch(
          "initNotify",
          { type: "error", message: error },
          { root: true }
        );
        console.log(error);
      }
    },
    async getById({}, id) {
      try {
        const order = await this.$axios.$get(`/api/order/getById/${id}`);
        return order;
      } catch (error) {
        console.log(error);
      }
    },
    async update({ dispatch }, { id, track }) {
      try {
        await this.$axios.$put(`/api/order/update/${id}`, track);
        await dispatch(
          "initNotify",
          { type: "success", message: "Заказ успешно обновлен" },
          { root: true }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
};
