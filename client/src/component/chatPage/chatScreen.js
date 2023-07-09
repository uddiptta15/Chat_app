import React from 'react';
import ChatMain from './chatMain';
import ChatProvider from '../../context/ChatProvidercontext';
import { ChakraProvider } from "@chakra-ui/react";
function ChatScreen() {


  return (
    <><ChatProvider>
      <ChakraProvider>
        <ChatMain />
      </ChakraProvider>
    </ChatProvider>
    </>
  )
}
export default ChatScreen;
