<template>
  <div class="message">
    <el-card class="w1170">
      <div class="message-board">
        <div class="message-board-header">
          <span style="margin-left: 20px;">留言 ：</span>
        </div>
        <el-input type="textarea" v-model="formData.message" placeholder="请留下你的足迹吧"></el-input>
        <div style="display: flex;">
          <el-button type="primary" class=" btn-message-board" size="small" @click="handleMessageBoard">畅言一下</el-button>
        </div>
      </div>
      <div class="message-board-area">
        <div class="message-board-list" v-for="(item,index) in messageBoardList" :key='index' :label="item">
          <div class="message-avatar-username">
            <img :src="item.author.avatar" alt="">
            <div class="username" v-text="item.author.username"></div>
          </div>
          <div v-text="item.content" class="message-board-content"></div>
          <div class="message-board-date">
            <div style="flex: 0 0 auto;margin-left: auto">
              <span>发布于</span>
              {{item.createTime}}
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: {},
        messageBoardList: []
      }
    },
    methods: {
      handleMessageBoard() {
        if (this.formData.message === undefined ) {
          this.$message.info('内容不能为空')
        }else {
          this.$axios.post('/addMessageBoard', {content : this.formData.message}).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              console.log(res);
              this.formData.message = ''
              this.getMessageList()
            }else {
              this.$message.error(res.msg)
            }
          })
        }
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
      getMessageList() {
        this.$axios.get('/messageBoard').then(res => {
          if (res.code === 200) {
            console.log(res);
            this.messageBoardList = res.data
            for (let i=0; i<this.messageBoardList.length;i++) {
              this.messageBoardList[i].createTime = this.convertUTCTimeToLocalTime(this.messageBoardList[i].createTime)
            }
          }
        })
      }
    },
    created() {
      this.getMessageList()
    }
  }
</script>

<style scoped lang="scss">
  .message {
    margin-top: 66px;
  }
  .message-board {
    margin-top: 20px;
  }

  .message-board-header {
    margin-bottom: 20px;
    background-color: #bbb;
    font-size: 18px;
    height: 30px;
    line-height: 30px;
    opacity: .7;
  }

  .btn-message-board {
    margin-top: 20px;
    flex: 0 0 auto;
    margin-left: auto
  }

  .message-board-area {
    margin-top: 20px;
    background-color: #f0f0f0;
    opacity: .8;
    .message-board-list {
      border-bottom: 1px solid #bbb;
      padding: 0 20px;
      .message-avatar-username {
        display: flex;
        align-items: center;
        padding-top: 10px;
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .username {
        font-size: 20px;
        margin-left: 20px;
      }
    }
    .message-board-content {
      margin: 20px 0;
    }
    .message-board-date {
      margin-bottom: 20px;
      font-size: 14px;
      display: flex;
    }
  }
</style>
