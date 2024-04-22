import express from 'express'
import controller from '../Controller/authController.js'
import middleware from '../Middlewares/middleware.js'
const router = express.Router()

router.get('/all',controller.getAllUsers) // For Testing
router.post('/login',controller.login)
router.post('/signup/name',controller.setName)
router.post('/signup/gender',controller.setGender)
router.post('/signup/interest',controller.setInterest)
router.post('/secret',middleware.verifyToken,controller.secret) //Just For Check Middleware Works Properly

export default router