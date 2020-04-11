<template>
	<div>
		<ProductForm
			:product="product"
			:title="'Изменить товар'"
			:btnText="'Изменить'"
			@submit="submitForm"
		/>
	</div>
</template>

<script>
import isAdmin from "~/middleware/isAdmin";
import ProductForm from "~/components/ProductForm";

export default {
	components: {
		ProductForm
	},
	async asyncData ({ store, params, redirect }) {
		const stateProduct = await store.dispatch('products/getProductById', params.id);
		if (!stateProduct) {
			redirect('/');
		}
		const product = { ...stateProduct };
		return { product };
	},
	middleware: "isAdmin",
	methods: {
		async submitForm () {
			const product = this.product;
			const userId = await this.$store.dispatch('auth/getId');
			product.userId = userId;
			await this.$store.dispatch('products/updateProduct', product);
		}
	},

	validate ({ params }) {
		return !!params.id;
	},
};
</script>

<style></style>
