<template>
  <div class="edit-user">
    <el-card class="m20">
      <div slot="header">
        编辑用户
      </div>
      <div class="form-wrap">
        <el-form size="small" :model="formData" label-width="120px" label-position="left">
          <el-form-item label="姓名：">
            <el-col :span="8">
              <el-input v-model="formData.username"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Email：">
            <el-col :span="8">
              <el-input v-model="formData.email"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码：">
            <el-col :span="8">
              <el-input v-model="formData.password"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="用户头像：">
            <uploadImg v-model="formData.avatar"></uploadImg>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitData">保存更改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import uploadImg from '@/components/uploadImg'

  export default {
    components: {
      uploadImg
    },
    data() {
      return {
        formData: {
          username: '',
          password: '',
          avatar: '',
        }
      }
    },
    methods: {
      getUserData() {
        this.$axios.get(`/user/${this.$route.query.id}`).then(res => {
          if (res.code === 200) {
            console.log(res);
            this.formData = res.data
          }
        })
      },
      submitData() {
        this.$axios.patch(`/updateUser/${this.$route.query.id}`, this.formData).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.$router.push('/manage/userAdmin')
          }
        })
      },
    },
    created() {
      this.getUserData()
    }
  }
</script>

<style scoped>

</style>
