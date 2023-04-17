import React, {useState} from 'react';
import addBtn from "../../../images/btnAdd.png";
import {arrayUnion, doc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {useAuth} from "../../../hooks/isAuth";

const FormAddProcedureTitle = ({active, setActive}) => {
    const {email} = useAuth();
    const [title, setTitle] = useState();
    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, email, 'proceduresList'), {
            titles: arrayUnion(title)
        });
        await setDoc(doc(db, email, title), {
            procedures: []
        })
        e.target.reset()
        setActive(false)
    }
    return (
        <div className={active ? 'active' : 'nonActive'}>
            <form className={"form__group field"} onSubmit={onSubmit}>
                <input type="text" className="form__field" onChange={(e) => setTitle(e.target.value)}
                       placeholder={'title'}/>
                <label htmlFor="name" className="form__label">Title</label>
                <button className={'btnT'} onClick={() => setActive(false)}><img className={"addBtnTitle"} src={addBtn} alt=""/></button>
            </form>
        </div>
    );
};

export default FormAddProcedureTitle;