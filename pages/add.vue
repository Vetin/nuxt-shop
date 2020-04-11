<template>
	<div>
		<ProductForm
			:product="product"
			:btnText="'Добавить'"
			@submit="submitForm"
			ref="form"
			:title="title"
		/>
	</div>
</template>
<script>
import ProductForm from "~/components/ProductForm";

export default {
	async asyncData ({ store }) {
		const uId = await store.dispatch("auth/getId");
		return { uId };
	},
	data () {
		return {
			product: {
				category: "",
				title: "",
				price: "",
				imgSrc: [],
				sizes: [],
				color: "",
				count: ""
			},
			title: "Добавить товар"
		};
	},
	head () {
		return {
			title: this.title
		};
	},
	middleware: "isAdmin",
	components: {
		ProductForm
	},
	methods: {
		async submitForm () {
			const product = this.product;
			product.userId = this.uId;
			await this.$store.dispatch("products/addProduct", product);
		}
	}
};
</script>

<style></style>
