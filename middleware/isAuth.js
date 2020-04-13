export default ({ store, redirect }) => {
  if (!store.state.auth.token) {
    redirect("/auth/login");
  }
};
