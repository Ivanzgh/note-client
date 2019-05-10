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
          prop="name"
          label="分类名称"
          min-width="30%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加日期"
          min-width="30%"
          align="center">
        </el-table-column>
        <el-table-column label="操作" min-width="30%" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="showCategoryDialog(scope.row._id)">添加
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="categoryDelete(scope.row._id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="添加分类"
        :visible.sync="dialogVisible"
        width="30%">
        <el-input v-model="newCategory"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCategory">确 定</el-button>
        </span>
      </el-dialog>
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
        dialogVisible : false,
        newCategory : ''
      }
    },
    methods: {
      //获取分类
      getCategory() {
        this.$axios.get('/categories',{page:this.page}).then(res => {
          console.log(res)
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
        this.getCategory();
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
      //添加分类
      showCategoryDialog() {
        this.dialogVisible = true
      },
      addCategory() {
        this.$axios.post('/addCategory', {'name': this.newCategory}).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.dialogVisible = false
            this.$message.success(res.msg)
            this.getCategory()
          }
        })
      },
      //删除
      categoryDelete(id) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/delCategory', {_id: id}).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.getCategory()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

    }
    ,
    created() {
      this.getCategory()

    }
  }
</script>

<style scoped lang="scss">
  .block {
    margin-top: 30px;
  }
</style>
