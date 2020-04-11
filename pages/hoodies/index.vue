<template>
	<b-row>
		<b-col
			cols="4"
			v-for="(product, index) in products"
			:key="index"
		>
			<ProductCard
				:product="product"
				@redirect="$router.push(`${$route.path}/${product._id}`)"
				@rebaseProducts="products = $event"
			/>
		</b-col>
	</b-row>
</template>

<script>
import ProductCard from '~/components/ProductCard';

export default {
	head () {
		return {
			title: this.title
		}
	},
	components: {
		ProductCard,
	},
	data: () => ({
		title: 'Толстовки',
	}),
	async asyncData ({ store, route }) {
		let products = await store.dispatch('products/getProducts');
		const category = route.path.split('/')[1];
		products = products.filter(product => product.category == category);
		return { products };
	},
}
</script>

<style>
</style>
