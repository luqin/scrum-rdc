// import formidable from 'formidable'
import * as api from '../../aliyun-api'

/**
 * 迭代信息
 *
 * @param params
 */
export function getStat(req, res, next) {
  return buildResponse(api.sprint.getStat(req.query), res)
}

export function list(req, res, next) {
  return buildResponse(api.sprint.list(req.query), res)
}

export function getAllSprintList(req, res, next) {
  return buildResponse(
    Promise.all([
      api.sprint.list(Object.assign({}, req.query, { status: 0 })),
      api.sprint.list(Object.assign({}, req.query, { status: 9 })),
    ]).then(([response1, response2]) => {
      const results = response1.data.results.concat(response2.data.results)
      return {
        data: {
          code: 200,
          results,
        },
      }
    }), res)
}

export function getSprintList(req, res, next) {
  return buildResponse(api.sprint.getSprintList(req.query), res)
}

/**
 * 卡片列表
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export function getListBySprintId(req, res, next) {
  return buildResponse(api.issue.getListBySprintId(req.query), res)
}

function buildResponse(apiRes, res) {
  return apiRes.then((response) => {
    res.send(response.data)
  }).catch(e => {
    res.send({
      status: 0,
      type: 'ERROR',
      message: e,
    })
  })
}
