import { createUser, fetch, getone, update, deleteuser } from '../controller/userController.js'
import express from 'express'
const router = express.Router()

router.post('/create', createUser)
router.get('/fetch', fetch)
router.get('/getone/:id', getone)
router.put('/update/:id', update)
router.delete('/delete/:id', deleteuser)





export default router

