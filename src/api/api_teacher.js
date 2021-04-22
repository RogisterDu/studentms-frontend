import { get, post } from './request'

export default {
  getMyCourse (data) {
    return get('teacher/courses', data)
  },
  upGrades (data) {
    return post('teacher/upgrades', data)
  },
  getStudents (data) {
    return get('teacher/studentslist', data)
  },
  setInfo (data) {
    return post('teacher/setinfo', data)
  },
  setTeacherPassword (data) {
    return post('teacher/setpassword', data)
  },
  getInfo (data) {
    return get('teacher/info', data)
  }
}
