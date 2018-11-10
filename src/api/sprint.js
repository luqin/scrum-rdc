import request from '@/utils/request'

export function getListBySprintId(sprintId) {
  return request({
    url: '/sprint/getListBySprintId',
    method: 'get',
    params: {
      sprintId
    }
  })
}

export function getSprintList(params = {}) {
  return request({
    url: '/sprint/getSprintList',
    method: 'get',
    params: Object.assign({
      akProjectId: 202912
    }, params)
  })
}
