<template>
	<tbody class="tb-main skeleton-body">
		<SkeletonRow v-for="(i, index) in 14" :key="index" />
	</tbody>
</template>

<script setup>
import SkeletonRow from './SkeletonRow.vue';
</script>

<style>
.p-skeleton::after {
	background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(114, 113, 113, 0.1), rgba(255, 255, 255, 0));
}
</style>
