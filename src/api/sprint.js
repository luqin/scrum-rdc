import request from '@/utils/request'

export function getStat(sprintId) {
  return request({
    url: '/sprint/getStat',
    method: 'get',
    params: {
      sprintId,
    },
  })
}

export function getListBySprintId(sprintId) {
  return request({
    url: '/sprint/getListBySprintId',
    method: 'get',
    params: {
      sprintId,
    },
  })
}

export function getAllSprintList(params = {}) {
  return request({
    url: '/sprint/getAllSprintList',
    method: 'get',
    params: Object.assign({
      akProjectId: 202912,
    }, params),
  })
}

export function getSprintList(params = {}) {
  return request({
    url: '/sprint/getSprintList',
    method: 'get',
    params: Object.assign({
      akProjectId: 202912,
    }, params),
  })
}
