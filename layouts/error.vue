<template>
	<div class="error-layout">
		<div class="error-content">
			<h1 class="error-title">
				Error 404
			</h1>
			<nuxt-link
				to="/"
				class="error-link"
			>Вернуться на главную</nuxt-link>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style scoped type="scss">
.error-layout {
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 100%;
}
.error-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 4rem;
}
.error-title {
	color: rgb(199, 31, 31);
	margin-bottom: 1rem;
}
.error-link {
	color: blueviolet;
}
</style>
