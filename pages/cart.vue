<template>
	<b-row>
		<div class="cart-container">
			{{ cart }}
			<template v-if="cart.length === 0">
				<h3>
					Вы еще не добавили ни одного товара в корзину
				</h3>
				<nuxt-link to="/">Перейти к покупкам</nuxt-link>
			</template>
			<template v-else>
				<table width="600">
					<thead>
						<th>Фотография</th>
						<th>Название</th>
						<th>Размер</th>
						<th>Количество</th>
						<th>Цена</th>
						<th>Действия</th>
					</thead>
					<tbody>
						<tr
							v-for="item in cart"
							:key="item._id"
						>
							<td>
								<img
									:src="item.imgSrc[0]"
									alt="Фото"
									class="table-img"
								/>
							</td>
							<td>{{ item.title }}</td>
							<td>{{ item.sizes }}</td>
							<td>{{ item.count }}</td>
							<td>{{ item.price }}</td>
							<td>
								<div class="action-data">
									<button
										class="btn-round minus"
										@click.prevent="changeCount('-', item.id)"
									>
										-
									</button>
									<button
										class="btn-round plus"
										@click.prevent="changeCount('+', item.id)"
									>
										+
									</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="total-price">
					<p><b>Итоговая цена:</b> </p>
					<button>da</button>
				</div>
			</template>
		</div>
	</b-row>
</template>

<script>
export default {
	computed: {
		cart () {
			return this.$store.state.cart.cart;
		},
	},
	methods: {
		async changeCount (type, id) {
			const data = { type, id };
			await this.$store.dispatch("cart/changeItemCount", data);
		},
	},
};
</script>

<style scoped>
.cart-container {
	text-align: center;
}
a {
	color: black;
	font-size: 1.6rem;
}
.action-data {
	display: flex;
	align-items: center;
	justify-content: center;
}
.table-img {
	margin: 10px 0;
	max-width: 50px;
}
.btn-round {
	border-radius: 30%;
	margin: 0 5px;
	border: none;
	/* padding: 5px; */
}
.cart-container {
	max-width: 600px;
	margin: 0 auto;
}
.minus {
	background-color: rgba(199, 0, 0, 0.7);
}
.plus {
	background-color: rgba(10, 232, 10, 0.6);
}
.total-price {
	margin-top: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
