<template>
  <div class="container">
    <el-button round @click="addTeacherdrawer">增加老师</el-button>
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
      <el-form :model="InfoForm" ref="InfoForm" label-width="100px">
        <el-form-item label="编号">
          <el-input v-model="InfoForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model="InfoForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="InfoForm.number"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="InfoForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button round @click="submitInfo">提交</el-button>
          <el-button round @click="deleteInfo">删除老师</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!--    增加学生-->
    <el-drawer
      title="增加老师"
      :visible.sync="addrawer"
      :direction="direction"
      :before-close="handleClose">
      <el-form :model="newForm" ref="newForm" label-width="100px">
        <el-form-item label="名称">
          <el-input v-model="newForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="newForm.number"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="newForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button round @click="addTeacher">增加老师</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import $api from '../../api/api_admin'

export default {
  name: 'TeacherMS',
  data () {
    return {
      direction: 'rtl',
      tableData: null,
      addrawer: false,
      drawer: false,
      InfoForm: {
        id: '',
        name: '',
        number: '',
        password: ''
      },
      newForm: {
        name: '',
        number: '',
        password: ''
      }
    }
  },
  methods: {
    deleteInfo () {
      const data = {
        id: this.InfoForm.id
      }
      $api.deleteTeacher(data)
        .then(response => {
          console.log(response.data)
          if (response.data.status === '200') {
            this.$message.success('删除成功')
            this.addrawer = false
          } else {
            this.$message.error('删除失败,请检查')
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
    addTeacher () {
      const data = {
        name: this.newForm.name,
        number: this.newForm.number,
        password: this.newForm.password
      }
      $api.addNewTeacher(data)
        .then(response => {
          console.log(response.data)
          if (response.data.status === '200') {
            this.$message.success('添加成功')
            this.addrawer = false
          } else {
            this.$message.error('添加失败,请检查')
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
    addTeacherdrawer () {
      this.addrawer = true
    },
    editInfo (event) {
      this.InfoForm = event
      this.drawer = true
    },
    submitInfo () {
      const data = {
        id: this.InfoForm.id,
        name: this.InfoForm.name,
        number: this.InfoForm.number,
        password: this.InfoForm.password
      }
      $api.setTeacherInfo(data)
        .then(response => {
          console.log(response.data)
          if (response.data.status === '200') {
            this.$message.success('修改成功')
            this.drawer = false
          } else {
            this.$message.error('修改失败')
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
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    }
  },
  created () {
    const data = {
      value: '1'
    }
    $api.getTeacherList(data)
      .then(response => {
        console.log(response.data)
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
</script>

<style scoped>

</style>
