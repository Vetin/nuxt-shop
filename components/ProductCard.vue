<template>
	<div>

		<div
			class="admin-row"
			v-if="isAdmin"
		>
			<nuxt-link :to="`/edit/${product._id}`">edit</nuxt-link>
			<a @click.prevent="removeItem(product._id)">delete</a>
		</div>
		<b-card
			:title="product.title"
			:img-src="product.imgSrc[0]"
			img-alt="Image"
			img-top
			tag="article"
			style="max-width: 20rem;"
			class="mb-4"
			@click="$emit('redirect')"
		>
			<b-card-text>{{ product.price | currency }}</b-card-text>
		</b-card>
	</div>
</template>

<script>
import isAdmin from "~/middleware/isAdmin";
export default {
	props: {
		product: {
			type: Object,
			required: true,
		}
	},
	computed: {
		isAdmin () {
			return this.$store.state.auth.isAdmin
		}
	},
	methods: {
		async removeItem (id) {
			let confirmAction = confirm('Вы уверены, что хотите удалить товар?');
			if (confirmAction) {
				try {
					const products = await this.$store.dispatch('products/removeProductById', id);
					this.$emit('rebaseProducts', products);
				} catch (error) {
					this.$store.dispatch('initNotify', {
						type: 'error',
						message: 'Что-то пошло не так :/',
					})
				}
			}
		}
	}
};
</script>

<style scoped>
.admin-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	max-width: 20rem;
}
a {
	color: black;
}
</style>
