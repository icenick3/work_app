import React from 'react';
import './ButtonAddTitle.css'

const ButtonAddTitle = ({setActive}) => {
    return (
        <button className="addTitle" onClick={()=>setActive(true)}>
            Add Title
        </button>
    );
};

export default ButtonAddTitle;