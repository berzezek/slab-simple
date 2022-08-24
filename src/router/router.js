import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'main-page', component: ()=>import('@/views/MainPage.vue') },
    { path: '/catalog', name: 'catalog-list', component: () => import('@/components/catalog/CatalogList.vue') },
    { path: '/product-detail/:id', name: 'product-detail', component: () => import('@/components/catalog/ProductDetail.vue'), props: true },

  ] 
});

export default router;