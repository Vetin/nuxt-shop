<template>
	<b-row>
		<b-col
			cols="8"
			offset="2"
		>
			<h3 class="text-center">{{ title }}</h3>
			<b-row>
				<div
					class="order-template"
					v-for="(order, index) in orders"
					:key="index"
				>

					<div class="order-template-part">
						<p><b>Номер: </b>{{order._id}}</p>
						<p><b>Статус: </b>{{order.status}}</p>
					</div>
					<div class="order-template-part">
						<p><b>Трек номер: </b>{{ order.track }}</p>
						<template v-if="!order.isShow">
							<b-button
								variant="primary"
								@click="order.isShow = true"
							>Показать</b-button>
						</template>
						<template v-else>
							<b-button
								variant="primary"
								@click.prevent="order.isShow = false"
							>Скрыть</b-button>
						</template>
					</div>
					<div v-if="order.isShow">
						<ProductTable
							:products="order.products"
							:isCart="false"
						/>
						<div class="price">
							<p><b>Стоимость: </b>{{ order.price }}</p>
						</div>
					</div>
				</div>
			</b-row>
		</b-col>
	</b-row>
</template>

<script>
import ProductTable from '~/components/ProductTable';

export default {
	head () {
		return {
			title: this.title,
		}
	},
	middleware: ['isAuth'],
	components: {
		ProductTable,
	},
	async asyncData ({ store }) {
		const id = await store.dispatch('auth/getId');
		const orders = await store.dispatch('order/getByUserId', id);
		orders.forEach(el => el.isShow = false);
		return { orders };
	},
	data () {
		return {
			title: 'Заказы',
		}
	},
	methods: {
	}
}
</script>

<style scoped>
.order-template {
	margin: 10px auto;
	width: 450px;
	border: 1px solid #ede7f6;
}
.order-template-part {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 10px;
}
.price {
	margin-left: 2rem;
}
button {
	padding: 5px;
}
</style>
