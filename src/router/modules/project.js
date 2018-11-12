import Layout from '@/views/layout/Layout'

const projectRouter = {
  path: '/settings',
  component: Layout,
  redirect: '/settings/index',
  name: 'Settings',
  meta: {
    title: '设置',
    icon: 'setting'
  },
  children: [
    {
      path: 'index',
      name: 'Aliyun',
      component: () => import('@/views/project/settings/aliyun/index'),
      meta: { title: '阿里云效设置' }
    }
  ]
}

export default projectRouter
