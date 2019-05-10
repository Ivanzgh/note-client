<template>
  <div>
    <div class="content" style="display: flex;">
      <div class="content-left">
        <div class="search-result" v-if="articleData.length == 0">为您找到0条相关结果</div>
        <div class="article-wrap" v-for="(item ,index) in articleData" :key="index" :label="item" v-if="item.author">
          <router-link
            target="_blank"
            :to="{path:'/articleDetail',query:{id:item._id}}"
            class="user-msg"
            @click.native="handleClick(item._id)">
            <div class="user-msg-warp">
              <div class="avatar">
                <img :src="item.author.avatar">
              </div>
              <div class="author-msg">
                <div class="row1">
                  <span class="author-name" v-text="item.author.username"></span>
                  <span class="divide">|</span>
                  <span class="article-title" v-text="item.title"></span>
                </div>
                <div class="row2">
                  <span class="strong" style="margin-right: 10px;">浏览量：<span v-text="item.looknums"></span></span>
                  <!--<span class="strong">评论：<span v-text="item.commentnums"></span></span>-->
                  <span class="strong" style="margin-right: 10px;">分类：<span v-text="item.category.name"></span></span>
                  <span class="strong">发布时间：<span v-text="item.createTime"></span></span>
                </div>
              </div>
            </div>
            <div class="article-msg" v-text="item.contentText"></div>
          </router-link>
        </div>
      </div>
      <div class="content-right">
        <!--搜索框-->
        <div class="search-wrap">
          <el-input
            class="search"
            placeholder="请输入内容"
            clearable
            v-model="keyword"
            prefix-icon="el-icon-search"
            @keyup.enter.native="handleSearch"></el-input>
          <el-button size="small" type="primary" @click="handleSearch">搜索</el-button>
        </div>
        <!--标签云-->
        <div class="tag-wrap">
          <div class="tag-header">热门标签</div>
          <div class="tag">
            <div class="tag-content" v-for="item in categories" :label="item">
              <el-button @click="handleTag(item._id)">{{item.name}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--分页-->
    <div class="block">
      <el-pagination
        @current-change="pageChange"
        :page-size="10"
        background
        layout="prev, pager, next"
        :total="count"
        align="center">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        articleData: [],
        page: 1,         // 当前页数
        count: 0,        // 数据总条目
        categories: [],   //所有分类
        keyword: '',    //搜索关键词
      }
    },
    methods: {
      getData() {
        this.$axios.get('/article',{page:this.page}).then(res => {
          if (res.code === 200) {
            console.log(res);
            for (let i=0;i<res.data.length;i++) {
              res.data[i].createTime = this.convertUTCTimeToLocalTime(res.data[i].createTime)
            }
            this.articleData = res.data
            this.count = res.count
          }
        })
      },
      handleClick(id) {
        this.$axios.patch(`/looknums/${id}`).then(res => {
          console.log(res);
        })
      },
      // UTC时间格式转化为本地时间
      convertUTCTimeToLocalTime(UTCDateString) {
        if(!UTCDateString){
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
        const dateStr = year+'-'+mon+'-'+day+' '+' '+hour+':'+min;
        return dateStr;
      },
      //分页
      pageChange(index) {
        this.page = index;
        this.getData();
      },
      //搜索框
      handleSearch() {
        this.$axios.post('/search',{keyword : this.keyword,page:this.page}).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            console.log(res);
            for (let i=0;i<res.data.length;i++) {
              res.data[i].createTime = this.convertUTCTimeToLocalTime(res.data[i].createTime)
            }
            this.articleData = res.data
            if (res.count === 0) {
              this.count = 1
            } else {
              this.count = res.count
            }
          }else {
            this.$message.error(res.msg)
          }
        })
      },
      //获取所有分类
      getCategory() {
        this.$axios.get('/categories').then(res => {
          if (res.code === 200) {
            this.categories = res.data
          }else {
            this.$message.error('获取分类失败')
          }
        })
      },
      //获取某一个分类下的所有文章
      handleTag(index) {
        this.$axios.post('/tagArticle',{tag:index,page:this.page}).then(res =>{
          if (res.code === 200) {
            console.log(res);
            for (let i=0;i<res.data.length;i++) {
              res.data[i].createTime = this.convertUTCTimeToLocalTime(res.data[i].createTime)
            }
            this.articleData = res.data
            if (res.count === 0) {
              this.count = 1
            } else {
              this.count = res.count
            }
          }
        })
      }
    },
    created() {
      this.getData()
      this.getCategory()
    }
  }
</script>

<style scoped lang="scss">
  .article-wrap {
    width: 750px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    margin-top: 20px;

    .user-msg {
      display: block;
      color: #000;
      text-decoration: none;
      padding: 20px;
      background: #fff;
      .user-msg-warp {
        display: flex;
      }
      .avatar {
        width: 70px;
        height: 70px;
        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
      .author-msg {
        margin-left: 15px;
      }
      .row1 {
        line-height: 24px;
        .article-title {
          color: #333;
        }
      }
      .row2 {
        margin-top: 5px;
        width: 605px;
        color: #555;
        background: #f4f5f5;
        padding: 6px;
        border-radius: 4px;
        font-size: 14px;
      }
      .author-name {
        font-weight: 700;
        color: #409eff;
      }
    }
  }
  .block {
    margin-top: 30px;
  }
  .article-msg {
    margin: 20px 20px 10px 20px;
    height: 60px;
    font-size: 14px;
    line-height: 20px;
    color: #555;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .content-left {
    .search-result {
      height: 100px;
      color: #666;
      padding: 20px 0 0 20px;
      width: 730px;
      background: #fff;
      border-radius: 6px;
      margin-top: 20px;
    }
  }
  .content-right {
    margin-top: 20px;
    margin-left: 56px;
  }
  .search {
    width: 230px;
    height: 30px;
    margin-right: 10px;
  }
  /deep/ .el-input__inner {
    height: 34px;
    line-height: 34px;
  }

  .tag-wrap {
    margin-top: 20px;
    .tag-header {
      color: #666;
      font-weight: 500;
      font-size: 18px;
      border-left: 6px solid #409eff;
      padding-left: 10px;
    }
    .tag {
      display: flex;
      flex-wrap: wrap;
    }
    .tag-content {
      margin-top: 20px;
      margin-right: 10px;
    }
  }
</style>
