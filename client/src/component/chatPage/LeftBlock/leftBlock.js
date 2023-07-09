import React, { useEffect, useState } from 'react';
import ChatsHeading from './chatHeading/chatsHead/chatsheading';


import { ChatState } from '../../../context/ChatProvidercontext';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import getSender, { getShortName } from '../../../logic';
function LeftBlock({ loadAgain }) {
    const { user, setSelectedChat, chats, setChat } = ChatState();

    const [loggedUser, setLoggedUser] = useState();
    const toast = useToast();

    //fetching all the chats of the user here
    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };
            const { data } = await axios.get("/user/chat", config);
            // console.log(data);
            setChat(data);
        } catch (error) {
            toast({
                title: "couldn't fetching chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            })

        }


    }
    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("chatapp-user")));
        fetchChats();
        // eslint-disable-next-line
    }, [loadAgain]);


    return (<>
        <div className='leftBlock'>
            <ChatsHeading />
            {chats ? (chats.map((chat) => (
                <div key={chat._id} className='contacts' onClick={() => setSelectedChat(chat)}>
                    <div className='avatar'>
                        <span>{!chat.isGroupChat ? (
                            getSender(loggedUser, chat.users).substring(0, 1).toUpperCase()
                        ) : (chat.chatName).substring(0, 1).toUpperCase()}</span>
                    </div>
                    <div className='contactname'>
                        <h2>
                            {!chat.isGroupChat ? (
                                getShortName(getSender(loggedUser, chat.users))
                            ) : getShortName(chat.chatName)}
                        </h2>
                    </div>
                </div>))) : null}

        </div>
    </>);
}

export default LeftBlock;