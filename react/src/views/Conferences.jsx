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

    const onDelete = (conference) => {
        if (!window.confirm(t('confirmations.delete-conference'))) {
            return
        }
        axiosClient.delete('/conferences/' + conference.id).then(() => {
            setNotification(t('notifications.conference-deleted'))
            getConferences();
        })
    }

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
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>{t("conferences.header")}</h2>
                {token && <Link to="/conferences/new" className="btn-add">{t("conferences.add")}</Link>}
            </div>
            <div className="card animated fadeInDown">
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
                            <td colSpan="5" className="text-center">
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
                                        <Link to={`/conferences/${c.id}`}
                                              className="btn-edit">{t('conferences.action-edit')}</Link>
                                        <>&nbsp;</>
                                        <button className="btn-delete"
                                                onClick={e => onDelete(c)}>{t('conferences.action-delete')}</button>
                                    </td>
                                    :
                                    <td>
                                        <Link to={`/conferences/${c.id}`} className="btn-edit">
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
