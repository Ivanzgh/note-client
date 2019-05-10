<template>
  <div>
    <el-card class="m20">
      <div class="query">
        <!--搜索框-->
        <el-input
          class="search"
          placeholder="请输入姓名或email"
          clearable
          v-model="keyword"
          prefix-icon="el-icon-search"
          @keyup.enter.native="userSearch"></el-input>
        <el-button size="small" type="primary" @click="userSearch">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        stripe
        :header-cell-style="{background:'#f2f2f2'}"
        style="width: 100%">
        <el-table-column
          label="序号"
          min-width="5%"
          align="center">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="avatar"
          label="头像"
          min-width="15%"
          align="center">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" alt="" class="table-item-img">
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          min-width="15%"
          :show-overflow-tooltip="true"
          align="center">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          min-width="12%"
          :show-overflow-tooltip="true"
          align="center">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          min-width="20%"
          :show-overflow-tooltip="true"
          align="center">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册日期"
          min-width="18%"
          :show-overflow-tooltip="true"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          :show-overflow-tooltip="true"
          min-width="20%">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="adminEdit(scope.row._id)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="adminDelete(scope.row._id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
      getUser() {
        this.$axios.get('/allUser',{page:this.page}).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.tableData = res.data
            this.count = res.count
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i].createTime = this.convertUTCTimeToLocalTime(this.tableData[i].createTime)
            }
          }
        })
      },
      pageChange(index) {
        this.page = index;
        this.getUser();
      },
      // UTC时间格式转化为本地时间
      convertUTCTimeToLocalTime(UTCDateString) {
        if (!UTCDateString) {
          return '----';
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
      //搜索框
      userSearch() {
        this.$axios.post('/userSearch', {keyword: this.keyword, page: this.page}).then(res => {
          if (res.code === 200) {
            console.log(res);
            this.tableData = res.data
            for (let i = 0; i < this.tableData.length; i++) {
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
      //修改
      adminEdit(id) {
        this.$router.push({path:'/manage/adminAdmin/updateUser',query: {id}})
      },
      //删除
      adminDelete(id) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/delUser', {_id: id}).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.getUser()
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
      this.getUser()
    }
  }
</script>

<style scoped lang="scss">
  .table-item-img {
    height: 80px;
    width: 80px;
  }
  .block {
    margin-top: 30px;
  }
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
</style>
