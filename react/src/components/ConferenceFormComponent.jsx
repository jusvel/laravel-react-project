import DatePicker from "react-datepicker";

export default function ConferenceFormComponent({conference, setConference, t, onSubmit}) {

    return (
        <form onSubmit={onSubmit}>
            <strong>{t("conference-form.title")}</strong>
            <input value={conference.title}
                   onChange={e => setConference({...conference, title: e.target.value})}
                   placeholder={t("conference-form.title")}/>

            <strong>{t("conference-form.description")}</strong>
            <textarea value={conference.description}
                      onChange={e => setConference({...conference, description: e.target.value})}
                      placeholder={t("conference-form.description")}/>

            <strong style={{display: "block"}}>{t("conference-form.date")}</strong>
            <DatePicker selected={conference.date}
                        onChange={(date) => {
                            setConference({...conference, date: new Date(date).toDateString()});
                        }} placeholderText={t("conference-form.date")}/>

            <strong style={{display: "block"}}>{t("conference-form.city")}</strong>
            <input value={conference.city}
                   onChange={e => setConference({...conference, city: e.target.value})}
                   placeholder={t("conference-form.city")}/>

            <strong>{t("conference-form.address")}</strong>
            <input value={conference.address}
                   onChange={e => setConference({...conference, address: e.target.value})}
                   placeholder={t("conference-form.address")}/>

            <strong>{t("conference-form.number-of-participants")}</strong>
            <input value={conference.number_of_participants}
                   onChange={e => setConference({...conference, number_of_participants: e.target.value})}
                   placeholder={t("conference-form.number-of-participants")}/>

            <strong>{t("conference-form.organizer")}</strong>
            <input value={conference.organizer}
                   onChange={e => setConference({...conference, organizer: e.target.value})}
                   placeholder={t("conference-form.organizer")}/>

            <button className="btn"
                    style={{borderRadius: '4px', fontSize: '20px'}}>{t("conference-form.save")}</button>
        </form>
    );
}
