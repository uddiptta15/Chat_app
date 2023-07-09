import React, { useState } from 'react';
import UpperBlock from "./upperBar/upperBlock";
import LeftBlock from "./LeftBlock/leftBlock";
import RightBlock from "./rightBlock/rightBlock";

import { ChatState } from '../../context/ChatProvidercontext';
function ChatMain() {
    const { user } = ChatState();
    const [loadAgain, setLoadAgain] = useState(false);
    return (<>
        <div className="app">
            {user && <UpperBlock />}
            <div className="container">
                {user && <LeftBlock loadAgain={loadAgain} />}
                {user && <RightBlock loadAgain={loadAgain} setLoadAgain={setLoadAgain} />}
            </div>
        </div>
    </>)
}

export default ChatMain;