<template>
	<section>
		<h1 style="font-weight: bold; color: orange">Nie znaleziono strony</h1>
		<img class="xyz" src="../assets/img/monke.gif" alt="" />
	</section>
</template>

<script setup></script>

<style>
.xyz {
	transform: translateX(300%);
	margin-top: 10em;
	animation: reveal 3s ease-in-out 0s infinite alternate;
}
@keyframes reveal {
	0% {
		transform: translateX(350%);
	}
	100% {
		transform: translateX(-110%);
	}
}
</style>
