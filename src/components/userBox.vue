<template>
    <div class="right-box fr">
      <div class="login-box" v-if="!userInfo.username">
        <div class="input-wrap mb30">
          <input type="text" class="input" placeholder="邮箱" v-model="formData.email">
        </div>
        <div class="input-wrap mb30">
          <input type="password" class="input" placeholder="密码" v-model="formData.password"
                 @keyup.enter="handleLogin">
        </div>
        <div class="btn-wrap mb30">
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </div>
        <div class="btn-wrap mb30">
          <el-button @click="handleRegister">注册</el-button>
        </div>
      </div>

        <div class="user-msg-box" v-else>
          <div class="img-wrap">
            <img :src="userInfo.avatar" >
          </div>
          <div class="username">
            <span>{{userInfo.username}}</span>
          </div>
          <div class="user-email">
            <span>{{userInfo.email}}</span>
          </div>
          <div class="logout-wrap">
            <el-button type="warning" @click="handleLogout">退出</el-button>
          </div>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
    export default {
        data() {
          return {
            formData : {
              email : '123',
              password : '11111',
            }
          }
        },
      methods : {
        handleRegister() {
          this.$router.push('/register')
        },
        handleLogin() {
          this.$axios.post('/login',this.formData).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg);
              this.$store.commit('CHANGE_USERINFO',res.data)

            }
          })
        },
        handleLogout() {
          this.$axios.get('/logout').then(res => {
            let userInfo = {
              avatar : '',
              email : '',
              username : ''
            };
            if (res.code === 200) {
              this.$message.success(res.msg);
              this.$router.push('/index');
              //清空vuex中保留的数据
              this.$store.commit('CHANGE_USERINFO',userInfo)
            }else {
              this.$store.commit('CHANGE_USERINFO',userInfo);
              this.$message.info('登录状态失效')
            }
          })
        }

      },
      computed : {
        ...mapState(['userInfo'])
      }
    }
</script>

<style scoped lang="scss">
.right-box{
  box-sizing: border-box;
  width: 360px;
  height: 340px;
  background: #fff;
  border-radius: 4px;
  padding: 50px 35px 20px 35px;
  margin-top: 30px;

  .input{
    padding: 13px 18px;
    color: #333;
    font-size: 14px;
    outline: none;
    border: 1px solid #f1f1f1;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }
  /deep/ .el-button{
    width: 100%;
  }

  //用户信息盒子
  .username,.user-email{
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: #444;
    padding: 5px 0;
  }
  .user-msg-box{
    .img-wrap{
      width: 150px;
      height: 150px;
      margin: 0 auto 10px;

      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .logout-wrap {
      /deep/ .el-button{
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
