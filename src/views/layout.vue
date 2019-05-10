<template>
  <div class="layout">
    <Header></Header>
    <router-view></router-view>
    <goTop></goTop>
  </div>
</template>


<script>
  import Header from '@/components/Header'
  import goTop from '@/components/goTop'
    export default {
      components : {
        Header,
        goTop
      }
    }
</script>

<style scoped>

</style>
