import {Router} from 'express'
import { create,findById,getAll, topNews,searchByTitle ,byUser} from '../controllers/newsController.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'


const router = Router()


router.post('/',authMiddleware,create)
router.get('/', getAll)
router.get("/top", topNews)
router.get('/search', searchByTitle)
router.get('/byUser',authMiddleware, byUser)
router.get('/:id',authMiddleware, findById)






export default router