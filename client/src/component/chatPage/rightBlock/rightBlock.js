import React, { useEffect, useState } from 'react';

import { ChatState } from '../../../context/ChatProvidercontext';
import getSender from '../../../logic';
import { } from '@chakra-ui/icons';
import { Button, FormControl, Input, Spinner, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { ChatMessages } from './ChatMessages';

import io from "socket.io-client";


const ENDPOINT = "http://localhost:8080";

let socket, selectedChatCompare;

function RightBlock() {
    const [message, setMessage] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState(false);
    const [newMessage, setNewMessage] = useState();
    // eslint-disable-next-line
    const [socketConnection, setSocketConnection] = useState(false);

    const toast = useToast();
    const { user, selectedChat } = ChatState();





    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connection", () => {
            setSocketConnection(true);
        })
    })
    const sendMessage = async (e) => {
        if ((e.key === 'Enter' && newMessage) || (e.target.value === 'submit' && newMessage)) {

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");
                const { data } = await axios.post(
                    "/user/chat/message",
                    {
                        content: newMessage,
                        chatId: selectedChat,
                    },
                    config
                );
                // console.log(data);
                socket.emit("new message", data);
                setMessage([...message, data]);
            } catch (error) {
                toast({
                    title: "something went wrong",
                    duration: 5000,
                    position: "top",
                    isClosable: true,
                    status: "error"
                })
            }
        }

    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    }

    const fetchMessages = async () => {
        if (!selectedChat) {
            return;
        }
        try {
            const config = {
                headers: {

                    Authorization: `Bearer ${user.token}`,
                },
            };
            setLoadingMessage(true);
            const { data } = await axios.get(`/user/chat/message/${selectedChat._id}`, config);
            // console.log(message);
            setMessage(data);
            setLoadingMessage(false);
            socket.emit("join chat", selectedChat._id);

        } catch (error) {
            toast({
                title: "something went wrong",
                duration: 5000,
                position: "top",
                isClosable: true,
                status: "error"
            })
        }
    }
    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
        // eslint-disable-next-line
    }, [selectedChat])


    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                // here we can give notification will do it later 
            } else {
                setMessage([...message, newMessageRecieved]);
            }
        })
    })


    return (
        <>   {selectedChat ? (<div className='rightBlock'>

            <div className='contactPerson'>
                <span><h2>{!selectedChat.isGroupChat ? (<>{getSender(user, selectedChat.users)}</>) : (<>
                    {selectedChat.chatName.toUpperCase()}
                </>)}</h2></span>

            </div>

            {loadingMessage ? (<Spinner alignSelf={'center'} height={'20'} width={'30'} />) : (

                <><div className='messages'>
                    <ChatMessages messages={message} />

                </div>

                </>
            )}

            <div className='inputDiv'>
                <FormControl onKeyDown={sendMessage} isRequired >
                    <Input type='text' name='message' id='sendMessage' placeholder='write your message' variant={'filled'} onChange={typingHandler} value={newMessage} />
                    <Button type='submit' value="submit" onClick={(e) => sendMessage(e)} id='sendButton'>send</Button>
                </FormControl>

            </div>
        </div>) : (<div className='rightBlock notOpened'>
            <h1>Select a chat contact to chat</h1>
        </div>)}

        </>
    );
}

export default RightBlock;