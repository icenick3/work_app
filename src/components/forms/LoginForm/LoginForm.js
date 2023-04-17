import React, {useState} from 'react';
import './LoginForm.css'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {showLogin, showSignup, showThankYou} from "./functions";
import {setUser} from "../../../store/slices/userSlice";
import {db} from "../../../firebase";

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);
    const onSubmitLogin = async (e) => {
        e.preventDefault()
        e.preventDefault();
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, pass).then(({user}) => {
            dispatch(
                setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                })
            );
        });
        await navigate("/chatPd");
    }

    const onSubmitRegister = async (e) => {
        e.preventDefault();
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, pass).then(({user}) => {
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.refreshToken,
                    })
                );
            });
            await setDoc(doc(db, email, "proceduresList"), {});
            await setDoc(doc(db, email, "chatsList"), {});
            await setDoc(doc(db, email, "ticketsList"), {});
            await navigate("/chatPd");
    }


    return (
        <div>
            <ul className="nav">
                <li onClick={showLogin}>Login</li>
                <li onClick={showSignup}>Sign up</li>
            </ul>
            <div className="wrapper">
                <div className="rec-prism">
                    <div className="face face-front">
                        <div className="content">
                            <h2>Sign in</h2>
                            <form onSubmit={onSubmitLogin}>
                                <div className="field-wrapper">
                                    <input type="text" name="username" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                                    <label>e-mail</label>
                                </div>
                                <div className="field-wrapper">
                                    <input type="password" name="password" placeholder="password" onChange={(e) => setPass(e.target.value)}/>
                                    <label>password</label>
                                </div>
                                <div className="field-wrapper">
                                    <input type="submit" onClick={showThankYou}/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="face face-right">
                        <div className="content">
                            <h2>Sign up</h2>
                            <form onSubmit={onSubmitRegister}>
                                <div className="field-wrapper">
                                    <input type="text" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                                    <label>e-mail</label>
                                </div>
                                <div className="field-wrapper">
                                    <input type="password" name="password" placeholder="password" onChange={(e) => setPass(e.target.value)}/>
                                    <label>password</label>
                                </div>
                                <span className="singin" onClick={showLogin}>Already a user?  Sign in</span>
                                <div className="field-wrapper">
                                    <input type="submit" onClick={showThankYou}/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="face face-bottom">
                        <div className="content">
                            <div className="thank-you-msg">
                                Thank you!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;