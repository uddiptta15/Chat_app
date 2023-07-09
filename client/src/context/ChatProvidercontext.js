import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const chatContext = createContext();
const ChatProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChat] = useState([]);
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("chatapp-user"));
        setUser(userInfo);
        // console.log(userInfo);
        if (!userInfo) {
            navigate("/user/login");
        }
    }, [navigate]);
    return (<chatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChat }}>
        {children}
    </chatContext.Provider>)
}
export const ChatState = () => {
    return useContext(chatContext);
}
export default ChatProvider;