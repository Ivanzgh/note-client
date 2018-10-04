<template>
  <div>
    <div class="article-wrap" v-for="(item ,index) in articleData" :key="index" :label="item" v-if="item.author">
      <router-link :to="{path:'/article',query:{id:item._id}}" class="user-msg clearfix">
        <div class="avatar fl">
          <img :src="item.author.avatar">
        </div>
        <div class="author-msg fl">
          <div class="row1">
            <span class="author-name" v-text="item.author.username">作者</span>
            <span class="divide">|</span>
            <span class="article-title" v-text="item.title">最好的云笔记</span>
          </div>
          <div class="row2">
            <span class="strong">浏览：<span v-text="item.looknums"></span></span>
            <span class="strong">回复：<span v-text="item.commontnums"></span></span>
            <span class="strong">分类：<span v-text="item.category.name"></span></span>
          </div>
        </div>
      </router-link>
      <div class="article-msg" v-text="item.contentText">你值得拥有</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        articleData: []

      }
    },
    methods: {
      getData() {
        this.$axios.get('/article').then(res => {
          if (res.code === 200) {
            this.articleData = res.data
          }
        })
      }
    },
    created() {
      this.getData()

    }
  }
</script>

<style scoped lang="scss">
  .article-wrap {
    width: 750px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    margin-top: 30px;

    .user-msg {
      display: block;
      text-decoration: none;
      padding: 24px;
      background: #fff;

      .avatar {
        width: 70px;
        height: 70px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .author-msg {
        margin-left: 15px;
      }
      .row1 {
        line-height: 24px;
      }
      .row2 {
        margin-top: 5px;
        width: 605px;
        color: #555;
        background: #bbb;
        padding: 6px;
        border-radius: 4px;
      }
      .author-name {
        font-weight: 700;
        color: #409eff;
      }
    }
  }
</style>
