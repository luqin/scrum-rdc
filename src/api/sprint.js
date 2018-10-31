import request from '@/utils/request'
import _ from 'lodash'

// import moment from 'moment'

export function getListBySprintId(sprintId) {
  return request({
    url: '/sprint/getListBySprintId',
    method: 'get',
    params: {
      sprintId: 18820
    }
  })
}

// 父
export function getBurndownData() {
  function filterReqAndTask(card) {
    return card.filter(item => item.stamp !== 'Issue' && !item.columns.hasSubreq && !item.columns.hasSubtask && item.columns.status === '已完成')
  }

  return getListBySprintId().then(({ results }) => {
    const groups = _.groupBy(results, 'columns.updateDate')
    const groupNames = Object.keys(groups).sort()

    const expectedData = groupNames.map(g => {
      return groups[g].reduce((result, item, key) => {
        const v = parseFloat(item.columns.cf_101587) || 0
        return result + v
      }, 0)
    })

    // 已完成故事点
    const actualData = groupNames.map(g => {
      return filterReqAndTask(groups[g]).reduce((result, item, key) => {
        const v = parseFloat(item.columns.cf_101587) || 0
        return result + v
      }, 0)
    })

    // 总故事点
    const totalDonePoints = actualData.reduce((total, item) => {
      return total + item
    }, 0)

    // 已完成需求的故事点
    const totalDoneReq = filterReqAndTask(results)
      .filter(item => item.stamp === 'Req')
    const totalDoneReqPoints = totalDoneReq
      .reduce((result, item, key) => {
        const v = parseFloat(item.columns.cf_101587) || 0
        return result + v
      }, 0)

    // 已完成需求、任务
    const countData = groupNames.map(g => {
      return filterReqAndTask(groups[g]).reduce((result, item, key) => {
        return result + 1
      }, 0)
    })

    const data = {
      groups: groupNames,
      expectedData,
      actualData,
      countData,
      totalDonePoints,
      totalDoneReqPoints,
      totalDoneReq
    }

    console.error(groups)
    console.error(data)
    return data
  })
}
