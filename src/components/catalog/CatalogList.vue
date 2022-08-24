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
        :rows="allCatalog"
        :row-style-class="rowStyleClassFn"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 20,
          position: 'bottom',
          perPageDropdown: [10, 20, 50, 100],
          dropdownAllowAll: false,
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
            <span><img :src="props.row.imageUrls[0].url" /></span>
          </span>

        </template>
        <template #table-actions-bottom >
          <p class="my-2 text-center">А товаров всего:<h3>{{ allCatalog.length }}</h3> ... на секудочку!!!</p>
        </template>
      </vue-good-table>

    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import { VueGoodTable } from "vue-good-table-next";
import MainLoader from "@/views/MainLoader.vue";
export default {
  components: {
    VueGoodTable,
    MainLoader,
  },

  data() {
    return {
      isLoading: true,
      columns: [
        {
          label: "",
          field: "imageUrls[0].url",
          // formatFn: this.formatImage,
          sortable: false,
        },
        {
          label: "Имя",
          field: "name",
          filterOptions: {
            enabled: true,
            placeholder: "По наименованию",
          },
        },
        {
          label: "Размер",
          field: "properties.SIZE",

          filterOptions: {
            enabled: true,
            placeholder: "По размеру",
          },
        },
        {
          label: "Бренд",
          field: "properties.BRAND",

          filterOptions: {
            enabled: true,
            placeholder: "По бренду",
          },
        },
        {
          label: "Цена",
          formatFn: this.formatPrice,
          field: "price",
        },
        {
          label: "Кол-во",
          field: "qty",
          formatFn: this.formatQty,
          filterOptions: {
            enabled: true,
            placeholder: "По количеству",
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions({ getCatalog: "catalog/getCatalog" }),
    rowStyleClassFn(row) {
      // return row.qty > 3 ? 'text-uppercase' : 'text-warning';
    },
    formatPrice(prc) {
      const price = Math.floor(prc);
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
    },
    formatBrand(brd) {
      if (brd) {
        return brd;
      } else {
        return "NoName";
      }
    },
    formatQty(qty) {
      if (qty > 5) {
        return "Много";
      } else if (qty > 3) {
        return "Не много";
      } else {
        return "Чуть-чуть";
      }
    },
    // formatImage(src) {
    //   if (src) {
    //     return src
    //   } else {
    //     return ''
    //   }
    // },
    onRowClick(params) {
      this.$router.push({
        name: "product-detail",
        params: { id: params.row.ID },
      });
    },
  },
  computed: {
    ...mapGetters({
      allCatalog: "catalog/allCatalog",
    }),
  },
  async mounted() {
    this.isLoading = true;
    await this.getCatalog();
    this.isLoading = false;
  },
};
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