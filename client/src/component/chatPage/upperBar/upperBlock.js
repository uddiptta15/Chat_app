import React, { useState } from 'react';
import { ChatState } from '../../../context/ChatProvidercontext';
import { useNavigate } from 'react-router-dom';
import {
    Drawer,
    DrawerBody,

    DrawerHeader,
    DrawerOverlay,
    DrawerContent,

    Box,
    Input,
    useToast,
    Spinner
} from '@chakra-ui/react';
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from 'axios';
import Loader from '../loader';
import UserList from '../searchResultUser';
function UpperBlock() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const { user, setSelectedChat, chats, setChat } = ChatState();
    const navigate = useNavigate();
    const Logoout = (e) => {
        e.preventDefault();
        localStorage.removeItem("chatapp-user");
        navigate("/");
    }
    const toast = useToast();

    const handleSearch = async () => {
        if (!search) {
            return toast({
                title: "please write username in the field",
                status: "warning",
                duration: 4000,
                isClosable: true,
                position: "top-left",
            })
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }
            const { data } = await axios.get(`/user?search=${search}`, config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "failed to load the result",
                status: "error",
                duration: 6000,
                isClosable: true,
                position: "top-right",
            })
        }
    }
    const accessUserChat = async (userId) => {
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post("/user/chat", { userId }, config);
            if (!chats.find((c) => c._id === data._id)) { setChat([data, ...chats]); }
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();

        } catch (error) {
            toast({
                title: "Couldn't access the chat",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            })
        }
    }
    return (<>

        <div className='upperblock'>
            <div className="search">
                <span><Button variant="ghost" onClick={onOpen} marginLeft={5} marginTop={1} backgroundColor={'red'}> Search users here </Button>
                </span>
            </div>
            <span> <h3>{user.username}</h3></span>
            <div className='upperButton'>
                <Button type='submit' className='logOut' height="70%" onClick={(e) => Logoout(e)}>Log Out</Button>
            </div>

        </div>
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">search users</DrawerHeader>

                <DrawerBody>
                    <Box display='flex' pb={1.5}>
                        <Input
                            placeholder='type username here'
                            marginRight={1.5}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button
                            onClick={handleSearch}
                        >Search</Button>
                    </Box>
                    {loading ? (
                        <Loader />
                    ) : (
                        searchResult?.map((user) => (
                            <UserList
                                key={user._id}
                                user={user}
                                handleUserListFunction={() => accessUserChat(user._id)}
                            />
                        ))
                    )}
                    {loadingChat && <Spinner margin={'auto'} display={'flex'} />}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>)
}

export default UpperBlock;