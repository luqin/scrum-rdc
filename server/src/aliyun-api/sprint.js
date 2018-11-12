import request from './utils/request'

/**
 * 迭代列表，带进度
 * @param params
 */
export function list(params = {}) {
  return request({
    url: '/project/202912/sprint/list',
    method: 'get',
    params: Object.assign({
      versionId: null,
      projectId: 202912,
      akProjectId: 202912
    }, params)
  })
}

/**
 * 未归档迭代列表
 *
 * @param params
 */
export function getSprintList(params = {}) {
  return request({
    url: '/v3/issue/getSprintList',
    method: 'get',
    params: Object.assign({
      akProjectId: 202912
    }, params)
  })
}

/**
 * 迭代信息
 *
 * @param params
 */
export function getStat(params = {}) {
  return request({
    url: '/project/202912/sprint/getListBySprintId',
    method: 'get',
    params: Object.assign({
      akProjectId: 202912
    }, params)
  })
}
