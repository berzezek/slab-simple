<template lang="">
  <div>
    <MainHeader />
    <router-view></router-view>
    <MainFooter />
  </div>
</template>
<script>
import MainPage from '@/views/MainPage.vue'
import MainHeader from '@/views/MainHeader.vue'
import MainFooter from '@/views/MainFooter.vue'
import 'vue-good-table-next/dist/vue-good-table-next.css'
export default {
  components: {
    MainHeader,
    MainPage,
    MainFooter
  }
  
}
</script>

<style>

</style>

