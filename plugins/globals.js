import Vue from "vue";
import Vuelidate from "vuelidate";
import CurrencyFilter from "~/filters/currency.filter";
import TranslaterFilter from "~/filters/translate.filter";

Vue.use(Vuelidate);
Vue.filter("currency", CurrencyFilter);
Vue.filter("translate", TranslaterFilter);
if (process.env.NODE_ENV === "production") {
  Vue.config.devtools = false;
}
