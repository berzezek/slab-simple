<template lang="">
  <div class="container">
    <br/>
    <br/>
    <br/>
    <br/>
    <div class="main-content">
      <vue-good-table
        compactMode
        v-on:row-click="onRowClick"
        :columns="columns"
        :rows="catalogs"
        :row-style-class="rowStyleClassFn"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 20,
          position: 'bottom',
          perPageDropdown: [10, 20, 50],
          dropdownAllowAll: true,
          setCurrentPage: 1,
          nextLabel: 'Вперёд',
          prevLabel: 'Назад',
          rowsPerPageLabel: 'Записей на странице',
          ofLabel: 'из',
          pageLabel: 'page', // for 'pages' mode
          allLabel: 'Показать всё',
          infoFn: (params) => `Текущая страница ${params.firstRecordOnPage}`, 
        }"
        >
        <template #emptystate class="d-flex justify-content-center">
          <div class="main-content-center" v-if="isLoading">
              <MainLoader />
          </div>
        
        </template>
        <template #table-row="props">
          <span v-if="props.column.field == 'imageUrls[0].url'">
            <span><img :src="props.row.imageUrls[0].url"/></span> 
          </span>
          <!-- <span v-else-if="props.column.field == 'qty'">
            <span>{{}}</span> 
          </span> -->
        </template>
        <template #table-actions-bottom >
          <p class="my-2 text-center">А товаров всего:<h3>{{ catalogs.length }}</h3> ... на секудочку!!!</p>
        </template>
      </vue-good-table>

    </div>
  </div>
</template>
<script>
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
      columns: [
        {
          label: '',
          field: 'imageUrls[0].url',
          formatFn: this.formatImg,
          sortable: false,


        },
        {
          label: 'Имя',
          field: 'name',
          filterOptions: {
            enabled: true,
            placeholder: 'По наименованию'
          }
        },
        {
          label: 'Размер',
          field: 'properties.SIZE',

          filterOptions: {
            enabled: true,
            placeholder: 'По размеру'
          }
        },
        {
          label: 'Бренд',
          field: 'properties.BRAND',

          filterOptions: {
            enabled: true,
            placeholder: 'По бренду'
          }
        },
        {
          label: 'Цена',
          formatFn: this.formatPrice,
          field: 'price',

        },
        {
          label: 'Кол-во',
          field: 'qty',
          formatFn: this.formatQty,
          filterOptions: {
            enabled: true,
            placeholder: 'По количеству'
          }
        },

      ],
    }
  },
  methods: {
    async productGet() {
      this.isLoading = true;
      let data = JSON.stringify({
        "jsonrpc": "2.0",
        "method": "products.get",
        "params": {
          "LastUpdatedDate": "2018-03-21T18:19:25Z",
          "WithProductPhotoOnly": 0,
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
        let results = res.data.result;
        this.catalogs = results.filter(results => results.price > 1);
      });
      this.isLoading = false;
    },
    rowStyleClassFn(row) {
      // return row.qty > 3 ? 'text-uppercase' : 'text-warning';
    },
    formatPrice(prc) {
      const price = Math.floor(prc);
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' UZS';
    },
    formatBrand(brd) {
      if (brd) {
        return brd
      } else {
        return 'NoName'
      }
    },
    formatQty(qty) {
      if (qty > 5) {
        return 'Много'
      } else if (qty > 3) {
        return 'Не много'
      } else {
        return 'Чуть-чуть'
      }
    },
    onRowClick(params) {
      this.$router.push({ name: 'product-detail', params: { id: params.row.ID } })
    }
  },
  computed: {

  },
  mounted() {
    // this.catalogGet();
    this.productGet();
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