<template lang="">
  <div>
    <MainHeader />
    <router-view></router-view>
  </div>
</template>
<script>
import MainPage from '@/views/MainPage.vue'
import MainHeader from '@/views/MainHeader.vue'
import 'vue-good-table-next/dist/vue-good-table-next.css'
export default {
  components: {
    MainHeader,
    MainPage,
  }
  
}
</script>

<style>

</style>

