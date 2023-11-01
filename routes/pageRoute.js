import express from "express"
import * as pageController from "../controller/pageController.js"

const router = express.Router()


router.route('/').get(pageController.getIndexPage)
router.route('/contact').get(pageController.getContactPage)
router.route('/about').get(pageController.getAboutPage)
router.route('/login').get(pageController.getLoginPage)
router.route('/register').get(pageController.getRegisterPage)

export default router