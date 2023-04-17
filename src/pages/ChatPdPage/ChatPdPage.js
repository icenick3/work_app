import React, {useEffect, useState} from 'react';
import {useAuth} from "../../hooks/isAuth";
import {Navigate, useLocation} from "react-router-dom";
import Header from "../../components/Header/Header";
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../../firebase";
import addLogo from '../../images/addLogo.png'
import './ChatPdPage.css'
import ButtonAddTitle from "../../components/buttons/ButtonAddTitle/ButtonAddTitle";
import FormAddTitle from "../../components/forms/FormAddTitle/FormAddTitle";
import ChatPd from "../../components/ChatPd/ChatPd";
import FormAddPd from "../../components/forms/FormAddPd/FormAddPd";


const ChatPdPage = () => {
    const { isAuth, email } = useAuth();
    const [chats, setChat] = useState([]);
    const location = useLocation();
    const [curTitle, setCurTitle] = useState(null)
    const [active, setActive] = useState(false);
    const [activeForm, setActiveForm] = useState(false);
    const [chatPd, setChatPd] = useState([])



    useEffect(() => {
        try {
            const unSub = onSnapshot(doc(db, email, "chatsList"), (doc) => {
                setChat(doc.data().titles);
            });
            return () => {
                unSub();
            };
        } catch (e) {
            console.log(e)
        }

    }, [location || chats]);

    useEffect(()=>{
        try {
            if (curTitle){
                const unSub = onSnapshot(doc(db, email, curTitle+" | c"), (doc) => {
                    setChatPd(doc.data().chatsPd);
                });
                return () => {
                    unSub();
                };
            }
        } catch (e) {
            console.log(e)
        }
    },[curTitle])

    const onclickTitle =  (e) => {
        setCurTitle(e.target.innerHTML);
        const foo = document.getElementsByClassName('selectedBlock')
        const imgs = document.getElementsByClassName('addChatsPd')
        const img = document.getElementById(`img+${e.target.id}`)
        for (let i = 0; i < foo.length; i++) {
            foo[i].classList.remove("selectedBlock");
        }
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].classList.remove("addChatsPd");
        }
        img.classList.add("addChatsPd")
        e.target.classList.add('selectedBlock')
    }

    return isAuth ? (
        <div>
            <Header/>
            <FormAddTitle active={active} setActive={setActive} type={'chat'}/>
            <ButtonAddTitle setActive={setActive}/>
            <FormAddPd curTitle={curTitle} active={activeForm} setActive={setActiveForm} type={'chat'}/>
            <div className="flex">
                <div className='chatsTitles'>
                    {chats !== undefined && chats.map((title, index) => <div className="ChatTitleContainer">
                        <div className="ChatTitle" id={`${index}`} onClick={onclickTitle}>{title}</div>
                        <img onClick={() => setActiveForm(true)} className={"nonActive"} id={`img+${index}`} src={addLogo} alt="" /></div>)}
                </div>
                <div className='chatsPd'>
                    {chatPd !== undefined && chatPd.map((elem)=> <ChatPd elem={elem}/>)}
                </div>
            </div>
        </div>
    ): (
        <Navigate to="/login" />
    );
};

export default ChatPdPage;