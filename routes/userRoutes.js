const express = require("express")
const { loginUser, logout, getUser, loggedInStatus, changePassword, updateUser, forgetPassword, resetpassword, registerUser } = require("../controllers/userController")
const protect = require("../middleware/authMiddleware")
const csurf = require("csurf")

const router = express.Router()

const csrfMiddleware = csurf({ cookie: true });


router.get("/csrf-token", (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logout)
router.get('/getUser', protect, getUser)
router.get('/loginStatus', loggedInStatus)
router.patch('/updateUser',protect, updateUser)
router.patch('/changePassword',protect, changePassword)
router.post('/forgetPassword', forgetPassword)
router.put('/resetpassword/:resetToken', resetpassword)

// router.get("/profile", protect, csrfMiddleware, getAgentProfile);


module.exports= router