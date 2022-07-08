<template lang="">
  <div class="container">
    <div class="main-content-center" v-if="isLoading">
        <MainLoader />
    </div>
    <div class="main-content" v-else>
      <vue-good-table
        :columns="columns"
        :rows="catalogs"
        :line-numbers="true"
        :row-style-class="rowStyleHidden"
        v-on:row-click="onRowClick"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 20,
          position: 'bottom',
          perPageDropdown: [20, 50, 100],
          dropdownAllowAll: false,
          setCurrentPage: 1,
          nextLabel: 'Вперёд',
          prevLabel: 'Назад',
          rowsPerPageLabel: 'Записей на странице',
          ofLabel: 'of',
          pageLabel: 'page', // for 'pages' mode
          allLabel: 'All',
          infoFn: (params) => `Текущая страница ${params.firstRecordOnPage}`, 
        }"
        compactMode>
      </vue-good-table>
    </div>
  </div>
</template>
<script lang="">
import axios from 'axios';
import { VueGoodTable } from 'vue-good-table-next';
import MainLoader from '@/views/MainLoader.vue';
export default {
  components: {
    VueGoodTable,
    MainLoader
  },

  data() {
    return {
      isLoading: true,
      catalogs: [],
      perPage: 20,
      page: 1,
      searchString: '',
      price: { from: 0, to: Infinity },
      columns: [
        {
          label: 'Имя',
          field: 'name',
        },
        {
          label: 'Бренд',
          field: 'properties.brand.value',
        },
        {
          label: 'Цена',
          field: 'prices.retailPriceUzs',
        },
        
      ],
    }
  },
  methods: {
    async catalogGet() {
      this.isLoading = true;
      let data = JSON.stringify({
        "jsonrpc": "2.0",
        "method": "catalog.get",
        "params": {
          "PerPage": 10000,
          "Page": 1,
          "Price.From": 2,
          "Sort": {
            "type": "num",
            "field": "id",
            "order": "desc"
          }
        },
        "id": "1200"
      });
      let config = {
        method: 'post',
        url: 'https://api.billz.uz/v2/',
        headers: { 
          'Cache-Control': 'no-cache', 
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIyMTMuMjMwLjEwMi4zNiIsImlhdCI6MTYzODU1MzY3NywiZXhwIjoxNzM4NTUzNjc3LCJzdWIiOiJzbGFiLmVjb21tZXJjZXNheXQifQ.Qq6OKJaM0GZ6j6Wiq_eIJFSYRuYBn08usQmacUzqb8s', 
          'Content-Type': 'application/json'
        },
        data : data
      };
      await axios(config).then((res) => {
        let results = res.data.result.data.results;
        this.catalogs = results.filter(results => results.prices.retailPriceUzs > 1 );
        this.catalogs = results;
        console.log(this.catalogs);
      });
      this.isLoading = false;
    },
    rowStyleHidden(row) {
      
      // return row.prices.retailPriceUzs == 1 ? 'd-none' : '';
    },
    onRowClick(row) {
      console.log(row.row.id);
      console.log(row.row.vendorImage + '.jpg');

    }
  },
  mounted() {
    this.catalogGet();
  }

}
</script>
<style lang="css">
  .main-content {
    margin-top: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10%;

  }
  .main-content-center {
    margin-top: 25%;
    display: flex;
    justify-content: center;
    align-items: center;

  }
</style>