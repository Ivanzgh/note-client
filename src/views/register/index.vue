<template>
  <div class="register-wrap">
    <div class="register-title">新用户注册</div>
    <el-form :model="formData" :rules="rules" ref="formData">
      <el-form-item class="input-wrap" prop="username">
        <el-input placeholder="用户名" clearable v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item class="input-wrap" prop="email">
        <el-input placeholder="电子邮箱" clearable v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item class="input-wrap" prop="password">
        <el-input type="password" placeholder="密码" clearable v-model="formData.password"
                  @keyup.enter="handleRegister"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="handleRegister('formData')">注册</el-button>
      </el-form-item>
    </el-form>
    <div class="goLogin">
      <span style="color: #ccc;">已有账号可</span>
      <span style="color: #409eff;cursor: pointer;" @click="goLogin">直接登录</span>
    </div>
  </div>
</template>

<script>
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
          username: '',
          email: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
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
      handleRegister(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/register', this.formData).then(res => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                setTimeout(() => {
                  this.$router.push('/index')
                }, 500)
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
      goLogin() {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="scss">
  .register-wrap {
    margin: 70px auto;
    padding: 40px;
    width: 500px;
    height: 340px;
    background: #fff;
    border-radius: 6px;

    .register-title {
      color: #333;
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 30px;
    }

    .input-wrap {
      width: 390px;
      margin: 0 auto 30px;
    }
    .btn {
      width: 390px;
      margin: 0 auto;
      /deep/ .el-button {
        width: 100%;
      }
    }
    .goLogin {
      font-size: 14px;
      margin: 20px auto;
      width: 150px;
    }
  }
</style>
