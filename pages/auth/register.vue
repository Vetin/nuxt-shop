<template>
  <b-row>
    <b-col cols="8" offset="2">
      <b-form class="center-content" @submit.prevent="submitForm">
        <h3>{{ title }}</h3>
        <Input
          :labelText="'Логин'"
          :inputValue="form.login"
          @isValid="validForm.login = $event"
          @change="form.login = $event"
          type="text"
          placeholder="Логин"
        />
        <Input
          :labelText="'Пароль'"
          :inputValue="form.password"
          @isValid="validForm.password = $event"
          @change="form.password = $event"
          type="password"
          placeholder="Пароль"
        />
        <Input
          :labelText="'Телефон'"
          :inputValue="form.phone"
          @isValid="validForm.phone = $event"
          @change="form.phone = $event"
          type="phone"
          placeholder="Телефон"
        />
        <Input
          :labelText="'Почта'"
          :inputValue="form.email"
          @isValid="validForm.email = $event"
          @change="form.email = $event"
          type="email"
          placeholder="Почта"
        />
        <FormBottom
          :linkText="'Войти'"
          :linkSrc="'/auth/login'"
          :buttonText="'Зарегистрироваться'"
        />
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import Input from "~/components/auth/FormInput";
import FormBottom from "~/components/auth/FormBottom";

export default {
  head() {
    return {
      title: "Регистрация",
    };
  },
  data: () => ({
    form: {
      login: "",
      password: "",
      email: "",
      phone: "",
    },
    validForm: {
      login: false,
      password: false,
      email: false,
      phone: false,
    },
    title: "Регистрация",
  }),
  components: {
    Input,
    FormBottom,
  },
  methods: {
    async submitForm() {
      const isValid = Object.values(this.validForm).every((el) => el === true);
      console.log(isValid, this.validForm);
      if (isValid) {
        try {
          const form = this.form;
          // console.log(form);
          await this.$store.dispatch("auth/createUser", form);
          localStorage.removeItem("shop-form");
          this.$router.push("/auth/login");
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$store.dispatch("initNotify", {
          type: "error",
          message: "Данные введены некорректно",
        });
      }
    },
  },
};
</script>

<style>
form {
  max-width: 300px;
  margin: 0 auto;
  text-align: center;
}
input {
  max-width: 300px;
  margin: 0 auto;
}
</style>
