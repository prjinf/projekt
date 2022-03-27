import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import 'primevue/resources/themes/saga-blue/theme.css';
const app = createApp(App);
import Ripple from 'primevue/ripple';
app.component('Toast', Toast);
app.use(ToastService);

app.use(router);
app.use(PrimeVue, { ripple: true });
app.directive('ripple', Ripple);

app.mount('#app');
