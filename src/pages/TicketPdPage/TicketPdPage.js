import React, {useEffect, useState} from 'react';
import {useAuth} from "../../hooks/isAuth";
import Header from "../../components/Header/Header";
import {Navigate, useLocation} from "react-router-dom";
import FormAddTitle from "../../components/forms/FormAddTitle/FormAddTitle";
import ButtonAddTitle from "../../components/buttons/ButtonAddTitle/ButtonAddTitle";
import FormAddPd from "../../components/forms/FormAddPd/FormAddPd";
import addLogo from "../../images/addLogo.png";
import ChatPd from "../../components/ChatPd/ChatPd";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";

const TicketPdPage = () => {

    const { isAuth, email } = useAuth();
    const [tickets, setTickets] = useState([]);
    const location = useLocation();
    const [curTitle, setCurTitle] = useState(null)
    const [active, setActive] = useState(false);
    const [activeForm, setActiveForm] = useState(false);
    const [ticketsPd, setTicketsPd] = useState([])



    useEffect(() => {
        try {
            const unSub = onSnapshot(doc(db, email, "ticketsList"), (doc) => {
                setTickets(doc.data().titles);
            });
            return () => {
                unSub();
            };
        } catch (e) {
            console.log(e)
        }

    }, [location || tickets]);

    useEffect(()=>{
        try {
            if (curTitle){
                const unSub = onSnapshot(doc(db, email, curTitle+" | t"), (doc) => {
                    setTicketsPd(doc.data().ticketsPd);
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
            <FormAddTitle active={active} setActive={setActive} type={'ticket'}/>
            <ButtonAddTitle setActive={setActive}/>
            <FormAddPd curTitle={curTitle} active={activeForm} setActive={setActiveForm} type={'ticket'}/>
            <div className="flex">
                <div className='chatsTitles'>
                    {tickets !== undefined && tickets.map((title, index) => <div className="ChatTitleContainer">
                        <div className="ChatTitle" id={`${index}`} onClick={onclickTitle}>{title}</div>
                        <img onClick={() => setActiveForm(true)} className={"nonActive"} id={`img+${index}`} src={addLogo} alt="" /></div>)}
                </div>
                <div className='chatsPd'>
                    {ticketsPd !== undefined && ticketsPd.map((elem)=> <ChatPd elem={elem}/>)}
                </div>
            </div>
        </div>
    ): (
        <Navigate to="/login" />
    );
};

export default TicketPdPage;