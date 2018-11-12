import express from 'express'
import * as sprint from '../controller/sprint'
const router = express.Router()

router.get('/getStat', sprint.getStat)
router.get('/getListBySprintId', sprint.getListBySprintId)

router.get('/getSprintList', sprint.getSprintList)
router.get('/list', sprint.list)
router.get('/getAllSprintList', sprint.getAllSprintList)

export default router
