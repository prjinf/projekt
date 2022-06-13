<template>
	<Toast position="bottom-left" />
</template>

<script setup>
import { onMounted } from 'vue';
import { showToast } from '../composables/useToast';

const props = defineProps({
	meaning: String,
	summary: String,
	msgContent: String,
	life: Number
});
onMounted(() => {
	showToast(props.meaning, props.summary, props.msgContent, props.life);
});
</script>

// Severities // There are four possible values for the severity of a message. Info is the default. // - success // -
info // - warn // - error
