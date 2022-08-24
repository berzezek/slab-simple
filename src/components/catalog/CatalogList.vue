<template lang="">
  <div class="container">
    <div class="main-content">
      <vue-good-table
        compactMode
        v-on:row-click="onRowClick"

        :columns="columns"
        :rows="catalogs"
        :row-style-class="rowStyleHidden"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 20,
          position: 'bottom',
          perPageDropdown: [20, 50, 100],
          dropdownAllowAll: true,
          setCurrentPage: 1,
          nextLabel: 'Вперёд',
          prevLabel: 'Назад',
          rowsPerPageLabel: 'Записей на странице',
          ofLabel: 'of',
          pageLabel: 'page', // for 'pages' mode
          allLabel: 'All',
          infoFn: (params) => `Текущая страница ${params.firstRecordOnPage}`, 
        }"
        >
        <template #emptystate class="d-flex justify-content-center">
          <div class="main-content-center" v-if="isLoading">
              <MainLoader />
          </div>
        
        </template>
        <template #table-row="props">
          <span v-if="props.column.field == 'vendorImage'">
            <span><img :src="formatImg(props.row.vendorImage)"/></span> 
          </span>
          <!-- <span v-else-if="props.column.label == 'Бренд'">
            <span>{{ props.row.properties.brand.value || 'NoName' }}</span> 
          </span> -->
          <!-- <span v-else>
            {{props.formattedRow[props.column.field]}}
          </span> -->
        </template>
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
      price: { from: 1, to: Infinity },
      columns: [
        {
          label: '',
          field: 'vendorImage',
          formatFn: this.formatImg,
          sortable: false,


        },
        {
          label: 'Наименование',
          field: 'name',
          filterOptions: {
            enabled: true,
            placeholder: 'По наименованию'
          }
        },
        {
          label: 'Бренд',
          field: 'properties.brand.value',
          filterOptions: {
            enabled: true,
            placeholder: 'По бренду'
          }
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
      
      return row.prices.retailPriceUzs == 1 ? 'd-none' : '';
    },
    formatImg(src) {
      return `https://app.billz.uz/fileupload/products/${src}.jpeg`
    },
    rowStyleClassFn(row) {
      return row.price > 10000 ? 'green' : 'red';
    },
    nullBrand(row) {
      return row
    }
  },
  computed: {

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
  margin-top: 10%;
  margin-bottom: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>