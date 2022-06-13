<template>
	<TheNavbar />
	<ProgressBar v-show="isProgress" mode="indeterminate" />
	<ChangeTheme />
	<RouterView v-slot="{ Component, route }">
		<transition name="fadeOut" mode="out-in">
			<KeepAlive include="GradesView">
				<component :key="route.fullPath" :is="Component"></component>
			</KeepAlive>
		</transition>
	</RouterView>
</template>

<script setup>
import { watch, onBeforeMount } from 'vue';
import { BASE_URL } from './cfg';
import { username, isLoggedIn, pageTitle, isProgress } from './store/store';

onBeforeMount(async () => {
	const res = await fetch(`${BASE_URL}/user`, {
		credentials: 'include'
	});
	const data = await res.json();

	if (data) {
		username.value = data.username;
		isLoggedIn.value = true;
	} else {
		isLoggedIn.value = false;
	}
});
watch(pageTitle, () => (document.title = pageTitle.value));
</script>

<style lang="scss">
@use '@/assets/sass/main.scss' as *;

.fadeOut-enter-active,
.fadeOut-leave-active {
	transition: opacity 0.1s ease, transform 100ms;
}

.fadeOut-enter-from,
.fadeOut-leave-to {
	opacity: 0;
	transform: translateY(5px);
}
</style>
