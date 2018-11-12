import express from 'express'
import request from '../aliyun-api/utils/request'

const router = express.Router()

router.get('/', (req, res, next) => {
  const { url, method = 'get', params, data } = req.query

  if (!url) {
    res.send({
      status: 0,
      type: 'ERROR',
      message: '参数错误，url 必填',
    })
    return
  }

  return request({
    url,
    method,
    params: params ? JSON.parse(params) : undefined,
    data,
  }).then(response => {
    res.send(response.data)
  })
})

router.post('/rdc', (req, res, next) => {
  const { url, method = 'get', params, data } = req.query
  return request({
    url,
    method,
    params,
    data,
  }).then(response => {
    res.send(response.data)
  })
})

export default router

