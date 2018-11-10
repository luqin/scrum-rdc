<template>
  <div class="dashboard-editor-container">

    <github-corner style="position: absolute; top: 0px; border: 0; right: 0;"/>

    <sprint-select/>

    <panel-group :sprint-card-data="sprintCardData" @handleSetLineChartData="handleSetLineChartData"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <sprint-burndown-chart :sprint-card-data="sprintCardData" :type="chartType"/>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <sprint-burndown-chart :sprint-card-data="sprintCardData" :type="chartType" :data-type="2"/>
    </el-row>

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import TransactionTable from './components/TransactionTable'
import SprintBurndownChart from './components/scrum/SprintBurndownChart'

import { getListBySprintId } from '@/api/sprint'
import SprintSelect from '../../../project/components/SprintSelect'

export default {
  name: 'SprintDashboard',
  components: {
    SprintSelect,
    SprintBurndownChart,
    GithubCorner,
    PanelGroup,
    TransactionTable
  },
  data() {
    return {
      sprintId: 18820,
      chartType: 'doneStory',
      sprintCardData: {
        results: [],
        totalCount: 0
      }
    }
  },
  created() {
    getListBySprintId(18820).then(res => {
      this.sprintCardData = res.data
    }).catch(e => {
      console.error(e)
    })
  },
  methods: {
    handleSetLineChartData(type) {
      this.chartType = type
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
