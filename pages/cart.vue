<template>
	<b-row>
		<div class="cart-container">
			<template v-if="cart.length === 0">
				<h3>
					Вы еще не добавили ни одного товара в корзину
				</h3>
				<nuxt-link to="/">Перейти к покупкам</nuxt-link>
			</template>
			<template v-else>
				<h3 class="text-center">{{ title }}</h3>
				<ProductTable
					:products="cart"
					:isCart="true"
				/>
				<div class="total-price">
					<p><b>Итоговая цена: </b>{{ fullPrice | currency }}</p>
					<b-button
						variant="success"
						@click.prevent="isCheckout = !isCheckout"
					>{{ btnCheckout }}</b-button>
				</div>
				<template v-if="isCheckout">
					<b-row>
						<b-col
							cols="8"
							offset="2"
						>
							<b-form @submit.prevent="submitHandler">
								<h3>Оформить заказ</h3>
								<div class="form-group">
									<FormInput
										type="text"
										:isLabel="true"
										:labelText="'ФИО'"
										:inputValue="form.name"
										@change="form.name = $event"
										@isValid="isValidForm.name = $event"
										placeholder="ФИО"
									/>
								</div>
								<div class="form-group">
									<FormInput
										:isLabel="true"
										type="phone"
										:labelText="'Телефон'"
										:inputValue="form.phone"
										@change="form.phone = $event"
										@isValid="isValidForm.phone = $event"
										placeholder="Телефон"
									/>
								</div>
								<div class="form-group">
									<label for="address">Адрес</label>
									<Places
										id="address"
										placeholder="Введите адрес"
										v-model="form.address.label"
										@change="val => form.address.data = val"
										required
										:options="options"
									/>
								</div>
								<div class="form-group">
									<FormInput
										type="number"
										id="flat"
										:inputValue="form.flat"
										:isLabel="true"
										:labelText="'Квартира'"
										placeholder="Квартира"
										@change="form.flat = $event"
										@isValid="isValidForm.flat = $event"
										min="1"
									/>
								</div>
								<div class="form-group">
									<b-button
										variant="primary"
										type="submit"
									>Оформить заказ</b-button>
								</div>
							</b-form>
						</b-col>
					</b-row>
				</template>
			</template>
		</div>
	</b-row>
</template>

<script>
import Places from "vue-places";
import FormInput from '~/components/auth/FormInput';
import ProductTable from '~/components/ProductTable';

export default {
	head () {
		return {
			title: this.title,
		}
	},
	middleware: ['isAuth'],
	computed: {
		cart () {
			const cart = [...this.$store.state.cart.cart];
			return cart;
		},
		fullPrice () {
			const fullPrice = this.cart.reduce(
				(acc, item) => acc + item.price * item.count,
				0
			);
			return fullPrice;
		},
		btnCheckout () {
			return !this.isCheckout ? "Оформить заказ" : "Свернуть форму";
		}
	},
	data () {
		return {
			title: 'Корзина',
			options: {
				appId: "plOREA3ZVOE4",
				apiKey: "02e79e0f3c703fa99163453ace095390",
				countries: ["RU"]
			},
			form: {
				address: {
					label: null,
					data: {}
				},
				flat: '',
				name: '',
				phone: '',
			},
			isValidForm: {
				flat: false,
				name: false,
				phone: false,
			},
			isCheckout: false
		};
	},
	components: {
		Places,
		FormInput,
		ProductTable
	},
	methods: {

		async submitHandler () {
			const isValid = Object.values(this.isValidForm).every(el => el === true);
			if (isValid) {
				const { address, flat, name, phone } = this.form
				const userId = await this.$store.dispatch('auth/getId');
				const data = {
					products: this.cart,
					price: this.fullPrice,
					address: address.data.value,
					flat,
					name,
					phone,
					userId,
				}
				const id = await this.$store.dispatch('order/create', data);
				await this.$store.dispatch('cart/clear');
				this.$router.push(`/complete/${id}`);
			} else {
				await this.$store.dispatch('initNotify', { type: 'error', message: 'Данные введены некорректно' });
				this.$router.push('#notify');
			}
		}
	},
	async mounted () {
		this.$store.state.cart.cart === []
			? await this.$store.dispatch("cart/InitCart")
			: null;
	}
};
</script>

<style scoped>
.cart-container {
	text-align: center;
}
a {
	color: black;
	font-size: 1.6rem;
}
.action-data {
	display: flex;
	align-items: center;
	justify-content: center;
}
.cart-container {
	max-width: 600px;
	margin: 0 auto;
}

.total-price {
	margin-top: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
form {
	margin-top: 40px;
}
.form-group > label,
input {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 5px auto;
	width: 300px;
}
table {
	width: 600px;
}
.form-group > input {
	margin: 0 auto;
	width: 300px;
}
</style>
