<template>
  <div class="login">
    <div class="login-container">
      <div class="login-box">
        <h2 class="head-title">XX专业学生管理系统</h2>
        <hr>
        <div class="et-form">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号：">
              <el-input class="input-box" v-model="form.username" maxlength="12" placeholder="请输入学号/工号"
                        prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input class="input-box" v-model="form.password" maxlength="12" placeholder="请输入登陆密码"
                        prefix-icon="el-icon-key"
                        show-password>>
              </el-input>
            </el-form-item>
            <!--        //身份选择-->
            <el-form-item label="身份: ">
              <el-radio-group v-model="form.Identity">
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
import $api from '@/api/api_user'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: '',
        Identity: 3
      }
    }
  },
  methods: {
    dologin () {
      if (!this.form.username) {
        this.$message.error('请输入用户名')
      } else if (!this.form.password) {
        this.$message.error('请输入密码')
      } else {
        const data = {
          id: '1',
          password: '123456'
        }
        $api.login(data).then(response => {
          console.log('请求成功，响应数据如下')
          console.log(response.data)
        }
        ).finally(response => {
          console.log('请求失败, 错误: ' + response.statusMessage)
        })
      }
    }
  }
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
}

.input-box {
  width: 300px;
}

.head-title {
  text-align: center;
}

</style>
