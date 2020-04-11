<template>
	<div>
		<Navbar />
		<b-container>
			<nuxt />
		</b-container>
	</div>
</template>
<script>
import Navbar from "~/components/Navbar";

export default {
	components: {
		Navbar,
	},
	mounted () {
		if (this.$store.state.products.products === null && !this.$route.params.id) {
			this.$store.dispatch('products/getProducts');
		}
		this.$store.dispatch('cart/initCart');
	}
};
</script>
<style></style>
