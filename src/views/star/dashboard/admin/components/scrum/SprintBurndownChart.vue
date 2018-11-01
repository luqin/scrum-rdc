<template>
  <burndown-chart :groups="groups" :data="actualData" title="研发完成统计"/>
</template>

<script>
import BurndownChart from './BurndownChart'
import * as sprintUtil from '@/utils/sprint'
import * as dateUtil from '@/utils/date'

export default {
  name: 'SprintBurndownChart',
  components: { BurndownChart },
  props: {
    sprintCardData: {
      type: Object,
      required: true
    }
  },
  computed: {
    groups() {
      return dateUtil.getDates('2018-10-08', '2018-11-02')
    },
    actualData() {
      const data = sprintUtil.getActualStoryPointsGroupByDate(this.sprintCardData.results)
      return this.groups.map(day => data[day] || 0)
    }
  }
}
</script>

<style scoped>

</style>
