<template>
  <div class="write-note">
    <div class="write-content w1170">
      <div class="title">标题</div>
      <div class="text-title">
        <el-input placeholder="请输入标题" v-model="formData.title"></el-input>
      </div>
      <div class="title">内容</div>
      <quill-editor
        v-model="formData.content"
        ref="myQuillEditor"
        :options="editorOption"
        @change="handleChange($event)"
      >
      </quill-editor>
      <div class="category">
        <div class="tag">分类</div>
        <el-select v-model="formData.category" placeholder="请选择">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </div>
      <div style="text-align: center;">
        <el-button type="primary" size="medium" @click="handleWrite" v-if="!isEdit">发布文章</el-button>
        <el-button type="primary" size="medium" @click="handleSave" v-else>保存修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  Quill.register('modules/ImageExtend', ImageExtend);
  export default {
    components: {
      quillEditor
    },
    data() {
      return {
        formData: {
          title: '',
          content: '',
          contentText: '',
          category: ''
        },
        isEdit: false,
        categories: [],
        // 富文本框参数设置
        editorOption: {
          modules: {
            ImageExtend: {
              loading: true,
              name: 'img',
              action: 'https://qiniu.com',
              response: (res) => {
                return res.info
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        }
      }
    },
    methods: {
      handleChange({quill, html, text}) {
        this.formData.contentText = text;
        this.formData.contentText = this.formData.contentText.substring(0, 200) + '...'
      },
      //获取分类
      getCategory() {
        this.$axios.get('/categories').then(res => {
          this.categories = res.data
          console.log(res);
        })
      },
      //发布文章
      handleWrite() {
          this.$axios.post('/saveArticle', this.formData).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg);
              this.$router.push('/index')
            } else if (res.code === 403) {
              this.$router.push('/index')
            }
          })
      },
      //修改文章
      handleSave() {
        this.$axios.patch(`/updateArticle/${this.$route.query.id}`,this.formData).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg);
            this.$router.push('/index')
          }
        })
      },
      //获取编辑前的数据
      getEditData() {
        this.$axios.get(`/article/${this.$route.query.id}`).then(res => {
          console.log(res.data);
          this.formData = res.data
        })
      },
    },
    created() {
      this.getCategory()
      if (this.$route.name === 'editArticle') {
        this.isEdit = true
      } else {
        this.isEdit = false
      }
      if (this.isEdit) {
        this.getEditData()
      }
    },
    watch : {
      $route(to,form) {
        if (to.name == 'editArticle') {
          this.isEdit = true
        } else {
          this.isEdit = false
          this.formData = {
            title: '',
            content: '',
            contentText: '',
            category: ''
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .write-content {
    margin-top: 30px;
    border-radius: 6px;
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
    .title {
      line-height: 2;
      font-size: 20px;
      font-weight: 500;
    }
    .category {
      margin: 30px 0;
      display: flex;
      .tag {
        color: #4090ff;
        font-weight: 700;
        font-size: 16px;
      }
      .el-select {
        margin-left: 20px;
      }
    }
  }
</style>
<style>
  .ql-container {
    min-height: 200px;
  }
</style>

