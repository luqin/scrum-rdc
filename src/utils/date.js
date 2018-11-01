import moment from 'moment'

/**
 * 获得起止时间内的日期
 * @param start
 * @param end
 */
export function getDates(start, end) {
  const dates = []
  let current = moment(start)
  while (current.isBefore(end)) {
    dates.push(current.format('YYYY-MM-DD'))
    current = current.add(1, 'd')
  }
  dates.push(end)
  console.error(dates)
  return dates
}
