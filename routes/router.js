const express = require('express')
const userController = require('../controllers/userController')

const router = new express.Router()

//register
router.post("/register",userController.registorController)

//LOGIN
router.post("/login",userController.loginController)

// list users
router.get("/users",userController.listUsersController)

// users details
router.get("/user",userController.getUserDetailsController)


module.exports = router