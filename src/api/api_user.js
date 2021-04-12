import { get, post } from './request'

export default {
  login (data) {
    return post('user/login', data)
  },
  logout (data) {
    return post('user/logout', data)
  },
  getInfo () {
    return get('user/info', null)
  }
}
