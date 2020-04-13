<template>
	<b-row>
		<b-col>
			<h3>{{ vtitle }}</h3>
			<b-form></b-form>
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
	components: {
		Input
	},
	data: () => ({
		title: 'Подтверждени заказа',
		form: {
			track: '',
			status: '',
		}
	}),
	methods: {
		submitHandler () {

		},
	}
}
</script>

<style>
</style>
