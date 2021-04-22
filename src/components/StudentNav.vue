<template>
    <el-row class="tac">
      <el-col :span="12" style="height: 100%">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="student-menu"
          default-active="1 "
          text-color="#fff"
          @close="handleClose"
          @open="handleOpen">
          <el-menu-item index="1" @click="pushtoaccount">
            <i class="el-icon-menu"></i>
            <span slot="title" @click="pushtoaccount">个人中心</span>
          </el-menu-item>
          <el-menu-item index="2" @click="pushtograde">
            <i class="el-icon-menu"></i>
            <span slot="title" @click="pushtograde">成绩查询</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'StudentNav',
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    pushtoaccount () {
      this.$router.push({
        path: '/student/account'
      })
    },
    pushtograde () {
      this.$router.push({
        path: '/student/mygrade'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.tac{
  width: auto;
}
.student-menu{
  width: 200px;
}
</style>
