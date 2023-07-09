
import React from 'react';


import { ChatState } from '../../../context/ChatProvidercontext';

export const ChatMessages = ({ messages }) => {


    const { user } = ChatState();

    return (
        <>
            {messages && messages.map((m, i) => {
                return (
                    <>{(m.sentFrom._id === user._id) ? (<div key={i} className='chat right'>{m.content}</div>) : (<div className='chat left'>{m.content}</div>)} </>
                )
            })}
        </>
    )
}
