import express from "express"
import * as postController from "../controllers/postController.js"

const router = express.Router()


router.route('/').post(postController.addPost)

export default router