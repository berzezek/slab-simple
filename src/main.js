import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router/';
import store from '@/store/';
import VueGoodTablePlugin from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css'
import VueKinesis from "vue-kinesis";


createApp(App)
    .use(router, VueGoodTablePlugin)
    .use(store)
    .use(VueKinesis)
    .mount('#app')