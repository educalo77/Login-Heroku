import React, {Fragment, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleLogin from 'react-google-login';
import { useDispatch } from "react-redux";
import { getUser } from "../components/redux/useraction";
import "./styles.css"

const Login = ({ setAuth }) => {

    
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();

    const { email, password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = { email, password };
            
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
                        
            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Login successfully!")
            } else {
                setAuth(false);
                toast.error(parseRes);
            }
            
        } catch (err) {
            console.error(err.message)
        }
    }

    const responseGoogle = (res) => {
        const data = { 
            name: res.profileObj.name,
            imageUrl: res.profileObj.imageUrl,
            email: res.profileObj.email
        }
        dispatch(getUser(data));
        if (res.profileObj) {
            setAuth(true);
            toast.success("Login successfully!");
         }
        else {
            toast.error("Login Error");
        }
    };

    return ( 
    <Fragment>
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="form-control my-3"
                    value={email}
                    onChange={e => onChange(e)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="form-control my-3"
                    value={password}
                    onChange={e => onChange(e)}
                />
            <button className="botsubmit">Submit</button>
            </form>
            <div className="googlelogin">
            <button className="botreg">
            <Link to="/register" className="linkreg" style={{ textDecoration: 'none' }}>Register</Link>
            </button>
            <GoogleLogin
            clientId="274236062060-1vk0mne3n6li5bgj5lu4sruoa2agrp2l.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            className="googlebot"
            />
            </div>
    </Fragment>
    );
};

export default Login;