<template>
	<div class="menu-wrapper" v-if="isLoggedIn && toggleMenu">
		<div class="menu" @click="showMenu">
			<span class="menu__stripe"></span>
			<span class="menu__stripe"></span>
			<span class="menu__stripe"></span>
		</div>
		<transition name="menuOpen">
			<div class="menu-options" v-show="menuOpen">
				<div @click="closeMenu" class="p-ripple menu-option">
					<RouterLink v-ripple to="/uczen/">Uczeń</RouterLink>
				</div>
				<div @click="closeMenu" class="p-ripple menu-option">
					<RouterLink v-ripple to="/uczen/planlekcji">Plan lekcji</RouterLink>
				</div>
				<div @click="closeMenu" class="p-ripple menu-option">
					<RouterLink v-ripple to="/uczen/oceny">Oceny</RouterLink>
				</div>
				<div @click="closeMenu" class="p-disabled p-ripple menu-option">
					<a>Frekwencja</a>
				</div>
				<div @click="closeMenu" class="p-disabled p-ripple menu-option">
					<a>Wiadomości</a>
				</div>
			</div>
		</transition>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import { isLoggedIn } from '../store/store';
const toggleMenu = ref(true);
window.addEventListener('resize', () => {
	if (window.matchMedia('(max-width: 760px)').matches) {
		toggleMenu.value = true;
	} else {
		toggleMenu.value = false;
	}
});

const menuOpen = ref(false);
function showMenu(e) {
	e.currentTarget.classList.toggle('active');
	menuOpen.value = !menuOpen.value;
}

function closeMenu(e) {
	document.querySelector('.menu').classList.toggle('active');
	menuOpen.value = !menuOpen.value;
}
</script>
<style>
.menuOpen-enter-active,
.menuOpen-leave-active {
	transition: opacity 0.3s ease-in-out, transform 0.3s;
}

.menuOpen-enter-from,
.menuOpen-leave-to {
	opacity: 0;
	transform: translateY(10px);
}
</style>
