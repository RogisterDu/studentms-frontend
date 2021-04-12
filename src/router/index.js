import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: {
      title: 'XX专业学生管理平台登录'
    }
  },
  {
    path: '/student',
    name: 'Student',
    component: () => import('@/views/student/Home'),
    meta: {
      title: '学生端'
    }
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: () => import('@/views/teacher/Home'),
    meta: {
      title: '教师端'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/Home'),
    meta: {
      title: '管理员'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
