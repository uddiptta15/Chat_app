const asyncHandler = require("express-async-handler");
const Message = require("../model/message");
const User = require("../model/user");
const Chat = require("../model/chatModel");
const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log("invalid data passed");
        return res.statusCode(400);
    }

    try {
        let message = await Message.create({ sentFrom: req.user._id, content, chat: chatId });
        message = await (
            await message.populate("sentFrom", "username email")
        ).populate({
            path: "chat",
            select: "chatName isGroupChat users",
            model: "Chat",
            populate: { path: "users", select: "username email ", model: "User" },
        });

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message,
        });
        res.json(message);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

const allMessages = asyncHandler(async (req, res) => {
    try {
        const message = await Message.find({
            chat: req.params.chatId
        }).populate("sentFrom", "username email").populate("chat");
        res.json(message);
    } catch (error) {
        res.status(400).send(error.message);
    }
})
module.exports = { sendMessage, allMessages };