import express from 'express'
import * as sprint from '../controller/sprint'
const router = express.Router()

router.get('/getListBySprintId', sprint.getListBySprintId)
router.get('/getSprintList', sprint.getSprintList)

export default router
