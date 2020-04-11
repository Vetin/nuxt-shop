<template>
  <b-row>
    <b-col cols="8" offset="2" class="">
      <b-form @submit.prevent="submitForm">
        <h3>{{ title }}</h3>
        <Input
          :labelText="'Логин'"
          :inputValue="form.login"
          @change="form.login = $event"
          @isValid="validForm.login = $event"
          placeholder="Логин"
          type="text"
        />
        <Input
          type="password"
          placeholder="Пароль"
          :labelText="'Пароль'"
          :inputValue="form.password"
          @change="form.password = $event"
          @isValid="validForm.password = $event"
        />
        <FormBottom
          :linkSrc="'/auth/register'"
          :linkText="'Зарегистрироваться'"
          :buttonText="'Войти'"
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
      title: "Логин",
    };
  },
  data: () => ({
    form: {
      login: "",
      password: "",
    },
    validForm: {
      login: "",
      password: "",
    },
    title: "Войти",
  }),
  components: {
    Input,
    FormBottom,
  },
  computed: {
    validationLogin() {
      return this.login.length > 0;
    },
    validationPassword() {
      return this.password.length > 0;
    },
  },
  methods: {
    async submitForm() {
      const isValid = Object.values(this.validForm).every(
        (field) => field === true
      );
      if (isValid) {
        try {
          const form = {
            login: this.form.login,
            password: this.form.password,
          };
          await this.$store.dispatch("auth/login", form);
          this.$router.push("/");
        } catch (error) {
          console.log(error);
        }
      } else {
        await this.$store.dispatch("initNotify", {
          type: "error",
          message: "Данные введены некорректно",
        });
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
form {
  max-width: 300px;
  margin: 0 auto;
  text-align: center;
}
input {
  max-width: 300px;
  margin: 0 auto;
}
.form-bottom {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
a {
  color: black;
}
</style>
/*
<p :class="formStatus === 'error' ? 'error' : 'success'">
          <b v-if="formStatus === 'success'">&check;</b>
          <b v-else-if="formStatus === 'error'">&times;</b>
          {{ formResponse }}
        </p>
<label for="login">Логин</label>
<b-input
  v-model="login"
  id="login"
  @change="isErrorLogin = true"
  required
></b-input>
<b-form-invalid-feedback :state="validationLogin" v-if="isErrorLogin">
          Поле логин не может быть пустым
        </b-form-invalid-feedback>
<label for="password">Пароль</label>
<b-input
  type="password"
  v-model="password"
  id="password"
  @change="isErrorPassword = true"
  required
></b-input>
<b-form-invalid-feedback :state="validationPassword" v-if="isErrorPassword">
          Поле пароля не может быть пустым
        </b-form-invalid-feedback>
<div class="form-bottom">
          <nuxt-link to="/auth/register">Зарегистрироваться</nuxt-link>
          <b-button type="submit" variant="primary">Войти</b-button>
        </div>
*/
