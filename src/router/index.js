import { createRouter, createWebHistory } from 'vue-router';
import { username, isLoggedIn } from '../store/store';
import { watch } from 'vue';
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/HomeView.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/LoginView.vue'),
			beforeEnter: (to, from) => {
				// redirecting user to '/' if user came from other origin and is not logged in.
				const unwatch = watch(username, () => {
					// from address bar
					if (from.name === undefined && username.value !== '') router.push('/');
					return unwatch();
				});
			}
		},
		{
			path: '/uczen',
			name: 'uczen',
			meta: { requiresAuth: true },
			component: () => import('@/views/Student.vue')
		},

		{
			path: '/uczen/oceny',
			name: 'grades',
			meta: { requiresAuth: true },
			component: () => import('@/views/GradesView.vue')
		},
		{
			path: '/uczen/planlekcji',
			name: 'plan',
			meta: { requiresAuth: true },
			component: () => import('@/views/PlanView.vue')
		},
		{
			path: '/uczen/frekwencja',
			name: 'attendance',
			meta: { requiresAuth: true },
			component: () => import('@/views/FrekwencjaView.vue')
		},
		{
			path: '/ustawienia',
			name: 'userSettings',
			meta: { requiresAuth: true },
			component: () => import('@/views/SettingsView.vue')
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: () => import('@/views/NotFoundView.vue')
		}
	]
});

router.beforeEach((to, from) => {
	const unwatch = watch(isLoggedIn, () => {
		// console.log(isLoggedIn.value);
		// console.log(username.value);
		// console.log(from);

		if (to.meta.requiresAuth && !username.value) {
			console.log('User is unauthenticated, redirecting to /');
			router.push('/login');
		} else {
			console.log('All good');
		}
		unwatch();
	});
});

export default router;
