<template>
	<nav>
		<TheMenu />
		<ul class="nav-list">
			<li>
				<RouterLink v-ripple class="p-ripple nav-item" to="/">Home</RouterLink>
			</li>
			<Links v-if="isLoggedIn" />
		</ul>
		<a class="gh" href="#"><i class="pi pi-github"></i></a>
		<LoginBtn v-if="!isLoggedIn" />
		<Name v-else />
	</nav>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { isLoggedIn } from '../store/store';
const Name = defineAsyncComponent(() => {
	return import('./Username.vue');
});

const LoginBtn = defineAsyncComponent(() => {
	return import('./LoginButton.vue');
});

const Links = defineAsyncComponent(() => {
	return import('./StudentLinks.vue');
});
</script>
