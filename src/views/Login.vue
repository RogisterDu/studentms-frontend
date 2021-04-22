<template>
  <div class="login">
    <div class="login-container">
      <div class="login-box">
        <h2 class="head-title">XX专业学生管理系统</h2>
        <hr>
        <div class="et-form">
          <el-form ref="form" :model="form" label-width="80px" label-position="right" :rules="rules">
            <el-form-item label="账 号：" class="et-item" prop="number">
              <el-input class="input-box" v-model="form.number" maxlength="12" placeholder="请输入学号/工号"
                        prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item label="密  码：" class="et-item" prop="password">
              <el-input class="input-box" v-model="form.password" maxlength="12" placeholder="请输入登陆密码"
                        prefix-icon="el-icon-key"
                        show-password>>
              </el-input>
            </el-form-item>
            <!--        //身份选择-->
            <el-form-item label="身 份: " class="et-item" prop="identity">
              <el-radio-group v-model="form.identity">
                <el-radio :label="3">学生</el-radio>
                <el-radio :label="6">老师</el-radio>
                <el-radio :label="9">管理员</el-radio>
              </el-radio-group>
            </el-form-item>
            <!--        //按钮-->
            <el-form-item style="padding-left: 70px">
              <el-button type="primary" @click="dologin" size="medium" style="width: 100px">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $api from '../api/api_user'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        number: '',
        password: '',
        identity: 3
      },
      rules: {
        number: [
          {
            required: true,
            message: '请输入学号/工号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        identity: [
          {
            required: true,
            message: '请选择登录身份',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    dologin () {
      if (!this.form.number) {
        this.$message.error('请输入用户名')
      } else if (!this.form.password) {
        this.$message.error('请输入密码')
      } else {
        const data = {
          number: this.form.number,
          password: this.form.password,
          identity: this.form.identity
        }
        $api.login(data).then(response => {
          if (response.data.status === 200) {
            this.$message({
              message: '登录成功，正在跳转.......',
              type: 'success'
            })
            if (this.form.identity === 3) {
              this.$router.push({
                path: '/student/account'
              })
            } else if (this.form.identity === 6) {
              this.$router.push({
                path: '/teacher/account'
              })
            } else {
              this.$router.push({
                path: '/admin/account'
              })
            }
          }
          if (response.data.status === '201') {
            console.log('用户不存在')
            console.log(response.data)
            this.$message({
              message: '用户不存在.......',
              type: 'error'
            })
          }
        }
        ).catch(error => {
          console.log('请求失败, 错误: ' + error.statusMessage)
        })
      }
    }
  },
  props: []
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  background-image: url("../assets/login-bg.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  text-align: center;
}

.login-container {
  padding-top: 140px;
  width: 400px;
  margin: 0 auto;
  height: 1818px;
}

.login-box {
  background-color: grey;
  background-repeat: no-repeat;
  padding-top: 10px;
  padding-bottom: 5px;
  display: block;
  background-color: rgba(255, 255, 255, 25%);
  border-radius: 10px;
  filter: alpha(Opacity=60);
  -moz-opacity: 0.6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.et-form {
  text-align: left;
  padding-left: 10px;
}
.input-box {
  width: 260px;
}

.head-title {
  text-align: center;
}

</style>
