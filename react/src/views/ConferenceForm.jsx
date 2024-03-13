import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import "react-datepicker/dist/react-datepicker.css";
import ConferenceFormComponent from "../components/ConferenceFormComponent.jsx";
import ConferenceViewDetailsFields from "../components/ConferenceViewDetailsFields.jsx";

export default function ConferenceForm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const {token} = useStateContext();
    const [conference, setConference] = useState({
        id: null,
        name: '',
        description: '',
        date: '',
        city: '',
        address: '',
        number_of_participants: '',
        organizer: ''
    });
    const {t} = useTranslation();

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/conferences/${id}`)
                .then(({data}) => {
                    setLoading(false);
                    setConference(data);
                }).catch(() => {
                setLoading(false);
            })
        }, [])
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (conference.id) {
            axiosClient.patch(`conferences/${conference.id}`, conference)
                .then(() => {
                    navigate('/conferences');
                }).catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })
        } else {
            axiosClient.post('/conferences', conference)
                .then(() => {
                    navigate('/conferences');
                }).catch((err) => {
                const response = err.response;
                console.log(response)
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })
        }
    }

    return (
        <>
            {token ?
                <>
                    {!loading && conference.id && <h1>{t("conference-form.edit-conference")}: {conference.title}</h1>}
                    {!loading && !conference.id && <h1>{t("conference-form.new-conference")}</h1>}
                </>
                :
                <h1>{t("conference-form.view-conference")}</h1>
            }
            <div className="card animated fadeInDown">
                {loading &&
                    <div className="text-center">{t("loading.loading")}</div>
                }
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (<p key={key}>{errors[key][0]}</p>))}
                    </div>
                }

                {!loading && token &&
                    <ConferenceFormComponent conference={conference} setConference={setConference} t={t}
                                             onSubmit={onSubmit}/>}
                {!loading && !token && <ConferenceViewDetailsFields conference={conference} t={t}/>}
            </div>
        </>
    )
}


