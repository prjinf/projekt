<template>
	<div class="sem-switch-container">
		<span style="font-weight: bold">Pokaż semestr </span>
		<button v-ripple @click.self="event => toggleSem(event, true, true)" class="p-ripple sem-switch__btn selected">
			wszystko
		</button>
		<button v-ripple @click.self="event => toggleSem(event, true, false)" class="p-ripple sem-switch__btn">
			pierwszy
		</button>
		<button v-ripple @click.self="event => toggleSem(event, false, true)" class="p-ripple sem-switch__btn">
			drugi
		</button>
	</div>
</template>

<script setup>
import { inject } from 'vue';
const sem = inject('semestr');

function toggleSem({ target }, firstSem = true, secondSem = true) {
	document.querySelector('.selected').classList.remove('selected');
	target.classList.add('selected');
	sem.first = firstSem;
	sem.second = secondSem;
}
</script>
