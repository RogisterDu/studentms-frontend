<template>
  <el-menu :default-active="$route.path" class="header-menu" mode="horizontal" @select="handleSelect">
    <el-menu-item index="/home" class="logo"></el-menu-item>
    <h3 class="title">XX专业学生管理平台</h3>
    <el-dropdown>
      <i style="margin-right: 15px">
        <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
      </i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item ><span @click="logout">注销</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import router from '../router'

export default {
  name: 'HeaderNav',
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
.header-menu {
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: 120px;
  height: 31px;
  background-color: black;
  margin: 16px;
  cursor: pointer;

  .title {
  }

  .login-info {

  }
}
</style>
