import { useToast } from 'primevue/usetoast';
import { toggleToast } from '../store/store';
export function showToast(severity = 'success', summary = '', detail = '', life = 3000) {
	const toast = useToast();

	toast.add({
		severity,
		summary,
		detail,
		life
	});
	setTimeout(() => {
		toggleToast.value = false;
	}, life + 200);
}
