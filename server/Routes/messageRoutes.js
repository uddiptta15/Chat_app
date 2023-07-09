const express = require("express");
const { Protect } = require("../middleWare/authWare");
const { sendMessage, allMessages } = require("../controller/messageController");
const router = express.Router();
router.post("/", Protect, sendMessage);
router.get("/:chatId", Protect, allMessages);

module.exports = router;

