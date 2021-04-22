<template>
  <div class="container">
    <h2 style="margin-left: 400px">个人信息管理</h2>
    <div class="center-container">
      <el-form :model="ruleForm" ref="ruleForm" status-icon :rules="rules" label-width="200px">
        <el-form-item label="名称">
          <el-input style="width: 300px" v-model="ruleForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input style="width: 300px" v-model="ruleForm.number" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-input style="width: 300px" v-model="identity" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input style="width: 300px" v-model="ruleForm.password" type="password" show-password readonly="true"></el-input>
          <el-button style="display: inline" @click="modifypwd">修改密码</el-button>
        </el-form-item>
        <!--         修改密码区域-->
        <div class="password-area" v-show="modifypassword">
          <el-form-item label="新密码" prop="pass">
            <el-input style="width: 300px" type="password" v-model="ruleForm.pass" show-password
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item style="width: 300px" label="确认密码" prop="checkPass">
            <el-input style="width: 300px" type="password" v-model="ruleForm.checkPass" show-password
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import $api from '../../api/api_teacher'

export default {
  name: 'TeacherAccount',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      identity: '老师',
      ruleForm: {
        id: '',
        name: '',
        password: '',
        number: '',
        pass: '',
        checkPass: ''
      },
      modifypassword: false,
      rules: {
        pass: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      const data = {
        id: this.ruleForm.id,
        password: this.ruleForm.pass
      }
      $api.setTeacherPassword(data).then(response => {
        if (response.data.status === '200') {
          this.$message.success('修改密码成功')
          this.created()
        }
      }
      ).catch(error => {
        console.log('请求失败, 错误: ' + error.statusMessage)
      })
    },
    modifypwd () {
      this.modifypassword = !this.modifypassword
    }
  },
  created () {
    const data = {
      number: '111'
    }
    $api.getInfo(data)
      .then(response => {
        console.log(response.data)
        this.ruleForm.number = response.data.ruleForm[0].number
        this.ruleForm.password = response.data.ruleForm[0].password
        this.ruleForm.name = response.data.ruleForm[0].name
        this.ruleForm.id = response.data.ruleForm[0].id
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

<style scoped lang="scss">
.container {
  width: 900px;
  padding-left: 40px;
}

.center-container {
  width: 100%;
  padding-top: 30px;
}

.inbox {
  width: 50px;
  display: inline;
}
</style>
