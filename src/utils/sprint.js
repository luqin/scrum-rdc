export function getReqStoryPoints(cards) {
  cards = getReqs(cards)
  cards = filterHasSubreq(cards)
  return getActualStoryPoints(cards)
}

/**
 * 获得所有叶子节点
 *
 * @param cards
 * @returns {*}
 */
export function getLeaf(cards) {
  return cards.filter(item => {
    const { hasSubreq, hasSubtask, status } = item.columns
    return !hasSubreq && !hasSubtask && ['已完成', 'Closed'].indexOf(status) !== -1
  })
}

export function getDoneCards(cards) {
  return cards.filter(item => ['已完成', '已取消', 'Closed'].indexOf(item.columns.status) !== -1)
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

export function getTotalActualStoryPoints(cards) {
  return getLeaf(cards).reduce((result, item) => {
    const v = getActualStoryPoints(item)
    return result + v
  }, 0)
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
