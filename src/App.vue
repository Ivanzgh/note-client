<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  /*定义全局el-card的高度*/
  #app .el-card{
    min-height: calc(100vh - 70px);
    margin-top: 20px;
  }
  .m20 {
    margin: 20px;
  }
  body{
    background: #F4F5F5;
  }
  .w1170{
    width: 1170px;
    margin: 0 auto;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .clearfix::after{
    content: '';
    display: block;
    clear: both;
    height: 0;
    width: 0;
  }
  .mb30{
    margin-bottom: 30px;
  }
  .img{
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
