<template>
  <div class="index ">
    <div class="w1170">
      <div class="clearfix">
        <Banner></Banner>
        <userBox></userBox>
      </div>
      <Article></Article>
    </div>
  </div>
</template>

<script>
  import Banner from '@/components/Banner'
  import userBox from '@/components/userBox'
  import Article from '@/components/Article'

  export default {
    //注册组件
        components : {
          Banner,
          userBox,
          Article
        }
    }
</script>

<style scoped>

</style>
