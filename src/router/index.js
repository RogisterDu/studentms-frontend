import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login'),
    meta: {
      title: 'XX专业学生管理平台登录'
    }
  },
  {
    path: '/student',
    name: 'Student',
    component: () => import('../views/student/Home'),
    meta: {
      title: '学生端'
    },
    children: [
      {
        path: '/student/account',
        name: 'StudentAccount',
        component: () => import('../views/student/Account'),
        meta: {
          title: '账号设置'
        }
      },
      {
        path: '/student/mygrade',
        name: 'Grades',
        component: () => import('../views/student/MyGrades'),
        meta: {
          title: '我的成绩'
        }
      }
    ]
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: () => import('../views/teacher/TeacherHome'),
    meta: {
      title: '教师端'
    },
    children: [
      {
        path: '/teacher/mystudents',
        name: 'MyStudent',
        component: () => import('../views/teacher/MyStudents')
      },
      {
        path: '/teacher/account',
        name: 'TeacherAccount',
        component: () => import('../views/teacher/TeacherAccount')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/AdminHome'),
    meta: {
      title: '管理员'
    },
    children: [
      {
        path: '/admin/account',
        name: 'AdminAccount',
        component: () => import('../views/admin/AdminAccount')
      },
      {
        path: '/admin/coursesmanagement',
        name: 'CourseMS',
        component: () => import('../views/admin/CourseMS')
      },
      {
        path: '/admin/studentmanagement',
        name: 'StudentMS',
        component: () => import('../views/admin/StudentMS')
      },
      {
        path: '/admin/teachermanagement',
        name: 'TeacherMS',
        component: () => import('../views/admin/TeacherMS')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
