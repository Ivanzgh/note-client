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
  body{
    background: #e4e4e4;
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
