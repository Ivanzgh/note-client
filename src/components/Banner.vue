<template>
    <div class="banner fl">
      <img src="/static/imgs/banner.jpg" class="img">
      <div class="desc">
        <h3>最好的云笔记，没有之一</h3>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Banner"
    }
</script>

<style scoped lang="scss">
  .banner{
    width: 750px;
    position: relative;
    margin-top: 30px;
    border-radius: 6px;
    overflow: hidden;

    .img{
      display: block;
      width: 100%;
    }
    .desc{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      color: #fff;
      padding-left: 30px;
      background: rgba(0,0,0,.5);
    }
  }
</style>
