import React, {useState} from 'react';
import './ChatPd.css'

const ChatPd = ({elem}) => {

    const [active, setActive] = useState(false);
    const onCopy = async () => {
        await navigator.clipboard.writeText(elem.text)
        setActive(true)
        setTimeout(()=>{setActive(false)}, 50)
    }

    return (
        <div className={active ? "mainChatPd copy" : "mainChatPd"} onClick={onCopy} >
            <h1>{elem.title}</h1>
            <p>{elem.text}</p>
            <hr/>
            <p>{elem.UAText}</p>
        </div>
    );
};

export default ChatPd;