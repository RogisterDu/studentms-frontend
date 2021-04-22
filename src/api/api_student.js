import { get, post } from './request'

export default {
  getGrades (data) {
    return get('student/grade', data)
  },
  getInfo (data) {
    return get('student/info', data)
  },
  setPassword (data) {
    return post('student/setpassword', data)
  }
}
