<template>
	<Navbar />
	<ChangeTheme />
	<RouterView />
	<!-- <transition>
			<component :is="Component" :key="$route.path"></component>
		</transition> -->
</template>

<script setup></script>

<style lang="scss">
@use '@/assets/sass/main.scss' as *;
</style>
