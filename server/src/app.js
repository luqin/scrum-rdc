import express from 'express'
import config from './config'
import router from './routes/index.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import path from 'path'
import history from 'connect-history-api-fallback'
import chalk from 'chalk'
import { setCookie } from './request'

const app = express()

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.Origin || req.headers.origin || 'https://cangdu.org')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-Token, X-RDC-Token')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true) // 可以带cookies
  res.header('X-Powered-By', '3.2.1')

  const aliyunCookie = req.headers['x-rdc-token']
  if (aliyunCookie) {
    setCookie(aliyunCookie)
  }

  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.use(express.static(path.join(__dirname, '../../dist')))

app.use(cookieParser())
app.use(session({
  name: config.session.name,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: config.session.cookie
}))

router(app)

app.use(history())
// app.use(express.static('./public'))
app.listen(config.port, () => {
  console.log(
    chalk.green(`成功监听端口：${config.port}`)
  )
})
