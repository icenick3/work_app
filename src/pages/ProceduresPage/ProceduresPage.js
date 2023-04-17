import React, {useEffect, useState} from 'react';
import {useAuth} from "../../hooks/isAuth";
import Header from "../../components/Header/Header";
import {Navigate, useLocation} from "react-router-dom";
import FormAddProcedureTitle from "../../components/forms/FormAddProcedureTitle/FormAddProcedureTitle";
import ButtonAddTitle from "../../components/buttons/ButtonAddTitle/ButtonAddTitle";
import addLogo from "../../images/addLogo.png";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";
import FormAddProcedure from "../../components/forms/FormAddProcedure/FormAddProcedure";
import ChatPd from "../../components/ChatPd/ChatPd";
import Procedure from "../../components/Procedure/Procedure";

const ProceduresPage = () => {
    const { isAuth, email } = useAuth();
    const [active, setActive] = useState(false);
    const [proceduresTitles, setProceduresTitles] = useState([])
    const [procedures, setProcedures] = useState([])
    const [curTitle, setCurTitle] = useState(null)
    const location = useLocation();
    const [activeForm, setActiveForm] = useState(false);



    useEffect(() => {
        try {
            const unSub = onSnapshot(doc(db, email, "proceduresList"), (doc) => {
                setProceduresTitles(doc.data().titles);
            });
            return () => {
                unSub();
            };
        } catch (e) {
            console.log(e)
        }

    }, [location || proceduresTitles]);

    useEffect(()=>{
        try {
            if (curTitle){
                const unSub = onSnapshot(doc(db, email, curTitle), (doc) => {
                    setProcedures(doc.data().procedures);
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
            <FormAddProcedureTitle active={active} setActive={setActive}/>
            <ButtonAddTitle setActive={setActive}/>
            <FormAddProcedure setActive={setActiveForm} active={activeForm} curTitle={curTitle}/>
            <div className="flex">
                <div className='chatsTitles'>
                    {proceduresTitles !== undefined && proceduresTitles.map((title, index) => <div className="ChatTitleContainer">
                        <div className="ChatTitle" id={`${index}`} onClick={onclickTitle}>{title}</div>
                        <img onClick={() => setActiveForm(true)} className={"nonActive"} id={`img+${index}`} src={addLogo} alt="" /></div>)}
                </div>
                <div className='chatsPd'>
                    {procedures !== undefined && procedures.map((elem)=> <Procedure elem={elem}/>)}
                </div>
            </div>

        </div>
    ): (
        <Navigate to="/login" />
    );
};

export default ProceduresPage;