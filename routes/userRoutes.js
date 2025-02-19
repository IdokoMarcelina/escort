const express = require("express")
const { loginUser, logout, getUser, loggedInStatus, changePassword, updateUser, forgetPassword, resetpassword, registerUser } = require("../controllers/userController")
const protect = require("../middleware/authMiddleware")

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logout)
router.get('/getUser', protect, getUser)
router.get('/loginStatus', loggedInStatus)
router.patch('/updateUser',protect, updateUser)
router.patch('/changePassword',protect, changePassword)
router.post('/forgetPassword', forgetPassword)
router.put('/resetpassword/:resetToken', resetpassword)


module.exports= router