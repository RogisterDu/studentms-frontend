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
      <el-button round @click="addnewcoursedrawer">新增课程</el-button>
      <el-button round @click="doSearch">删除当前课程</el-button>

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
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="editInfo(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-drawer
      :before-close="handleClose"
      :direction="direction"
      :visible.sync="drawer"
      title="信息修改">
      <el-form ref="studentForm" :model="studentForm" label-width="100px">
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
        <el-form-item>
          <el-button round @click="submitInfo">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!--    添加课程-->

    <el-drawer
      :before-close="handleClose"
      :direction="direction"
      :visible.sync="coursedrawer"
      title="添加课程">
      <el-form ref="courseForm" :model="courseForm" label-width="100px">
        <el-form-item label="名称">
          <el-input v-model="courseForm.name" style="width:  200px"></el-input>
        </el-form-item>
        <el-form-item label="负责老师">
          <el-select v-model="courseForm.value" placeholder="请选择">
            <el-option
              v-for="item in teacheroptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button round @click="insertCourse">添加</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import $api from '../../api/api_admin'

export default {
  name: 'CourseMS',
  data () {
    return {
      options: null,
      teacheroptions: null,
      value: '',
      tableData: null,
      drawer: false,
      direction: 'rtl',
      studentForm: {
        id: '',
        name: '',
        number: '',
        grade: '',
        level: ''
      },
      courseForm: {
        name: '',
        value: ''
      },
      coursedrawer: false
    }
  },
  methods: {
    insertCourse () {
      const data = {
        name: this.courseForm.name,
        value: this.courseForm.value
      }
      if (this.value === '') {
        this.$message.error('请添加老师')
      } else {
        $api.addNewCourse(data)
          .then(response => {
            if (response.data.status === '200') {
              this.$message.success('添加成功')
              this.coursedrawer = false
            } else {
              this.$message.error('未能添加请检测1')
              this.coursedrawer = false
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
      }
    },
    addnewcoursedrawer () {
      this.coursedrawer = true
      const data = {
        temp: '1'
      }
      $api.getTeacherList(data)
        .then(response => {
          console.log(response.data)
          this.teacheroptions = response.data.teacheroptions
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
              message: '连接服务器端失败，请检查网络：' + error,
              type: 'warning'
            })
          }
        })
        .finally(function () {
        })
    },
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
    $api.getCourses(data)
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
