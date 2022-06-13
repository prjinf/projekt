import { ref, reactive } from 'vue';

export const toggleToast = ref(false);
export const username = ref('');
export const isLoggedIn = ref(null);

export const pageTitle = ref('');
export const formErrors = reactive({
	message: '',
	is: false
});

export const toggleShowSem = ref(false);
export const summaryOpen = ref(false);
export const isProgress = ref(true);
