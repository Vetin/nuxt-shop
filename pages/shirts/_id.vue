<template>
	<ProductView
		:options="options"
		:product="product"
		:items="items"
	/>
</template>

<script>
import ProductView from '~/components/ProductView';
import translater from '~/filters/translate.filter'
export default {
	head () {
		return {
			title: this.product.title,
		}
	},
	components: {
		ProductView
	},
	async asyncData ({ store, params, redirect }) {
		try {
			const id = params.id;
			const product = await store.dispatch('products/getProductById', id);
			const options = [{
				value: null,
				text: 'Выберите размер',
			}];
			product.sizes.forEach(size => {
				const option = {
					value: size,
					text: size,
				};
				options.push(option);
			})
			return { product, options };
		} catch (error) {
			console.log(error);
			redirect(window.location.origin);
		}
	},
	computed: {
		items () {
			const paths = this.$route.path.split('/');
			let items = [];
			paths.forEach((path, index) => {
				const obj = {};
				if (index < paths.length - 1) {
					obj.text = translater(path);
					obj.href = `/${path}`;
				} else {
					obj.text = this.product.title;
					obj.active = true;
				}
				items.push(obj);
			})
			return items;
		}
	},
	validate ({ params }) {
		return !!params.id;
	}
}
</script>

<style>
</style>
