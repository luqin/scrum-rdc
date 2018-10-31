import request from './request'

export function getListBySprintId(params = {}) {
  return request({
    url: '/project/202912/sprint/getListBySprintId',
    method: 'get',
    params: Object.assign({
      spm: 'a2c40.cloud_prod_sprint_tree.0.0.567141ccHCT4hA',
      versionId: undefined,
      filterCondition: 'groupBy=false&order=desc',
      groupBy: false,
      order: 'desc',
      pageSize: 200,
      akProjectId: 202912
    }, params)
  })
}
