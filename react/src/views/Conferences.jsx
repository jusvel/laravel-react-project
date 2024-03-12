import {useEffect, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useTranslation} from "react-i18next";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";

export default function Conferences() {
    const [conferences, setConferences] = useState([])
    const [loading, setLoading] = useState(false)
    const {token, setNotification} = useStateContext()
    const {t} = useTranslation();

    useEffect(() => {
        getConferences()
    }, []);

    const getConferences = () => {
        setLoading(true)
        axiosClient.get('/conferences').then(({data}) => {
            setLoading(false)
            setConferences(data);
        }).catch(err => {
            setLoading(false);
            setNotification(t("errors.server-error"));
        })
    }

    return (
        <div>
            <div>
                <h1>{t("conferences.header")}</h1>
                {token && <Link to="/conferences/new">{t("conferences.add")}</Link>}
            </div>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>{t("conferences.title")}</th>
                        <th>{t("conferences.description")}</th>
                        <th>{t("conferences.date")}</th>
                        <th>{t("conferences.city")}</th>
                        <th>{t("conferences.actions")}</th>
                    </tr>
                    </thead>
                    {loading &&
                        <tbody>
                        <tr>
                            <td colSpan="5">
                                {t("loading.loading")}
                            </td>
                        </tr>
                        </tbody>
                    }
                    {!loading &&
                        <tbody>
                        {conferences.map(c => (
                            <tr key={c.id}>
                                <td>{c.title}</td>
                                <td>{c.description.slice(0, 80) + "..."}</td>
                                <td>{new Date(c.date).toDateString()}</td>
                                <td>{c.city}</td>
                                {token ?
                                    <td>
                                        <Link to={`/conferences/${c.id}`}>{t('conferences.action-edit')}</Link>
                                        <>&nbsp;</>
                                        <button>{t('conferences.action-delete')}</button>
                                    </td>
                                    :
                                    <td>
                                        <Link to={`/conferences/${c.id}`}>
                                            {t("conferences.action-view")}
                                        </Link>
                                    </td>
                                }
                            </tr>
                        ))}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}
