import { createRouter, createWebHistory } from 'vue-router';

import CatalogList from '@/components/catalog/CatalogList.vue';
import MainPage from '@/views/MainPage.vue';
import SomeTable from '@/components/catalog/SomeTable.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'main-page', component: MainPage },
    { path: '/catalog', name: 'catalog-list', component: CatalogList },
    { path: '/some-table', name: 'some-table', component: SomeTable },

  ] 
});

export default router;