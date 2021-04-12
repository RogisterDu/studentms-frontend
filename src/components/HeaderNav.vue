<template>
  <el-menu :default-active="$route.path" class="header-menu" mode="horizontal" @select="handleSelect"
           background-color="#545c64" text-color="#fff">
    <el-menu-item index="/home" class="logo"></el-menu-item>
    <h3 class="title">XX专业学生管理平台</h3>

    <el-submenu index="2" class="login-info">
      <template slot="title">
        <el-avatar size="small"
                   src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
      </template>
      <el-menu-item style="padding: 0;text-align: center;" index="/">注销</el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: 'HeaderNav',
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
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
