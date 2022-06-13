import { createRouter, createWebHistory } from 'vue-router';
import { username, isLoggedIn, pageTitle, isProgress } from '../store/store';
import { watch } from 'vue';
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			meta: { pageTitle: 'Dziennik' },
			component: () => import('@/views/HomeView.vue')
		},
		{
			path: '/login',
			name: 'login',
			meta: { pageTitle: 'Login' },
			component: () => import('../views/LoginView.vue'),
			beforeEnter: (to, from) => {
				// redirecting user to '/' if user came from other origin and is not logged in.
				const unwatch = watch(username, () => {
					// from address bar
					if (from.name === undefined && username.value !== '') router.push('/uczen');
					return unwatch();
				});
			}
		},
		{
			path: '/uczen',
			name: 'uczen',
			meta: { requiresAuth: true, pageTitle: 'Panel ucznia' },
			component: () => import('@/views/Student.vue')
		},

		{
			path: '/uczen/oceny',
			name: 'grades',
			meta: { requiresAuth: true, pageTitle: 'Oceny' },
			component: () => import('@/views/GradesView.vue')
		},
		{
			path: '/uczen/planlekcji',
			name: 'plan',
			meta: { requiresAuth: true, pageTitle: 'Plan lekcji' },
			component: () => import('@/views/PlanView.vue')
		},
		// {
		// 	path: '/uczen/frekwencja',
		// 	name: 'attendance',
		// 	meta: { requiresAuth: true, pageTitle: 'Frekwencja' },
		// 	component: () => import('@/views/FrekwencjaView.vue')
		// },
		// {
		// 	path: '/uczen/wiadomosci',
		// 	name: 'messages',
		// 	meta: { requiresAuth: true, pageTitle: 'Wiadomości' },
		// 	component: () => import('@/views/MessagesView.vue')
		// },
		// {
		// 	path: '/ustawienia',
		// 	name: 'userSettings',
		// 	meta: { requiresAuth: true, pageTitle: 'Ustawienia' },
		// 	component: () => import('@/views/SettingsView.vue')
		// },
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			meta: { pageTitle: 'Nie znaleziono strony' },
			component: () => import('@/views/NotFoundView.vue')
		}
	]
});
router.beforeResolve((to, from) => {
	pageTitle.value = to.meta.pageTitle || 'Dziennik';
	isProgress.value = false;
});

router.beforeEach((to, from) => {
	isProgress.value = true;
	const unwatch = watch(isLoggedIn, () => {
		// console.log(isLoggedIn.value);
		// console.log(username.value);
		// console.log(from);
		// User is unauthenticated, redirecting to /login
		if (to.meta.requiresAuth && !username.value) {
			router.push('/login');
		}
		unwatch();
	});
});

export default router;
