import {createRef, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

export default function Login() {
    const emailRef = createRef();
    const passwordRef = createRef();
    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);

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
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <h1>
                        Login
                    </h1>
                    {errors &&
                        <div>
                            {Object.keys(errors).map(key => (<p key={key}>{errors[key][0]}</p>))}
                        </div>}

                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <button>login</button>

                </form>
            </div>
        </div>
    )
}
