<template>
  <div class="write-note">
    <div class="write-content w1170">
      <div class="title">标题</div>
      <div class="text-title">
        <el-input placeholder="测试标题" v-model="formData.title"></el-input>
      </div>
      <div class="title">内容</div>
          <quill-editor
            v-model="formData.content"
            ref="myQuillEditor"
            :options="editorOption"
            @chang="handleChange"
          >
          </quill-editor>
      <div class="category">
        <span class="strong clearfix">
          <span class="fl">分类:</span>
          <div class="fl" style="margin-left: 20px">
            <Radios :options="categories" v-model="formData.category"></Radios>
          </div>
        </span>
      </div>
      <el-button type="primary" @click="handleWrite">
        发布笔记
      </el-button>
    </div>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

  import Radios from '@/components/Radios'

  Quill.register('modules/ImageExtend', ImageExtend);
    export default {
      components: {quillEditor ,Radios},
      data() {
        return {
          formData : {
            title : '',
            content: '',
            contentText : '',
            category : ''
          },
          categories : [],
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
      methods : {
        handleWrite() {
          this.$axios.post('/article',this.formData).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg);
              this.$router.push('/index')
            }else if (res.code === 403) {
              this.$router.push('/index')
            }
          })
        },
        handleChange({quill,html,text}) {
          this.formData.contentText = text;
          this.formData.contentText = this.formData.contentText.substring(0,200) + '...'
        },
        getCategory() {
          this.$axios.get('/categories').then(res => {
            this.categories = res.data
          })
        }
      },
      created() {
        this.getCategory()
      }
    }
</script>

<style scoped lang="scss">
  .write-content{
    margin-top: 30px;
    border-radius: 6px;
    background: #fff;
    padding: 30px;
    box-sizing: border-box;

    .title{
      line-height: 2;
      font-size: 20px;
      font-weight: 500;
    }
    .category {
      margin: 30px 0;
      .strong{
        color: #4090ff;
        font-weight: 700;
        font-size: 16px;
      }
    }
  }
</style>
<style>
  .ql-container{
    min-height: 200px;
  }
</style>

