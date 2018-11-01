import _ from 'lodash'
import moment from 'moment'

export function getReqStoryPoints(cards) {
  cards = getReqs(cards)
  cards = filterHasSubreq(cards)
  return getActualStoryPoints(cards)
}

/**
 * 获得所有已完成叶子节点
 *
 * @param cards
 * @returns {*}
 */
export function getLeaf(cards) {
  return cards.filter(item => {
    const { hasSubreq, hasSubtask } = item.columns
    return !hasSubreq && !hasSubtask
  })
}

export function getDoneCards(cards) {
  return cards.filter(item => ['已完成', 'Closed'].indexOf(item.columns.status) !== -1)
}

export function getCancelCards(cards) {
  return cards.filter(item => ['已取消'].indexOf(item.columns.status) !== -1)
}

export function getIssues(cards) {
  return cards.filter(item => item.stamp === 'Issue')
}

export function getExpectedStoryPoints(item) {
  return parseFloat(item.columns.cf_101586) || 0
}

export function getTotalExpectedStoryPoints(cards) {
  return getLeaf(cards).reduce((result, item) => {
    const v = getExpectedStoryPoints(item)
    return result + v
  }, 0)
}

/**
 * 获得完成的故事点
 *
 * @param cards
 * @returns {*}
 */
export function getTotalActualStoryPoints(cards) {
  let doneCards = getDoneCards(cards)
  doneCards = getLeaf(doneCards)
  return doneCards.reduce((result, item) => {
    const v = getActualStoryPoints(item)
    return result + v
  }, 0)
}

export function groupByDoneDate(cards) {
  cards.forEach(card => {
    card.updateStatusDate = moment(card.columns.updateStatusAt).format('YYYY-MM-DD')
  })
  const groups = _.groupBy(cards, 'updateStatusDate')
  return groups
}

export function getActualStoryPointsGroupByDate(cards) {
  const groups = groupByDoneDate(cards)
  const days = Object.keys(groups).sort()
  return days.reduce((data, day) => {
    data[day] = getTotalActualStoryPoints(groups[day])
    return data
  }, {})
}

export function getActualStoryPoints(item) {
  return parseFloat(item.columns.cf_101587) || 0
}

export function getReqs(cards) {
  return cards.filter(item => item.stamp === 'Req')
}

export function filterHasSubreq(cards) {
  return cards.filter(item => !item.columns.hasSubreq)
}

export function filterReq(cards) {
  return cards.filter(item => item.stamp !== 'Issue' && !item.columns.hasSubreq && !item.columns.hasSubtask && item.columns.status === '已完成')
}

export function filterTask(cards) {
  return cards.filter(item => item.stamp !== 'Issue' && !item.columns.hasSubreq && !item.columns.hasSubtask && item.columns.status === '已完成')
}

export function filterReqAndTask(card) {
  return card.filter(item => item.stamp !== 'Issue' && !item.columns.hasSubreq && !item.columns.hasSubtask && item.columns.status === '已完成')
}

export function getBurndownData(results) {
  function filterReqAndTask(card) {
    return card.filter(item => item.stamp !== 'Issue' && !item.columns.hasSubreq && !item.columns.hasSubtask && item.columns.status === '已完成')
  }

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
}
