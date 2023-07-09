const express = require("express");
const router = express.Router();
const { Protect } = require("../middleWare/authWare")

const { UserRegister, UserLogin, allUser } = require("../controller/userController")
router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/", Protect, allUser);

module.exports = router;