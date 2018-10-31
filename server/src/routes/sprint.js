import express from 'express'
import * as Sprint from '../controller/sprint'
const router = express.Router()

router.post('/login', Sprint.login)
router.get('/getListBySprintId', Sprint.getListBySprintId)

export default router
