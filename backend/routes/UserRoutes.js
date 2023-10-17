const express = require("express")
const { register, login, getMe } = require("../controller/UserController")
const router = express.Router()
const {protect} = require("../midlleware/AuthMiddleware.js")


router.post("/",register)
router.post("/login",login)
router.get("/me",protect,getMe)

module.exports = router