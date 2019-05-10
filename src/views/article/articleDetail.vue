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
    <div class="share">
      <div class="share-title">分享</div>
      <div style="display: flex;justify-content: center;">
        <div class="share-weibo" @click="shareWeibo"></div>
        <div class="share-qq" @click="shareQQ"></div>
      </div>
    </div>

    <div class="footer-wrap">
      <div class="comment">
        <div class="comment-header">
          <span style="margin-left: 20px;">评论 :</span>
        </div>
        <el-input type="textarea" v-model="articleData.comment" placeholder="文明社会，理性评论"></el-input>
        <div style="display: flex;">
          <el-button type="primary" class=" btn-comment" size="small" @click="handleComment">畅言一下</el-button>
        </div>
      </div>
      <div class="comment-area">
        <div class="comment-list" v-for="(item,index) in commentList" :key='index' :label="item">
          <div class="user-header">
            <img :src="item.user_id.avatar" alt="">
            <div class="name">{{item.user_id.username}}</div>
          </div>
          <div v-text="item.commentBody" class="comment-content"></div>
          <div class="comment-date">
            <div style="flex: 0 0 auto;margin-left: auto">
              <span>发布于</span>
              {{item.createTime}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        articleData: {},
        commentList: []      //评论列表
      }
    },
    methods: {
      getData() {
        this.$axios.get(`/article/${this.$route.query.id}`).then(res => {
          this.articleData = res.data
          console.log(this.articleData);
          this.id = this.articleData._id
          this.articleData.createTime = this.convertUTCTimeToLocalTime(this.articleData.createTime)
        })
      },
      // UTC时间格式转化为本地时间
      convertUTCTimeToLocalTime(UTCDateString) {
        if (!UTCDateString) {
          return '-';
        }
        function formatFunc(str) {    //格式化显示
          return str > 9 ? str : '0' + str
        }
        const date2 = new Date(UTCDateString);
        const year = date2.getFullYear();
        const mon = formatFunc(date2.getMonth() + 1);
        const day = formatFunc(date2.getDate());
        let hour = date2.getHours();
        hour = formatFunc(hour);
        const min = formatFunc(date2.getMinutes());
        const dateStr = year + '-' + mon + '-' + day + ' ' + ' ' + hour + ':' + min;
        return dateStr;
      },
      //发布评论
      handleComment() {
        if (this.articleData.comment === undefined) {
          this.$message.info('评论后才能发布哦')
        } else {
          const comment_data = {
            'commentBody': this.articleData.comment,
            'article_id': this.articleData._id
          }
          this.$axios.post('/addComment', comment_data).then(res => {
            console.log(res);
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.articleData.comment = ''
              this.getComment()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      },
      //获取评论
      getComment() {
        this.$axios.get(`/comment/${this.$route.query.id}`).then(res => {
          if (res.code === 200) {
            console.log(res);
            this.commentList = res.data
            for (let i = 0; i < this.commentList.length; i++) {
              this.commentList[i].createTime = this.convertUTCTimeToLocalTime(this.commentList[i].createTime)
            }
          }
        })
      },
      shareWeibo() {
        const sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + this.articleData.title
          + '&url=' + window.location.href
          + '&content=utf-8&sourceUrl=' + window.location.href;
        window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=300');
      },
      shareQQ() {
        const shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + this.articleData.title
          + '&url=' + window.location.href
        window.open(shareqqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100');
      }

    },
    created() {
      this.getData()
      this.getComment()
    }
  }
</script>

<style scoped lang="scss">
  .article {
    width: 980px;
    margin: 50px auto 0;
    box-sizing: border-box;
    padding: 60px 40px;
    border-radius: 6px;
    background: #fff;
  }

  .img-wrap {
    width: 50px;
    height: 50px;
  }

  .author-detail {
    margin-left: 15px;
  }

  .author-name {
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }

  .date {
    padding: 10px 0;
    color: #555;
    font-size: 12px;

    .format-date {
      margin-right: 6px;
    }
  }

  .title {
    text-align: center;
  }

  .share {
    text-align: center;
    .share-title {
      color: #999;
      font-size: 20px;
      margin: 20px 0;
    }
    .share-weibo {
      width: 30px;
      height: 30px;
      margin-right: 20px;
      background-image: url('../../assets/weibo.png');
      background-size: cover;
    }
    .share-qq {
      width: 30px;
      height: 30px;
      background-image: url('../../assets/QQ.png');
      background-size: cover;
    }
  }

  .footer-wrap {
    border-top: 1px dotted #999;
    margin-top: 30px;
    .comment {
      margin-top: 20px;
    }
    .comment-header {
      margin-bottom: 20px;
      background-color: #bbb;
      font-size: 18px;
      height: 30px;
      line-height: 30px;
      opacity: .7;
    }
    .btn-comment {
      margin-top: 20px;
      flex: 0 0 auto;
      margin-left: auto
    }
  }

  .comment-area {
    margin-top: 20px;
    background-color: #f0f0f0;
    opacity: .8;
    .comment-list {
      border-bottom: 1px solid #bbb;
      padding: 0 20px;
    }
    .user-header {
      display: flex;
      align-items: center;
      padding-top: 10px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        font-size: 18px;
      }
    }
    .comment-content {
      margin: 20px 0;
    }
    .comment-date {
      margin-bottom: 20px;
      font-size: 14px;
      display: flex;
    }
  }
</style>
