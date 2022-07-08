import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router/router';
import VueGoodTablePlugin from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css'


createApp(App)
    .use(router, VueGoodTablePlugin)
    .mount('#app')