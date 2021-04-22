<template>
  <div class="container">
    <el-row>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button round @click="doSearch">查询</el-button>
    </el-row>
    <div class="table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          label="编号"
          prop="id"
          width="180">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="name"
          width="180">
        </el-table-column>
        <el-table-column
          label="学号"
          prop="number">
        </el-table-column>
        <el-table-column
          label="成绩"
          prop="grade"
          show-password
          type="password">
        </el-table-column>
        <el-table-column
          label="等级"
          prop="level">
        </el-table-column>
        <el-table-column
          label="密码"
          type="password"
          prop="password">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="editInfo(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-drawer
      title="信息修改"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
      <el-form :model="studentForm" ref="studentForm" label-width="100px">
        <el-form-item label="编号">
          <el-input v-model="studentForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="studentForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="studentForm.number"></el-input>
        </el-form-item>
        <el-form-item label="成绩">
          <el-input v-model="studentForm.grade"></el-input>
        </el-form-item>
        <el-form-item label="等级">
          <el-input v-model="studentForm.level"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="studentForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button round @click="submitInfo">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import $api from '../../api/api_teacher'

export default {
  name: 'MyStudents',
  data () {
    return {
      options: null,
      value: '',
      tableData: null,
      drawer: false,
      direction: 'rtl',
      studentForm: {
        id: '',
        name: '',
        number: '',
        grade: '',
        level: '',
        password: ''
      }
    }
  },
  methods: {
    submitInfo () {
      const data = {
        id: this.studentForm.id,
        number: this.studentForm.number,
        grade: this.studentForm.grade,
        level: this.studentForm.level,
        password: this.studentForm.password
      }
      $api.setInfo(data)
        .then(response => {
          if (response.data.status === '200') {
            this.$message.success('成功修改')
            this.drawer = false
            this.doSearch()
          } else {
            this.$message.success('修改失败')
          }
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
    },
    editInfo (event) {
      this.studentForm = event
      this.drawer = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    doSearch () {
      if (this.value === '') {
        this.$message.error('请选择一个课程')
      } else {
        const data = {
          value: this.value
        }
        $api.getStudents(data)
          .then(response => {
            this.tableData = response.data.tableData
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
  },
  created () {
    const data = {
      number: '1'
    }
    $api.getMyCourse(data)
      .then(response => {
        console.log(response.data)
        this.options = response.data.options
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
