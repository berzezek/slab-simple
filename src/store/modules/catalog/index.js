import axios from 'axios';
export default {
  state: () => ({
    catalog: []
  }),
  actions: {
    async getCatalog(ctx) {
      let data = JSON.stringify({
        "jsonrpc": "2.0",
        "method": "products.get",
        "params": {
          "LastUpdatedDate": "2018-03-21T18:19:25Z",
          "WithProductPhotoOnly": 1,
          "IncludeEmptyStocks": 0
        },
        "id": 1
      });
      let config = {
        method: 'post',
        url: 'https://api.billz.uz/v1/',
        headers: {
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIyMTMuMjMwLjEwMi4zNiIsImlhdCI6MTYzODU1MzY3NywiZXhwIjoxNzM4NTUzNjc3LCJzdWIiOiJzbGFiLmVjb21tZXJjZXNheXQifQ.Qq6OKJaM0GZ6j6Wiq_eIJFSYRuYBn08usQmacUzqb8s',
          'Content-Type': 'application/json'
        },
        data: data
      };
      await axios(config).then((res) => {
        const results = res.data.result;
        const catalog = results.filter(results => results.price > 1);
        ctx.commit('upgradeCatalog', catalog)
      });
    }
  },
  mutations: {
    upgradeCatalog (state, catalog) {
      state.catalog = catalog
    }
  },
  getters: {
    allCatalog (state) {
      return state.catalog
    }
  },
  namespaced: true
}