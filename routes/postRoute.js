import express from "express"
import * as postController from "../controllers/postController.js"

const router = express.Router()


router.route('/').post(postController.addPost)
router.route('/').get(postController.getAllPosts)
router.route('/:id').get(postController.getPost)
router.route('/:id').delete(postController.deletePost)
router.route('/:id/update').get(postController.updatePage)
router.route('/:id/update').put(postController.updatePost)


export default router