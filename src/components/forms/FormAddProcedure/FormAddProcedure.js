import React, {useState} from 'react';
import './FormAddProcedure.css'
import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {useAuth} from "../../../hooks/isAuth";

const FormAddProcedure = ({active, setActive, curTitle}) => {


    const {email} = useAuth();
    const [title, setTitle] = useState();
    const [link, setLink] = useState();
    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, email, curTitle), {
            procedures: arrayUnion({
                title: title,
                link: link
            })
        });
        setActive(false)
        e.target.reset();

    }
    return (
        <div className={active ? "activeAddPd" : "nonActive"}>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder={'title'} onChange={(e) => setTitle(e.target.value)}/>
                <input type="text" placeholder={'link'} onChange={(e) => setLink(e.target.value)}/>
                <button>Add</button>
            </form>
        </div>
    );
};

export default FormAddProcedure;