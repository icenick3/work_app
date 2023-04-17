import React from 'react';
import './Procedure.css'


const Procedure = ({elem}) => {
    return (
        <div className="procedure">
            <h1>{elem.title}</h1>
            <a href={elem.link}>Procedure</a>
        </div>
    );
};

export default Procedure;