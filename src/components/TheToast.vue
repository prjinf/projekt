<template>
	<Toast position="bottom-left" />
</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import { onMounted } from 'vue';

onMounted(()=>{
	const toast = useToast();

const showSuccess = () => {
	toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 300000 });
};
showSuccess();
})
</script>
