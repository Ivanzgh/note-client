<template>
  <div>
    <el-card class="m20">
      <div class="query">
        <!--搜索框-->
        <el-input
          class="search"
          placeholder="请输入标题"
          clearable
          v-model="keyword"
          prefix-icon="el-icon-search"
          @keyup.enter.native="articleSearch"></el-input>
        <el-button size="small" type="primary" @click="articleSearch">搜索</el-button>
      </div>
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
          label="标题"
          min-width="30%"
          :show-overflow-tooltip="true"
          align="center">
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          min-width="10%"
          :show-overflow-tooltip="true"
          align="center">
        </el-table-column>
        <el-table-column
          prop="category"
          label="分类"
          min-width="10%"
          :show-overflow-tooltip="true"
          align="center">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="发布日期"
          min-width="20%"
          :show-overflow-tooltip="true"
          align="center">
        </el-table-column>
        <el-table-column label="操作" min-width="20%" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="articleEdit(scope.row._id)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="articleDelete(scope.row._id)">删除
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
        page: 1,         // 当前页数
        count: 0,        // 数据总条目
        keyword: ''
      }
    },
    methods: {
      getArticle() {
        this.$axios.get('/article', {page: this.page}).then(res => {
          if (res.code === 200) {
            console.log(res);
            this.tableData = res.data
            this.count = res.count
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i].author = this.tableData[i].author.username
              this.tableData[i].category = this.tableData[i].category.name
              this.tableData[i].createTime = this.convertUTCTimeToLocalTime(this.tableData[i].createTime)
            }
          }
        })
      },
      //分页
      pageChange(index) {
        this.page = index;
        this.getArticle();
      },
      //搜索框
      articleSearch() {
        this.$axios.post('/search', {keyword: this.keyword, page: this.page}).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            console.log(res);
            this.tableData = res.data
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i].author = this.tableData[i].author.username
              this.tableData[i].category = this.tableData[i].category.name
              this.tableData[i].createTime = this.convertUTCTimeToLocalTime(this.tableData[i].createTime)
            }
            if (res.count === 0) {
              this.count = 1
            } else {
              this.count = res.count
            }
          } else {
            this.$message.error(res.msg)
          }
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
      //跳转到编辑文章页
      articleEdit(id) {
        this.$router.push({path: '/editArticle', query: {id: id}})
      },

      //删除
      articleDelete(id) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/delArticle', {_id: id}).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.getArticle()
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
      this.getArticle()

    }
  }
</script>

<style scoped lang="scss">
  .query {
    display: flex;
    margin-bottom: 10px;
  }
  /deep/ .el-input {
    width: 250px;
    height: 30px;
    margin-right: 10px;
  }
  /deep/ .el-input__inner {
    width: 250px;
    height: 30px;
    line-height: 30px;
  }

  .block {
    margin-top: 30px;
  }
</style>
