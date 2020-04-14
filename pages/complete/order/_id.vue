<template>
	<b-row>
		<b-col
			cols="8"
			offset="2"
		>
			<h3 class="text-center">{{ title }}</h3>
			<b-form @click.prevent="submitHandler">
				<Input
					:inputValue="form.track"
					:labelText="'Трек'"
					placeholder="Трек номер"
					:isLabel="true"
					@change="form.track = $event"
					@isValid="isValidForm.track = $event"
				/>
				<b-button type="submit">Добавить трек номер</b-button>
			</b-form>
		</b-col>
	</b-row>
</template>

<script>
import Input from '~/components/auth/FormInput';

export default {
	head () {
		return {
			title: this.title,
		}
	},
	middleware: ['isAdmin'],
	components: {
		Input
	},
	data: () => ({
		title: 'Подтверждени заказа',
		form: {
			track: '',
		},
		isValidForm: {
			track: false,
		}
	}),
	methods: {
		async submitHandler () {
			if (this.isValidForm.track) {
				try {
					const data = {
						id: this.$route.params.id,
						track: this.form.track,
					};
					await this.$store.dispatch('order/update', data);
				} catch (error) {
					console.log(error);
				}
			}
		},
	},
	validate ({ params }) {
		return !!params.id;
	}
}
</script>

<style scoped>
form {
	width: 300px;
	margin: 0 auto;
}
</style>
