import {Link, Outlet, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";
import LanguagePicker from "./LanguagePicker.jsx";

export default function DefaultLayout() {
    const {t} = useTranslation();
    const {user, token, setUser, setToken, notification, setNotification} = useStateContext()
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout').then(() => {
            setUser({});
            setToken(null);
            setNotification(t("notifications.logged-out"));
        });
    }

    useEffect(() => {
        token && axiosClient.get("/user").then(({data}) => {
            setUser(data);
        })
    }, [])

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <h1 onClick={() => navigate('/')} className="btn-logout" style={{fontSize: '40px'}}>
                        {t('default-layout.header')}
                    </h1>
                    <div className="header-controls">
                        <LanguagePicker/>
                        {token &&
                            <>
                                <strong>
                                    {t('default-layout.greet')} {user.name}
                                </strong>
                                <button className="btn-logout" onClick={handleLogout}>
                                    {t("default-layout.logout")}
                                </button>
                            </>
                        }
                        {!token &&
                            <Link to={'/login'} className="btn-login">
                                {t("default-layout.login")}
                            </Link>
                        }
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
            {notification &&
                <div className="notification">
                    {notification}
                </div>
            }
        </div>
    )
}
