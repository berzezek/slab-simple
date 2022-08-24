<template>

  <div class="container mt-5">
    <br />
    <br />
    <br />
    <br />
    <div class="main-content my-5" v-if="isLoading">
      <div class="mt-5">
        <MainLoader class="mt-5" />
      </div>
    </div>
    <div v-else class="justify-content-center">
      <div class="col-md-8 mx-auto">

        <div class="card shadow p-2">
          <h2 class="my-2 ms-3">
            <b>{{ product.name }}</b>
          </h2>
          <img :src="imageOriginal(product.image)" />

          <div class="container">
            <div class="mt-2">



              <p>Бренд: {{ product.brand }} </p>
              <p>Цена: {{ formatPrice(product.price) }} </p>
              <p>Количество: {{ product.qty }} </p>
              <p>Размер: {{ product.size }} </p>
              <p>Артикул: {{ product.sku }} </p>
              <button class="btn btn-success my-2" @click="backAndScroll">Назад</button>
            </div>
          </div>
        </div>
        
      </div>

    </div>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import axios from 'axios';
import MainLoader from '@/views/MainLoader.vue';

export default {
  components: {
    MainLoader
  },
  data() {
    return {
      isLoading: false,
      id: '',
      product: {
        name: '',
        image: '',
        price: 0,
        qty: 0,
        brand: '',
        size: '',
        sku: ''
      }
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
          "WithProductPhotoOnly": 1,
          "IncludeEmptyStocks": 0
        },
        "id": "4926796"
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
        this.id = this.$attrs.id;
        const product = results.filter(n => n.ID == this.id)[0]
        this.product.name = product.name;
        console.log(product.imageUrls)
        this.product.image = product.imageUrls[0].url;
        this.product.qty = product.qty;
        this.product.price = product.price;
        this.product.brand = product.properties ? product.properties.BRAND : '-';
        this.product.size = product.properties ? product.properties.SIZE : '-';
        this.product.sku = product.sku;
      });
      this.isLoading = false;
    },
    imageOriginal(img) {
      return img.replace(/_square/, '')
    },
    formatPrice(prc) {
      return Math.floor(prc).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' UZS';
    },
    backAndScroll() {
      this.$router.go(-1);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

  },
  mounted() {
    this.productGet()
  }
}

</script>

<style scoped>
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