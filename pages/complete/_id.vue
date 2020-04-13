<template>
	<b-row>
		<b-col
			cols="6"
			offset="3"
		>
			<h3 class="text-center">Ваш заказ успешно оформлен!</h3>
			<ProductTable
				:products="order.products"
				:isCart="false"
			/>
			<div class="bottom-row">
				<nuxt-link to="/shirts">Вернуться к просмотру товаров</nuxt-link>
				<nuxt-link to="/orders">Перейти в кашим заказам</nuxt-link>
			</div>
		</b-col>
	</b-row>
</template>

<script>
import ProductTable from '~/components/ProductTable'

export default {
	components: {
		ProductTable,
	},
	async asyncData ({ store, params }) {
		const order = await store.dispatch('order/getById', params.id);
		return { order };
	},
}
</script>

<style scoped>
.bottom-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* width: 500px; */
}
a {
	color: black;
}
</style>
