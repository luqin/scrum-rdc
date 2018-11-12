<template>
  <div class="dashboard-editor-container">

    <github-corner style="position: absolute; top: 0px; border: 0; right: 0;"/>

    <sprint-select :value="sprintId" @change="handleSprintChange"/>

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

const SprintIdKey = 'SprintId'

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
    let sprintId = localStorage.getItem(SprintIdKey)
    if (sprintId) {
      sprintId = parseInt(sprintId, 10)
    }
    return {
      sprintId: sprintId || 18820,
      chartType: 'doneStory',
      sprintCardData: {
        results: [],
        totalCount: 0
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      if (!this.sprintId) {
        return
      }

      getListBySprintId(this.sprintId).then(res => {
        this.sprintCardData = res.data
      }).catch(e => {
        console.error(e)
      })
    },
    handleSetLineChartData(type) {
      this.chartType = type
    },
    handleSprintChange(sprintId) {
      this.sprintId = sprintId
      localStorage.setItem(SprintIdKey, sprintId)
      this.initData()
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
