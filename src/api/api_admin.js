import { get, post } from './request'

export default {
  setPassword (data) {
    return post('admin/setpassword', data)
  },
  getInfo (data) {
    return get('admin/info', data)
  },
  getStudentsList (data) {
    return get('admin/studentlist', data)
  },
  addNewStudent (data) {
    return post('admin/addnewstudent', data)
  },
  setStudentInfo (data) {
    return post('admin/setstudentinfo', data)
  },
  addNewTeacher (data) {
    return post('admin/addnewteacher', data)
  },
  setTeacherInfo (data) {
    return post('admin/setteacherinfo', data)
  },
  deleteStudent (data) {
    return post('admin/deletestudent', data)
  },
  deleteTeacher (data) {
    return post('admin/deleteteacher', data)
  },
  getCourses (data) {
    return get('admin/courses', data)
  },
  getStudents (data) {
    return get('admin/students', data)
  },
  addNewCourse (data) {
    return post('admin/addnewcourse', data)
  },
  setInfo (data) {
    return post('teacher/setinfo', data)
  },
  getTeacherList (data) {
    return get('admin/teacherlist', data)
  }
}
