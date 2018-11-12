<template>
  <el-select v-model="value8" filterable placeholder="请选择迭代">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { getSprintList } from '@/api/sprint'

export default {
  name: 'SprintSelect',
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value8: ''
    }
  },
  mounted() {
    getSprintList().then(res => {
      this.sprintList = res.data
      this.options = this.sprintList.results.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }).catch(e => {
      console.error(e)
    })
  }
}
</script>

<style scoped>

</style>
