const asyncHandler = require("express-async-handler");
const Chat = require("../model/chatModel");
const User = require("../model/user");
// creating one to one chat
const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        console.log("userId not sent");
        return res.status(400);
    }
    var isChat = await Chat.findOne({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password").populate("latestMessage");
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "username email",
    })

    if (isChat != null && isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        }

        try {
            const createChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createChat._id }).populate("users", "-password");
            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
})
const getChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } }).populate("users", "-password")
            .populate("latestMessage").populate("groupAdmin", "-password")
            .sort({ updatedAt: -1 }).then(async (result) => {
                result = await User.populate(result, {
                    path: "latestMessage.sender",
                    select: "username email",
                })
                res.status(200).send(result);
            })

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

module.exports = { accessChat, getChats };