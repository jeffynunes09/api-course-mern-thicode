import {Router} from 'express'
import { likeNews,create,findById,getAll, topNews,searchByTitle ,byUser,update,deletePostController, commentPostController, commentDeletePostController} from '../controllers/newsController.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'


const router = Router()


router.post('/',authMiddleware,create)
router.get('/', getAll)
router.get("/top", topNews)
router.get('/search', searchByTitle)
router.get('/byUser',authMiddleware, byUser)
router.get('/:id',authMiddleware, findById)
router.patch('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware,deletePostController)
router.patch('/likes/:id',authMiddleware,likeNews)
router.patch("/:id/comment", commentPostController);
router.patch(
  "/:id/:idComment/comment",
  commentDeletePostController
);



export default router