<template>
  <div class="header">
    <div class="header-wrap w1170 clearfix">
      <div class="header-l fl" @click="indexReload">
        <router-link to="/">云博客</router-link>
      </div>
      <el-button  size="small" class="header-r fr" @click="handleWrite" v-show="admin">写博客</el-button>
      <el-menu
        class="fr"
        :router='true'
        :default-active="$route.path"
        active-text-color="#ff0"
        text-color="#fff"
        background-color="#409eff"
        mode="horizontal">
        <el-menu-item index="/index">首页</el-menu-item>
        <el-menu-item index="/manage" v-show="admin">管理</el-menu-item>
        <el-menu-item index="/about">关于</el-menu-item>
        <el-menu-item index="/messageBoard">留言</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleWrite() {
        if (!this.$store.state.userInfo.username.length == 0) {
          this.$router.push('/writeBlog')
        } else {
          this.$message.info('只有登录后才能写博客哦')
        }
      },
      indexReload() {
        window.location.reload()
      }
    },
    computed: {
      admin() {
        return this.$store.state.admin
      }
    },
    watch : {
      admin(val) {
        console.log(val);
      }
    }
  }
</script>

<style scoped lang="scss">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    z-index: 1000;
    background: #409eff;
    .header-l a {
      font-size: 30px;
      text-decoration: none;
      color: #fff;
      line-height: 1.5;
    }
    .header-r {
      margin-top: 8px;
      font-size: 14px;
      /*height: 36px;*/
    }
  }
  .el-menu.el-menu--horizontal {
    height: 50px;
    background-color: #409eff;
  }

  .el-menu--horizontal > .el-menu-item {
    height: 49px;
    line-height: 49px;
  }

  .el-menu-item.is-active {
    background-color: #409eff !important;
  }
</style>
