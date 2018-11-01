import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const AliyunTokenKey = 'aliyun'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAliyunToken() {
  return localStorage.getItem(AliyunTokenKey)
}

export function setAliyunToken(token) {
  return localStorage.setItem(AliyunTokenKey, token)
}
