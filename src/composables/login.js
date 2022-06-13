import router from '../router';
import { BASE_URL } from '../cfg';
import { username, formErrors, isLoggedIn } from '../store/store';

export default async function login() {
	const URL = `${BASE_URL}/auth/login`;
	const form = document.querySelector('[data-userlogin]');
	const data = new FormData(form);
	const dataObject = Object.fromEntries(data.entries());

	if (form.checkValidity()) {
		try {
			const res = await fetch(URL, {
				method: form.method,
				credentials: 'include',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(dataObject)
			});
			const data = await res.json();
			if (data.message) {
				formErrors.is = true;
				formErrors.message = data.message;
				return;
			}
			username.value = data.username;
			isLoggedIn.value = true;
			router.push('/uczen');
		} catch (error) {
			console.error('Caught error: ', error);
		}
	}
}
