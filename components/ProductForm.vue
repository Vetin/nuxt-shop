<template>
	<b-col
		cols="8"
		offset="2"
	>
		<b-form
			@submit.prevent="$emit('submit')"
			ref="form"
		>
			<h3 class="text-center">{{title}}</h3>
			<div class="form-group">
				<label for="category">Категория</label>
				<select
					name="category"
					id="category"
					class="custom-select"
					@change="product.category = $event.target.value"
				>
					<option
						selected
						disabled
						hidden
						style="display: block"
					>{{product.category === '' ? 'Выберите категорию ' : product.category | translate }}</option>
					<option value="hoodies">Толстовка</option>
					<option value="shirts">Футболка</option>
				</select>
			</div>
			<div class="form-group">
				<label for="title">Название</label>
				<b-input
					type="text"
					id="title"
					v-model="product.title"
					placeholder="Название"
				></b-input>
			</div>
			<div class="form-group">
				<label for="price">Цена</label>
				<b-input
					type="number"
					id="price"
					v-model="product.price"
					placeholder="Цена"
				></b-input>
				<div class="form-group">
					<label for="count">Количество</label>
					<b-input
						type="number"
						id="count"
						v-model="product.count"
						placeholder="Количество"
					></b-input>
				</div>
			</div>
			<div class="form-group">
				<label for="color">Цвет</label>
				<b-input
					type="text"
					id="color"
					v-model="product.color"
					placeholder="Цвет"
				></b-input>
			</div>
			<p
				class="text-center"
				@click.prevent="isDisplayImg = !isDisplayImg"
			>Фотографии <BIconArrowDown></BIconArrowDown>
			</p>
			<div
				class="inputImgGroup"
				v-if="isDisplayImg"
			>
				<div
					class="form-group"
					v-for="index in 4"
					:key="index"
				>
					<label for="title">Фотография {{ index }}</label>
					<b-input
						type="text"
						id="title"
						v-model="product.imgSrc[index-1]"
						placeholder="Ссылка на фотографию"
					></b-input>
					<img
						v-if="product.imgSrc[index-1]"
						:src="product.imgSrc[index-1]"
						class="preview-img"
					>
				</div>
			</div>
			<div class="form-group">
				<label for="size">Добавить размер</label>
				<div style="display: flex; align-items: center; justify-content: space-between">
					<b-input
						id="size"
						v-model="sizeInput"
						placeholder="Добавить размер"
						style="max-width: 200px"
					></b-input>
					<span
						@click.prevent="product.sizes.push(sizeInput)"
						class="plus"
					>&plus;</span>
				</div>

			</div>
			<label>Размеры</label>
			<div
				class="form-group size-group"
				v-for="(size, index) in product.sizes"
				:key="index"
			>
				<b-input
					class="size-preview"
					:value="size"
				></b-input>
				<span
					class="remove"
					@click.prevent="product.sizes.splice(index, 1)"
				>&times;</span>
			</div>
			<div class="btn-row">
				<b-button
					variant="primary"
					type="submit"
				>{{btnText}}</b-button>
			</div>
		</b-form>
	</b-col>
</template>

<script>
import { BIconArrowDown } from 'bootstrap-vue';


export default {
	props: {
		product: {
			type: Object,
			required: true,
		},
		btnText: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		}
	},
	components: {
		BIconArrowDown
	},
	data: () => ({
		isDisplayImg: false,
		sizeInput: '',
	}),
	computed: {
		countImgInput () {
			return this.product.imgSrc.length
		}
	},
	methods: {
		addInputImg () {
			if (this.countImgInput >= 4) {
				this.$store.dispatch('initNotify', {
					type: 'error',
					message: 'Добавленно максимальное количество фотографий'
				})
			} else {
				this.product.imgSrc.push('');
			}
		},
		removeInputImg (id) {
			this.product.imgSrc.splice(id, 1);
			console.log('something');
		}
	}
}
</script>

<style scoped>
form {
	margin: 0 auto;
	max-width: 500px;
	align-items: center;
}
label {
	/* text-align: center; */
	display: flex;
	justify-content: center;
}
.form-group {
	max-width: 300px;
	margin: 10px auto;
	text-align: center;
}
input,
select {
	margin: 10px auto;
	max-width: 300px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.img-input {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.inputImgGroup {
	max-width: 400px;
	margin: 0 auto;
	padding: 15px;
	border-radius: 3.3%;
	/* color: #5a6269; */
	border: 1px solid #5a6269;
}
.btn-row {
	margin-top: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.preview-img {
	height: 100px;
	max-width: 150px;
	display: flex;
	margin: 0 auto;
}
.size-preview {
	max-width: 150px;
}
.size-group {
	display: flex;
	justify-content: space-between;
}
.plus {
	color: green;
	padding: 5px;
	font-size: 1.4rem;
}
.remove {
	color: #f50057;
	margin-top: 15px;
	font-size: 1.4rem;
}
</style>
