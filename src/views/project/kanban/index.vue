<template>
  <div class="components-container board">
    <Kanban
      :key="1"
      :list="todo"
      :options="options"
      :header-text="`Todo(${todo.length})`"
      class="kanban todo"/>
    <Kanban
      :key="2"
      :list="doing"
      :options="options"
      :header-text="`Doing(${doing.length})`"
      class="kanban working"/>
    <Kanban
      :key="3"
      :list="test"
      :options="options"
      :header-text="`Test(${test.length})`"
      class="kanban working"/>
    <Kanban
      :key="4"
      :list="done"
      :options="options"
      :header-text="`Done(${done.length})`"
      class="kanban done"/>
  </div>
</template>
<script>
import Kanban from '@/components/Kanban'

import { getListBySprintId } from '@/api/sprint'
import _ from 'lodash'

export default {
  name: 'SprintKanban',
  components: {
    Kanban
  },
  data() {
    return {
      sprintCardData: {
        results: [],
        totalCount: 0
      },
      options: {
        group: 'mission'
      },
      todo: [],
      doing: [],
      test: [],
      done: []
    }
  },
  created() {
    getListBySprintId().then(res => {
      this.sprintCardData = res.data
      const { results } = this.sprintCardData

      const list = results.map(item => {
        return {
          name: item.columns.subject,
          id: item.columns.id,
          data: item
        }
      })
      const group = _.groupBy(list, 'data.columns.status')

      this.todo = getTasks(group, ['待处理', 'New'])
      this.doing = getTasks(group, ['处理中', 'ByDesign'])
      this.test = getTasks(group, ['待验证', 'Fixed'])
      this.done = getTasks(group, ['已完成', 'Closed'])
    }).catch(e => {
      console.error(e)
    })

    function getTasks(group, types) {
      return types.reduce((result, type) => {
        if (group[type]) {
          result = result.concat(group[type])
        }
        return result
      }, [])
    }
  }
}
</script>
<style lang="scss">
  .board {
    width: 1230px;
    margin-left: 20px;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: flex-start;
  }

  .board-column .board-column-content {
    height: 500px;
    overflow: auto;

    .board-item {
      /*white-space: nowrap;*/
      /*overflow: hidden;*/
      /*text-overflow: ellipsis;*/
    }
  }

  .kanban {
    margin-right: 10px;

    &.todo {
      .board-column-header {
        background: #4A9FF9;
      }
    }
    &.working {
      .board-column-header {
        background: #f9944a;
      }
    }
    &.done {
      .board-column-header {
        background: #2ac06d;
      }
    }
  }
</style>

