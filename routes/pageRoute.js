import express from "express"
import * as pageController from "../controllers/pageController.js"

const router = express.Router()


router.route('/').get(pageController.getIndexPage)
router.route('/contact').get(pageController.getContactPage)
router.route('/login').get(pageController.getLoginPage)
router.route('/register').get(pageController.getRegisterPage)
router.route('/logout').get(pageController.getLogout)
router.route('/addpost').get(pageController.addPostPage)

export default router