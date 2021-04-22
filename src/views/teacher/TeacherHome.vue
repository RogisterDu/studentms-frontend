<template>
  <el-container>
    <el-header>
      <HeaderNav></HeaderNav>
    </el-header>
    <el-container style="height: 100%">
      <el-aside>
        <TeacherNav>/</TeacherNav>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>

import HeaderNav from '../../components/HeaderNav'
import TeacherNav from '../../components/TeacherNav'

export default {
  name: 'TeacherHome',
  components: { TeacherNav, HeaderNav }
}
</script>

<style scoped lang="scss">
.el-header {
  padding: 0;
}

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
}

.el-aside {
  background-color: #545c64;
  padding: 0;
  height: 700px;
  width:auto !important;
}

.el-main {
  background-color: #E9EEF3;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
