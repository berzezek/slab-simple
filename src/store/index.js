import { createStore } from 'vuex';
import catalog from '@/store/modules/catalog/'

const store = createStore({
  modules: {
    catalog,
  }
});

export default store;