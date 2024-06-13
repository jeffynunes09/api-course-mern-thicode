import {Router} from 'express'
import { userNotValid, idISValid } from '../middlewares/global.middlewares.js'
import { create, findAll, findById, updateUser, deleteUser } from '../controllers/userController.js'

const router = Router()
router.post('/',userNotValid,create)
router.get('/', findAll)
router.get('/:id',idISValid, findById)
router.put('/:id',idISValid, updateUser)
router.delete('/:id', deleteUser)


export default router



