import {Link, Outlet} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";
import LanguagePicker from "./LanguagePicker.jsx";

export default function DefaultLayout() {
    const {t} = useTranslation();
    const {user, token, setUser, setToken} = useStateContext()

    const handleLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout').then(() => {
            setUser({});
            setToken(null);
        });
    }

    useEffect(() => {
        token && axiosClient.get("/user").then(({data}) => {
            setUser(data);
        })
    }, [])

    return (
        <div>
            <div>
                <header>
                    <h1>
                        {t('default-layout.header')}
                    </h1>
                    <div>
                        <LanguagePicker/>
                        {token &&
                            <>
                                <strong>
                                    {t('default-layout.greet')} {user.name}
                                </strong>
                                <button onClick={handleLogout}>
                                    {t("default-layout.logout")}
                                </button>
                            </>
                        }
                        {!token &&
                            <Link to={'/login'}>
                                {t("default-layout.login")}
                            </Link>
                        }
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
