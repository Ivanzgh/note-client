<template>
  <div class="right-box fr">
    <div class="login-box" v-if="!userInfo.username">
      <el-form :model="formData" :rules="rules" ref="formData">
        <el-form-item class="input-wrap mb30" prop="email">
          <el-input type="text" class="input" placeholder="电子邮箱" v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item class="input-wrap mb30" prop="password">
          <el-input type="password" class="input" placeholder="密码" v-model="formData.password"
                    @keyup.enter="handleLogin"></el-input>
        </el-form-item>
        <el-form-item class="btn-wrap mb30">
          <el-button type="primary" @click="handleLogin('formData')">登录</el-button>
        </el-form-item>
        <el-form-item class="btn-wrap mb30">
          <el-button @click="handleRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="user-msg-box" v-else>
      <div class="img-wrap">
        <img :src="userInfo.avatar">
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
  import {mapState} from 'vuex'

  export default {
    data() {
      var checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        setTimeout(() => {
          if (mailReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的邮箱格式'))
          }
        }, 100)
      }
      return {
        formData: {
          email: '',
          password: '',
        },
        rules: {
          email: [
            {validator: checkEmail, trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 5, message: '长度至少5个字符', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      handleRegister() {
        this.$router.push('/register')
      },
      handleLogin(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/login', this.formData).then(res => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                this.$store.commit('CHANGE_USERINFO', res.data)
                console.log(res);
                if (res.data.email === '1972571253@qq.com') {
                  this.$store.commit('CHANGE_ADMIN', true)
                }
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      handleLogout() {
        this.$axios.get('/logout').then(res => {
          let userInfo = {
            avatar: '',
            email: '',
            username: ''
          };
          let admin = '';
          if (res.code === 200) {
            this.$message.success(res.msg);
            this.$router.push('/index');
            //清空vuex中保留的数据
            this.$store.commit('CHANGE_USERINFO', userInfo)
            this.$store.commit('CHANGE_ADMIN', admin)
          } else {
            this.$store.commit('CHANGE_USERINFO', userInfo);
            this.$store.commit('CHANGE_ADMIN', admin)
            this.$message.info('登录状态失效')
          }
        })
      }
    },
    computed: {
      ...mapState(['userInfo'])
    }
  }
</script>

<style scoped lang="scss">
  .right-box {
    box-sizing: border-box;
    width: 360px;
    height: 340px;
    background: #fff;
    border-radius: 4px;
    padding: 50px 35px 20px 35px;
    margin-top: 20px;
    .input {
      color: #333;
      font-size: 14px;
      outline: none;
      border: 1px solid #f1f1f1;
      border-radius: 4px;
      width: 100%;
      box-sizing: border-box;
    }
    /deep/ .el-button {
      width: 100%;
    }
    //用户信息盒子
    .username, .user-email {
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      color: #444;
      padding: 5px 0;
    }
    .user-msg-box {
      .img-wrap {
        width: 150px;
        height: 150px;
        margin: 0 auto 10px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .logout-wrap {
        /deep/ .el-button {
          display: block;
          width: 100%;
        }
      }
    }
  }
</style>
