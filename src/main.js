import { createApp, provide } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css';

import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import 'primevue/resources/themes/vela-blue/theme.css';
const app = createApp(App);
import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';
import Skeleton from 'primevue/skeleton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import ColumnGroup from 'primevue/columngroup';
import ProgressBar from 'primevue/progressbar';

app.component('ProgressBar', ProgressBar);
app.component('Skeleton', Skeleton);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Toast', Toast);
app.component('Row', Row);
app.component('ColumnGroup', ColumnGroup);
app.use(ToastService);

app.use(router);
app.use(PrimeVue, { ripple: true });

app.directive('ripple', Ripple);
app.directive('tooltip', Tooltip);

app.mount('#app');
