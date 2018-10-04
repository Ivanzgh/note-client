<template>
    <div class="register-wrap">
        <div class="register-title">新用户注册</div>
        <div class="input-wrap">
          <el-input  placeholder="用户名" clearable v-model="formData.username"></el-input>
        </div>
        <div class="input-wrap">
          <el-input  placeholder="邮箱" clearable v-model="formData.email"></el-input>
        </div>
        <div class="input-wrap">
          <el-input type="password" placeholder="密码" clearable v-model="formData.password"
                    @keyup.enter.native="handleRegister"></el-input>
        </div>
        <div class="btn">
          <el-button type="primary" @click="handleRegister">注册</el-button>
        </div>
      </div>
</template>

<script>
    export default {
        data() {
          return {
            formData : {
              username : '',
              email : '',
              password : ''
            }
          }
        },
      methods : {
          handleRegister() {
            this.$axios.post('/register',this.formData).then(res => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                setTimeout(() =>{
                  this.$router.push('/index')
                },500)
              }else {
                this.$message.error(res.msg)
              }
            })
          }
      }
    }
</script>

<style scoped lang="scss">
  .register-wrap{
    margin: 50px auto;
    padding: 40px;
    width: 500px;
    height: 340px;
    background: #fff;
    border-radius: 6px;

    .register-title{
      color: #333;
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 30px;
    }

    .input-wrap{
      width: 390px;
      margin: 0 auto 30px;
    }
    .btn{
      width: 390px;
      margin: 0 auto;
      /deep/ .el-button {
        width: 100%;
      }
    }
  }
</style>
