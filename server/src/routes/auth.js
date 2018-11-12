import express from 'express'
import * as auth from '../controller/auth'
const router = express.Router()

router.get('/login', auth.login)

export default router
