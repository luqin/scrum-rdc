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

/**
 * 获得所有已完成叶子节点
 *
 * @param cards
 * @returns {*}
 */
export function getLeafReq(cards) {
  return cards.filter(item => {
    const { hasSubreq } = item.columns
    return !hasSubreq
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
 * 获得已交付的故事点
 */
export function getDoneStoryPoints(cards) {
  const reqs = getStories(cards)
  const doneReqs = getDoneCards(reqs)
  return getActualStoryPoints(doneReqs)
}

/**
 * 获得故事
 * TODO 无父节点或者父节点不在本迭代的任务和缺陷
 */
export function getStories(cards) {
  return cards.filter(item => {
    const { hasSubreq, parentId } = item.columns
    console.error(item, findCard(cards, parentId))
    return (item.stamp === 'Req' && !hasSubreq) ||
      (item.stamp === 'Task' && (!parentId || !findCard(cards, parentId))) ||
      item.stamp === 'Issue'
  })
}

function findCard(cards, id) {
  return cards.filter(item => item.columns.id + '' === id + '')[0]
}

/**
 * 获得开发完成的故事点
 *
 * @param cards
 * @returns {*}
 */
export function getDevCards(cards) {
  return getLeaf(cards)
}

export function groupByDoneDate(cards) {
  cards.forEach(card => {
    card.updateStatusDate = moment(card.columns.updateStatusAt).format('YYYY-MM-DD')
  })
  const groups = _.groupBy(cards, 'updateStatusDate')
  return groups
}

export function groupByCommitDate(cards) {
  const groups = _.groupBy(cards, 'columns.commitDate')
  return groups
}

export function getActualStoryPointsGroupByDate(cards) {
  const groups = groupByDoneDate(cards)
  const days = Object.keys(groups).sort()
  return days.reduce((data, day) => {
    data[day] = getActualStoryPoints(groups[day])
    return data
  }, {})
}

export function getActualStoryPoints(items) {
  items = Array.isArray(items) ? items : [items]
  return items.reduce((result, item) => {
    const v = parseFloat(item.columns.cf_101587) || 0
    return result + v
  }, 0)
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
