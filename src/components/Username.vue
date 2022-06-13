<template>
	<div class="nav-username">
		<div v-ripple class="p-ripple username">
			<span>{{ username }}</span>
			<button class="expand-user pi-chevron-down pi"></button>
		</div>
		<div class="username-dropdown">
			<ul class="user-options">
				<li data-options class="p-disabled user-option">
					<a style="display: block" class="settings-link">Ustawienia</a>
				</li>
				<li data-logout @click="logout" style="padding: 0.3em" v-ripple class="p-ripple user-option">
					Wyloguj
					<i class="pi-sign-out pi"></i>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { username } from '../store/store';
import logout from '../composables/logout';
</script>
