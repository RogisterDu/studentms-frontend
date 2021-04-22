<template>
  <div class="container">
    <div class="table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="course"
          label="课程"
          width="180">
        </el-table-column>
        <el-table-column
          prop="teacher"
          label="老师">
        </el-table-column>
        <el-table-column
          prop="scores"
          label="成绩">
        </el-table-column>
        <el-table-column
          prop="level"
          label="等级">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import $api from '../../api/api_student'

export default {
  name: 'MyGrades',
  data () {
    return {
      tableData: null
    }
  },
  created () {
    const data = {
      id: '3'
    }
    $api.getGrades(data)
      .then(response => {
        this.tableData = response.data.backdata
      })
      .catch(function (error) {
        try {
          if (error.response.status === 405) {
            console.log('子组件收到 405')
          } else {
            console.log('获取数据：', error)
            this.$message({
              showClose: true,
              message: '服务器内部错误或者服务异常，请检查： ' + error,
              offset: 66,
              type: 'warning'
            })
          }
        } catch (e) {
          console.log('获取数据：', error)
          this.$message({
            showClose: true,
            message: '连接服务器端失败，请检查网络：' + error,
            offset: 66,
            type: 'warning'
          })
        }
      })
      .finally(function () {
      })
  }
}
</script>

<style scoped>

</style>
