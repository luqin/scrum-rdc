// import formidable from 'formidable'
import * as api from '../../aliyun-api'

export function login(req, res, next) {
  res.send({
    status: 1,
    success: '登录成功'
  })
}

export function getSprintList(req, res, next) {
  return api.sprint.getSprintList(req.query)
    .then((response) => {
      res.send(response.data)
    })
    .catch(e => {
      res.send({
        status: 0,
        type: 'ERROR',
        message: e
      })
    })
}

export function getListBySprintId(req, res, next) {
  return api.issue.getListBySprintId(req.query)
    .then((response) => {
      res.send(response.data)
    })
    .catch(e => {
      res.send({
        status: 0,
        type: 'ERROR',
        message: e
      })
    })
}
