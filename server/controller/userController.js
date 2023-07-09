const express = require("express");
const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const GenerateToken = require("../database/Token");
const bcrypt = require("bcryptjs");
// user?search=abc here search is the querry
const allUser = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],
    } : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
});

// registration
const UserRegister = asyncHandler(async (req, res, next) => {
    const { email, username, password, pic } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("enter required field");
    }
    const ExistingUser = await User.findOne({ email });
    if (ExistingUser) {
        res.status(400);
        throw new Error("User Already Exist");
    }
    const Salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(password, Salt);
    const user = await User.create({
        username, email, password: secPassword, pic,
    });
    if (user) {
        res.status(201)
            .json({
                _id: user._id,
                email: user.email,
                username: user.username,
                token: GenerateToken(user._id),
            });
    } else {
        res.status(400);
        throw new Error("Can't create user");
    }
});

const UserLogin = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ msg: "Incorrect credentials", status: false });
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.json({ msg: "Incorrect credentials", status: false });
        }
        // we will not send the password to the user so
        return res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: GenerateToken(user._id),
            status: true
        });
    } catch (error) {
        next(error);
    }

})

module.exports = { UserRegister, UserLogin, allUser };
