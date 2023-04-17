import React from 'react';
import './Header.css'
import {Link} from "react-router-dom";
import chatIcon from '../../images/chatIcon.png'
import ticketIcon from '../../images/ticketIcon.png'
import procedureIcon from '../../images/procedureImg.png'
const Header = () => {
    return (
        <div className="header">
            <div className="properties">
                <div className="predefined">
                    <Link to={'/chatPd'}><img className="chatImg" src={chatIcon} alt="chats"/></Link>
                    <Link to={'/ticketPd'}><img className="ticketImg" src={ticketIcon} alt="tickets"/></Link>
                </div>
                <div className="procedures">
                    <Link to={'/procedures'}><img className="procedureImg" src={procedureIcon} alt=""/></Link>
                </div>
            </div>
        </div>
    );
};

export default Header;