<template>
  <el-card shadow="never">
    <el-form ref="form" :model="form" label-width="0px">
      <el-form-item>
        <el-input v-model="form.cookie" type="textarea" rows="12" placeholder="请输入阿里云效Cookie"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>清空</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { setAliyunToken, getAliyunToken } from '@/utils/auth'

export default {
  name: 'Index',
  data() {
    return {
      form: {
        cookie: getAliyunToken() || '',
      },
    }
  },
  methods: {
    onSubmit() {
      setAliyunToken(this.form.cookie)
      this.$message({
        message: '设置成功',
        type: 'success'
      })
    },
  },
}
</script>

<style scoped>

</style>
