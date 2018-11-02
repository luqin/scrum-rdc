import axios from 'axios'

let cookie = null

// create an axios instance
const service = axios.create({
  baseURL: 'https://rdc.aliyun.com/', // api 的 base_url
  timeout: 3000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (!cookie) {
      return Promise.reject('请设置阿里云cookie')
    }
    config.headers['cookie'] = cookie
    return config
  },
  error => {
    // Do something with request error
    console.log('request:', error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (typeof response.data !== 'object') {
      setCookie(null)
      return Promise.reject('阿里云效请求失败，cookie可能过期')
    }
    return response
  },
  error => {
    console.log('request err: ', error) // for debug
    return Promise.reject('阿里云效请求失败，cookie可能过期')
  }
)

export function setCookie(val) {
  cookie = val
}

export default service
