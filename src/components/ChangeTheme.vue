<template>
	<div @click="changeTheme()" class="change-theme">
		<img v-if="darkTheme" src="../assets/img/moon.svg" alt="moon" />
		<img v-else src="../assets/img/sun.svg" alt="sun" />
	</div>
</template>

<script setup>
import { ref, computed, unref } from 'vue';
const darkTheme = ref(true);
const setTheme = theme => {
	document.body.setAttribute('class', `${theme}`);
	if (theme == 'dark') document.querySelector('html').style.colorScheme = 'dark';
	else document.querySelector('html').removeAttribute('style');
};
let currTheme = ref('');
currTheme.value = unref(computed(() => window.localStorage.getItem('theme')));

if (!currTheme.value) {
	window.localStorage.setItem('theme', 'dark');
	currTheme.value = window.localStorage.getItem('theme');
	setTheme(currTheme.value);
} else setTheme(currTheme.value);
darkTheme.value = currTheme.value == 'dark' ? true : false;

function changeTheme() {
	const ms = 200;
	darkTheme.value = !darkTheme.value;
	window.localStorage.setItem('theme', darkTheme.value == true ? 'dark' : 'light');

	document.querySelector('#app').style.transition = `background ${ms}ms ease-in-out, color ${ms}ms ease-in-out`;
	setTimeout(() => {
		document.querySelector('#app').removeAttribute('style');
	}, ms);

	darkTheme.value == true ? setTheme('dark') : setTheme('light');
}
</script>

<style lang="scss">
.change-theme {
	background: var(--bg-shade);
	padding: 10px;
	border-radius: 50%;
	position: absolute;
	top: 5px;
	right: 10px;
	transition: background 100ms ease-in-out;
	cursor: pointer;

	&:hover {
		background: var(--bg);
	}
	img {
		width: 30px;
	}
}
</style>
