import sprint from './sprint'
import auth from './auth'

export default app => {
  app.use('/api/auth', auth)
  app.use('/api/sprint', sprint)
}
