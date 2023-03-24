const express = require("express")
const router = express.Router()
const { loginUser, registerUser } = require("../controllers/userController")

router.route("/")
  .post(registerUser) // create user

router.route("/login")
  .post(loginUser)

module.exports = router