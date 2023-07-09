const express = require("express");
const { Protect } = require("../middleWare/authWare");
const router = express.Router();
const { accessChat, getChats } = require("../controller/chatController");

router.route("/").post(Protect, accessChat);
router.route("/").get(Protect, getChats);


module.exports = router;