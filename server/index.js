const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const userRoute = require("./Routes/userRoutes");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoutes");
const cors = require("cors");
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

app.use("/user/chat/message", messageRoute);
app.use("/user", userRoute);
app.use("/user/chat", chatRoute);



const server = app.listen(process.env.PORT || 8080, () => {
    console.log(`server started on port ${process.env.PORT}`);
})

const io = require("socket.io")(server, {
    pingTimeOut: 1200000,
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    console.log("connected to socketIo");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    })
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("user joined the room " + room);
    })
    socket.on("new message", (newMessageRecieved) => {
        let chat = newMessageRecieved.chat;
        if (!chat) {
            return console.log("chat users not found!");
        }
        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sentFrom._id) {
                return;
            }
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    })
})