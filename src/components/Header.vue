<template>
    <div class="header">
      <div class="header-wrap w1170 clearfix">
        <div class="header-l fl">
          <router-link to="/">云笔记</router-link>
        </div>
        <el-button class="header-r fr" @click="handleWrite">写笔记</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        methods : {
          handleWrite() {
            if (!this.$store.state.userInfo.username.length == 0) {
              this.$router.push('/writeNote')
            } else {
              this.$message.info('只有登录后才能写笔记哦')
            }
          }
        }
    }
</script>

<style scoped lang="scss">
  .header{
    height: 50px;
    background: #409eff;

    .header-l a{
      font-size: 30px;
      text-decoration: none;
      color: #fff;
      line-height: 1.5;
    }
    .header-r{
      margin-top: 5px;
    }
  }
</style>
