<template>
	<div>
		<nav>
			<div class="brand menu">
				<nuxt-link to="/">Shop</nuxt-link>
			</div>
			<div class="right menu">
				<nuxt-link
					to="/shirts"
					:class="$route.path === '/shirts' ? 'active' : ''"
				>Футболки</nuxt-link>
				<nuxt-link
					to="/hoodies"
					:class="$route.path === '/hoodies' ? 'active' : ''"
				>Толстовки</nuxt-link>
				<nuxt-link
					to="/auth/login"
					:class="
            $route.path === '/auth/login' || $route.path === '/auth/register'
              ? 'active'
              : ''
          "
					v-if="!isAuth"
				>Войти</nuxt-link>
				<template v-else>
					<nuxt-link
						v-if="!isAdmin"
						to="/cart"
						:class="$route.path === '/cart' ? 'active' : ''"
					>Корзина</nuxt-link>
					<nuxt-link
						v-else
						to="/add"
						:class="$route.path === '/add' ? 'active' : ''"
					>Добавить</nuxt-link>
					<a
						href="#"
						@click.prevent="logoutHandler"
					>Выйти</a>
				</template>
			</div>
		</nav>
		<div
			:class="notifyClass"
			class="notify"
			id="notify"
		>
			<p>{{ notify }}</p>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		isAuth () {
			return this.$store.state.auth.token;
		},
		isAdmin () {
			return this.$store.state.auth.isAdmin;
		},
		notify () {
			return this.$store.state.notify.message;
		},
		notifyClass () {
			return this.$store.state.notify.type;
		},
	},
	methods: {
		async logoutHandler () {
			await this.$store.dispatch("auth/logout");
		},
	},
};
</script>

<style scopedd>
nav {
	display: flex;
	height: 50px;
	background-color: blueviolet;
	margin-bottom: 20px;
	position: sticky;
}
.brand {
	margin-left: 3.3%;
}
.active {
	text-decoration: underline;
}
.right {
	margin-left: auto;
	margin-right: 3.3%;
}
.menu {
	margin-top: 10px;
}
a {
	color: white;
	text-decoration: none;
	padding: 0 10px;
}
a:hover {
	text-decoration: underline;
	color: white;
}
.notify {
	text-align: center;
	max-width: 250px;
	margin: 0 auto;
}
.success {
	color: #00e676;
	/* color: #fff; */
}
.error {
	color: #d32f2f;
	/* color: #fff; */
	height: 50px;
	padding-top: 15px;
}
.info {
	background-color: #039be5;
	color: #fff;
}
</style>
