<template>
	<b-container class="item-container">
		<b-breadcrumb
			:items="items | translate"
			class="d-xs-none"
		></b-breadcrumb>
		<b-alert
			v-model="showDismissibleAlert"
			variant="danger"
			dismissible
		>
			Пожалуйста, выберите размер
		</b-alert>
		<b-row>
			<b-col
				cols="1"
				offset="3"
			>
				<b-row
					v-for="(imgSrc, index) in product.imgSrc"
					:key="index"
				>
					<img
						:src="imgSrc"
						alt="image"
						class="sm-img"
						@click="changeImg(index)"
					/>
				</b-row>
			</b-col>
			<b-col cols="4">
				<div class="img-container">
					<img
						:src="product.imgSrc[0]"
						alt="full image"
						class="lg-image"
						ref="mainImg"
					/>
				</div>
			</b-col>
			<b-col
				cols="3"
				offset="1"
			>
				<div class="info-container">
					<h3>{{ product.title }}</h3>
					<p>{{ product.price | currency }}</p>
					<p><b>Цвет: </b>{{ product.color }}</p>
					<p><b>Размер: </b></p>
					<b-form-select
						v-model="selected"
						:options="options"
					></b-form-select>

					<b-button
						variant="success"
						class="btnBuy"
						@click.prevent="buyHandler($route.params.id)"
					>Купить</b-button>
				</div>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import translater from '~/filters/translate.filter';

export default {
	props: {
		product: {
			type: Object,
			required: true
		},
		options: {
			type: Array,
			requried: true,
		},
		items: {
			type: Array,
			required: true,
		}
	},
	data: () => ({
		selected: null,
		showDismissibleAlert: false,
	}),
	computed: {
		fullImgSrc () {
			return this.product.imgSrc[0];
		},
	},
	methods: {
		changeImg (id) {
			this.$refs.mainImg.src = this.product.imgSrc[id];
		},
		async buyHandler (id) {
			if (this.selected === null) {
				this.showDismissibleAlert = true;
				setTimeout(() => (this.showDismissibleAlert = false), 3000);
			} else if (this.$store.state.auth.auth === false) {
				await this.$store.dispatch("initNotify", {
					type: "info",
					message: "Для покупки товара необходимо авторизоваться",
				});
			} else {
				const product = { ...this.product };
				product.sizes = this.selected
				try {
					product.count = 1;
					await this.$store.dispatch("cart/addItem", product);
					await this.$store.dispatch("initNotify", {
						type: "success",
						message: "Товар успешно добавлен в корзину!",
					});
				} catch (error) {
					console.log(error);
				}
			}
		},
	},
	mounted () {
		this.$store.dispatch('cart/initCart');
	},
	validate ({ params }) {
		return !!params.id;
	},
};
</script>

<style scoped>
.item-container {
	margin-top: 2.5rem;
}
.border {
	border: 1px solid black;
	height: 50px;
}
a {
	color: black;
}
.sm-img {
	max-width: 50px;
	margin: 10px 0;
}
.lg-image {
	max-width: 120%;
}
ol {
	background-color: #fff;
	margin-left: 20%;
}
.btnBuy {
	margin: 10px auto;
	/* padding: 10px; */
}
.alert {
	margin: 10px auto;
	max-width: 250px;
}
</style>
