<template>
	<table>
		<thead>
			<th>Фотография</th>
			<th>Название</th>
			<th>Размер</th>
			<th>Количество</th>
			<th>Цена</th>
			<th v-if="isCart">Действия</th>
		</thead>
		<tbody>
			<tr
				v-for="(item, index) in products"
				:key="index"
			>
				<td>
					<img
						:src="item.imgSrc[0]"
						alt="Фото"
						class="table-img"
					/>
				</td>
				<td>
					<nuxt-link :to="`/${item.category}/${item._id}`">{{ item.title }}</nuxt-link>
				</td>
				<td>{{ item.sizes }}</td>
				<td>{{ item.count }}</td>
				<td>{{ item.price }}</td>
				<td>
					<div
						class="action-data"
						v-if="isCart"
					>
						<button
							class="btn-round minus"
							@click.prevent="changeCount('-', index)"
						>
							-
						</button>
						<button
							class="btn-round plus"
							@click.prevent="changeCount('+', index)"
						>
							+
						</button>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	props: {
		products: {
			type: Array,
			required: true,
		},
		isCart: {
			type: Boolean,
			requried: true,
		}
	},
	methods: {
		async changeCount (type, index) {
			const data = { type, index };
			await this.$store.dispatch("cart/changeItemCount", data);
		},
	}
}
</script>

<style scoped>
table {
	margin: 0 auto;
}
.table-img {
	margin: 10px 0;
	max-width: 50px;
}
.btn-round {
	border-radius: 30%;
	margin: 0 5px;
	border: none;
}
.minus {
	background-color: rgba(199, 0, 0, 0.7);
}
.plus {
	background-color: rgba(10, 232, 10, 0.6);
}
a {
	color: black;
}
</style>
