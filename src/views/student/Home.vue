<template>
  <el-container>
    <el-header>
      <HeaderNav></HeaderNav>
    </el-header>
    <el-container>
      <el-aside >
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
import HeaderNav from '@/components/HeaderNav'

export default {
  name: 'Home',
  components: {
    HeaderNav
  },
  data () {
    return {
      Name: 'djc',
      identity: '学生'
    }
  }
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
  background-color: #D3DCE6;
  text-align: left;
  height: 600px;
  padding: 0;
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
