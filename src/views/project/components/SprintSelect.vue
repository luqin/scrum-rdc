<template>
  <el-select v-model="currentValue" :loading="loading" filterable placeholder="请选择迭代" @change="handleChange()">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { getAllSprintList } from '@/api/sprint'

export default {
  name: 'SprintSelect',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentValue: this.value || null,
      loading: false,
      options: []
    }
  },
  watch: {
    value(val, oldVal) {
      if (val !== oldVal) {
        this.currentValue = val
      }
    }
  },
  mounted() {
    this.loading = true
    getAllSprintList().then(res => {
      this.sprintList = res.data
      this.options = this.sprintList.results.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
      this.loading = false
    }).catch(e => {
      console.error(e)
      this.loading = false
    })
  },
  methods: {
    handleChange() {
      this.$emit('input', this.currentValue)
      this.$emit('change', this.currentValue)
    }
  }
}
</script>

<style scoped>

</style>
