<template>
  <div>
    <el-row style="height: 50px;">
      <Header></Header>
    </el-row>
    <el-row>
      <el-col :span="4" style="height: calc(100vh - 51px);background-color: #263445">
        <SideBar></SideBar>
      </el-col>
      <el-col :span="20" style="height: calc(100vh - 51px);">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Header from '../../components/Header'
  import SideBar from '../../components/SideBar'

  export default {
    name: "index",
    components: {
      Header,
      SideBar
    }
  }
</script>

<style scoped>

</style>
