<template>
	<b-row>
		<b-col cols="12">
			<h3 class="text-center">Место для фантазий дизайнера</h3>
		</b-col>
	</b-row>
</template>

<script>

import ProductCard from '~/components/ProductCard';

export default {
	components: {
		ProductCard
	},
	async asyncData ({ store }) {
		let products = await store.dispatch('products/getProducts');
		return { products };
	},
}
</script>

<style scoped>
</style>
