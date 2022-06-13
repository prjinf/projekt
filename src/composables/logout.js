import router from '../router';
import { username, isLoggedIn } from '../store/store';
import { BASE_URL } from '../cfg.js';
export default async function logout() {
	try {
		await fetch(`${BASE_URL}/logout`, {
			credentials: 'include'
		});
		username.value = false;
		isLoggedIn.value = false;

		router.push('/');
	} catch (error) {
		console.error(error);
	}
}
