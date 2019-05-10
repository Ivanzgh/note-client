<template>
  <div class="sidebar">
    <el-menu
      :router='true'
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#263445"
      text-color="#9C9D9F"
      active-text-color="#fff">
        <el-menu-item index="/manage/userAdmin">
          <template slot="title">
            <img src="@/assets/yonghu.png" alt="">
            <span>用户</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/manage/articleAdmin">
          <template slot="title">
            <img src="@/assets/wenzhang.png" alt="">
            <span>文章</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/manage/categoryAdmin">
          <template slot="title">
            <img src="@/assets/fenlei.png" alt="">
            <span>分类</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/manage/commentAdmin">
          <template slot="title">
            <img src="@/assets/pinglun.png" alt="">
            <span>评论</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/manage/messageAdmin">
          <template slot="title">
            <img src="@/assets/liuyan.png" alt="">
            <span>留言</span>
          </template>
        </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "sideBar"
  }
</script>

<style scoped lang="scss">
  .sidebar {
    position: fixed;
    top: 51px;
    bottom: 0;
    width: calc(100% - 83.33333%);
  }
  .el-menu-vertical-demo {
    height: calc(100vh - 51px);
  }
  /deep/ .el-submenu {
    .el-menu-item {
      padding-left: 50px !important;
    }
    .el-submenu__title {
      padding-left: 30px !important;
      span {
        padding-left: 10px;
      }
    }
  }
  /deep/ .el-menu {
    border-right: 1px solid #263445;
    overflow: hidden;
  }
  .el-menu-item {
    padding-left: 30px !important;
    img {
      width: 18px;
      height: 20px;
    }
    span {
      margin-left: 10px;
    }
  }
  .wl-img {
    width: 18px;
    height: 20px;
  }
  .el-menu-item.is-active {
    background-color: #409eff !important;
  }
</style>
