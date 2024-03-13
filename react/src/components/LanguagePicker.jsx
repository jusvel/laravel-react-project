import {useTranslation} from "react-i18next";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function LanguagePicker() {
    const {t, i18n} = useTranslation();
    const {setNotification} = useStateContext();
    return (
        <select className="language-picker" onChange={e => {
            i18n.changeLanguage(e.target.value);
            setNotification(t("notifications.language-changed"));
            return;
        }} value={i18n.language}>
            <option value="en">English</option>
            <option value="lt">Lietuvių</option>
        </select>
    )
}
