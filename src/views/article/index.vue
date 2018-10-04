<template>
    <div class="article">
      <div class="author-msg clearfix" v-if="articleData.author">
        <div class="img-wrap fl">
          <img :src="articleData.author.avatar" class="img">
        </div>
        <div class="author-detail fl">
          <div class="author-name">
            {{articleData.author.username}}
          </div>
          <div class="date">
            <span class="format-date">
              {{articleData.createTime}}
            </span>
            <span>
              阅读 {{articleData.looknums}}
            </span>
          </div>
        </div>
      </div>
      <h1 class="title">
        {{articleData.title}}
      </h1>
      <div class="content-html" v-html="articleData.content"></div>
    </div>
</template>

<script>
    export default {
        data() {
          return {
             articleData : {}
          }
        },
      methods : {
          getData() {
            this.$axios.get(`/article/${this.$route.query.id}`).then(res => {
                this.articleData = res.data
              })
          }
      },
      created() {
          this.getData()
      }
    }
</script>

<style scoped lang="scss">
  .article{
    width: 980px;
    margin: 50px auto 0;
    box-sizing: border-box;
    padding: 60px 40px;
    border-radius: 6px;
    background: #fff;
  }
  .img-wrap{
    width: 50px;
    height: 50px;
  }
  .author-detail{
    margin-left: 15px;
  }
  .author-name{
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }
  .date{
    padding: 10px 0;
    color: #555;
    font-size: 12px;

    .format-date{
      margin-right: 6px;
    }
  }
</style>
