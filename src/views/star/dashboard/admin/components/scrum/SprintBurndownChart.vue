<template>
  <burndown-chart :groups="groups" :data="actualData" :title="title"/>
</template>

<script>
import BurndownChart from './BurndownChart'
import * as sprintUtil from '@/utils/sprint'
import * as dateUtil from '@/utils/date'

function getDaysData(groupData, groups, dataType) {
  if (dataType === 1) { // 累计
    let total = 0
    groupData = groupData.reduce((results, val, key) => {
      total += val
      results[key] = total
      return results
    }, [])
  }
  return groupData
}

const t = {
  doneStory: {
    title: '完成故事点',
    actualData(groups, tasksData, dataType) {
      const stories = sprintUtil.getStories(tasksData.results)
      const doneStories = sprintUtil.getDoneCards(stories)
      let groupData = sprintUtil.getActualStoryPointsGroupByDate(doneStories)
      groupData = groups.map(day => groupData[day] || 0)
      return getDaysData(groupData, groups, dataType)
    }
  },
  dev: {
    title: '研发完成统计',
    actualData(groups, tasksData, dataType) {
      const done = sprintUtil.getDoneCards(sprintUtil.getDevCards(tasksData.results))
      const data = sprintUtil.getActualStoryPointsGroupByDate(done)
      const groupData = groups.map(day => data[day] || 0)
      return getDaysData(groupData, groups, dataType)
    }
  },
  doneCardCount: {
    title: '卡片完成数',
    actualData(groups, tasksData, dataType) {
      const data = sprintUtil.groupByDoneDate(tasksData.results)
      const groupData = groups.map(day => data[day] ? data[day].length : 0)
      return getDaysData(groupData, groups, dataType)
    }
  },
  bug: {
    title: '缺陷提交',
    actualData(groups, tasksData, dataType) {
      const issues = sprintUtil.getIssues(tasksData.results)
      const data = sprintUtil.groupByCommitDate(issues)
      const groupData = groups.map(day => data[day] ? data[day].length : 0)
      return getDaysData(groupData, groups, dataType)
    }
  }
}

export default {
  name: 'SprintBurndownChart',
  components: { BurndownChart },
  props: {
    sprintCardData: {
      type: Object,
      required: true
    },
    stat: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    dataType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {}
  },
  computed: {
    groups() {
      return this.stat && this.stat.startDate ? dateUtil.getDates(this.stat.startDate, this.stat.endDate) : []
    },
    actualData() {
      const a = t[this.type]
      return a ? a.actualData(this.groups, this.sprintCardData, this.dataType) : []
    },
    title() {
      const a = t[this.type]
      return a ? a.title : ''
    }
  }
}
</script>

<style scoped>

</style>
