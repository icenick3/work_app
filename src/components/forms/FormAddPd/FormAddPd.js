import React, {useState} from 'react';
import './FormAddPd.css'
import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import {useAuth} from "../../../hooks/isAuth";
import {db} from "../../../firebase";
import add from '../../../images/addChatPd.png'

const FormAddPd = ({curTitle, active, setActive, type}) => {

    const {email} = useAuth();
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [uaText, setUaText] = useState();


    const onSubmit = async (e) => {
        e.preventDefault();
        if (type === 'chat'){
            await updateDoc(doc(db, email, curTitle+" | c"), {
                chatsPd: arrayUnion({
                    title: title,
                    text: text,
                    UAText: uaText
                })
            });
            setActive(false)
        }else if(type === 'ticket'){
            await updateDoc(doc(db, email, curTitle+" | t"), {
                ticketsPd: arrayUnion({
                    title: title,
                    text: text,
                    UAText: uaText
                })
            });
            setActive(false)
        }

    }

    return (
        <div className={active ? "activeAddPd" : "nonActive"}>
            <form onSubmit={onSubmit} >
                <input className="inTitle" type="text" placeholder={'title'} onChange={(e)=> setTitle(e.target.value)}/>
                <textarea className="textEng" placeholder='text' onChange={(e)=> setText(e.target.value)}></textarea>
                <textarea className="textUA" placeholder='text-Ukrainian' onChange={(e)=> setUaText(e.target.value)}></textarea>
                <button className="btnT"><img className="imgChatAdd" src={add} alt=""/></button>
            </form>
        </div>
    );
};

export default FormAddPd;