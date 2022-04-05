<template>
	<Toast position="bottom-left" />
</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import { onMounted, watch } from 'vue';
import { showToast } from '../composables/useToast';

let props = defineProps({
	meaning: String,
	summary: String,
	msgContent: String,
	life: Number
});

onMounted(() => {
	showToast('success', '', 'Login request sent');
});
</script>

// Severities // There are four possible values for the severity of a message. Info is the default. // - success // - info // -
warn // - error
