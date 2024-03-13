import {Link} from "react-router-dom";

export default function ConferenceViewDetailsFields({t, conference}) {
    return <div>
        <strong>{t("conference-form.title")}</strong>
        <p className="conference-details">{conference.title}</p>
        <strong>{t("conference-form.description")}</strong>
        <p className="conference-details">{conference.description}</p>
        <strong>{t("conference-form.date")}</strong>
        <p className="conference-details">{new Date(conference.date).toDateString()}</p>
        <strong>{t("conference-form.city")}</strong>
        <p className="conference-details">{conference.city}</p>
        <strong>{t("conference-form.address")}</strong>
        <p className="conference-details">{conference.address}</p>
        <strong>{t("conference-form.number-of-participants")}</strong>
        <p className="conference-details">{conference.number_of_participants}</p>
        <strong>{t("conference-form.organizer")}</strong>
        <p className="conference-details">{conference.organizer}</p>
        <Link to={'/conferences'} className="btn-delete">{t("conference-form.back")}</Link>
    </div>
}
