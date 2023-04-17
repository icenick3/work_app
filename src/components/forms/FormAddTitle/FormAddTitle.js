import React, {useState} from 'react';
import {arrayUnion, doc, updateDoc, setDoc} from "firebase/firestore";
import {useAuth} from "../../../hooks/isAuth";
import {db} from "../../../firebase";
import addBtn from '../../../images/btnAdd.png'
import './FormAddTitle.css'

const FormAddTitle = ({active, setActive, type}) => {


    const {email} = useAuth();
    const [title, setTitle] = useState();
    const onSubmit = async (e) => {
        setActive(false)
        e.preventDefault()
        if (type === 'chat'){
            await updateDoc(doc(db, email, 'chatsList'), {
                titles: arrayUnion(title)
            });
            await setDoc(doc(db, email, title+" | c"), {
                chatsPd:[]
            })
        }
        else if(type === 'ticket'){
            await updateDoc(doc(db, email, 'ticketsList'), {
                titles: arrayUnion(title)
            });
            await setDoc(doc(db, email, title+" | t"), {
                ticketsPd:[]
            })
        }
    }

    return (
        <div className={active ? 'active' : 'nonActive'}>
            <form className={"form__group field"} onSubmit={onSubmit}>
                <input type="text" className="form__field" onChange={(e) => setTitle(e.target.value)} placeholder={'title'}/>
                <label htmlFor="name" className="form__label">Title</label>
                <button className={'btnT'} onClick={() => setActive(false)}><img className={"addBtnTitle"} src={addBtn} alt=""/></button>
            </form>
        </div>
    );
};

export default FormAddTitle;