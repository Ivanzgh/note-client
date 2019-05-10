<template>
  <div class="index">
    <div class="w1170">
      <div class="clearfix">
        <Banner></Banner>
        <Login></Login>
      </div>
      <Article></Article>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
  import Banner from '@/components/Banner'
  import Login from '@/components/Login'
  import Article from '@/views/article/article'
  import Footer from '@/components/Footer'

  export default {
        components : {
          Banner,
          Login,
          Article,
          Footer
        }
    }
</script>

<style scoped>
.index {
  margin-top: 51px;
}
</style>
