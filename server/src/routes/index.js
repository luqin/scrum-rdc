import sprint from './sprint'
import auth from './auth'
import rdc from './rdc'

export default app => {
  app.use('/api/auth', auth)

  app.use('/api/rdc', rdc)
  app.use('/api/sprint', sprint)
}
