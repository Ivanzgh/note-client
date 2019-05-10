<template>
  <div>
    <el-card class="m20">
      <el-table
        :data="tableData"
        stripe
        :header-cell-style="{background:'#f2f2f2'}"
        style="width: 100%">
        <el-table-column
          label="序号"
          min-width="10%"
          align="center">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="文章标题"
          min-width="22%"
          :show-overflow-tooltip="true"
          align="center">
        </el-table-column>
        <el-table-column
          prop="commenter"
          label="评论者"
          min-width="13%"
          :show-overflow-tooltip="true"
          align="center">
        </el-table-column>
        <el-table-column
          prop="commentBody"
          label="评论内容"
          min-width="25%"
          :show-overflow-tooltip="true"
          align="center">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="评论日期"
          min-width="15%"
          :show-overflow-tooltip="true"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="15%"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="commentDelete(scope.row._id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        page: 1,
        count: 0,
      }
    },
    methods: {
      //获取评论
      getComment() {
        this.$axios.get('/comment',{page:this.page}).then(res => {
          if (res.code === 200) {
            console.log(res);
            this.tableData = res.data
            this.count = res.count
            for (let i=0; i<this.tableData.length;i++) {
              this.tableData[i].createTime = this.convertUTCTimeToLocalTime(this.tableData[i].createTime)
              this.tableData[i].title = this.tableData[i].article_id.title
              this.tableData[i].commenter = this.tableData[i].user_id.username
            }
          }
        })
      },
      //分页
      pageChange(index) {
        this.page = index;
        this.getComment();
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

      //删除
      commentDelete(id) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/delComment', {_id: id}).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.getComment()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

    },
    created() {
      this.getComment()

    }
  }
</script>

<style scoped lang="scss">
  .block {
    margin-top: 30px;
  }
</style>

