import {createBrowserRouter, Navigate} from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout.jsx";
import Conferences from "./views/Conferences.jsx";
import ConferenceForm from "./views/ConferenceForm.jsx";
import LoginLayout from "./components/LoginLayout.jsx";
import Login from "./views/Login.jsx";
import NotFound from "./views/NotFound.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to={'/conferences'}/>
            },
            {
                path: '/conferences',
                element: <Conferences/>
            },
            {
                path: '/conferences/new',
                element: <ConferenceForm key="conferenceCreate"/>
            },
            {
                path: '/conferences/:id',
                element: <ConferenceForm key="conferenceUpdate"/>
            }
        ]
    },
    {
        path: '/',
        element: <LoginLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            }
        ]
    },

    {
        path: '*',
        element: <NotFound/>
    }
]);
export default router;

