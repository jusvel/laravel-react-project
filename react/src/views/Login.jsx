import {createRef, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import LanguagePicker from "../components/LanguagePicker.jsx";
import {useTranslation} from "react-i18next";

export default function Login() {
    const emailRef = createRef();
    const passwordRef = createRef();
    const {setUser, setToken, setNotification} = useStateContext();
    const [errors, setErrors] = useState(null);
    const {t} = useTranslation();

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        setErrors(null);
        axiosClient.post('/login', payload).then(({data}) => {
            setUser(data.user);
            setToken(data.token);
            setNotification(t("notifications.logged-in"));
        }).catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    setErrors({
                        email: [response.data.message]
                    })
                }
            }
        })
    }

    return (
        <>
            <div className="login-form animated fadeInDown">
                <div className="form">
                    <form onSubmit={onSubmit}>
                        <h1 className="title">
                            {t("login.header")}
                        </h1>
                        {errors &&
                            <div className="alert">
                                {Object.keys(errors).map(key => (<p key={key}>{errors[key][0]}</p>))}
                            </div>}

                        <input ref={emailRef} type="email" placeholder={t("login.email")}/>
                        <input ref={passwordRef} type="password" placeholder={t("login.password")}/>
                        <button className="btn btn-block">{t("login.submit")}</button>

                    </form>
                </div>
            </div>
            <div style={{position: "absolute", top: 0, right: 0, margin: "20px"}}>
                <LanguagePicker/>
            </div>
        </>
    )
}
