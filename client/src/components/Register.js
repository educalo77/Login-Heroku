import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const { email, password, name } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async e => {
        e.preventDefault();

        try {
            const body = { email, name, password };
            
            const response = await fetch("/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            console.log(parseRes)

            if (parseRes.token) {
            localStorage.setItem("token", parseRes.token);
                setAuth(true);  
                toast.success("Registered successfully!")                
            } else {
                setAuth(false);
                toast.error(parseRes);
            }
            
        } catch (err) {
            console.error(err.message)
        }
    }

    return ( 
    <Fragment>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm} >
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
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    className="form-control my-3"
                    value={name}
                    onChange={e => onChange(e)}
                />
                <button className="botsubmit">Submit</button>
            </form>
            <div className="googlelogin">
            <button className="botreg">
            <Link to="/" className="linkreg" style={{ textDecoration: 'none' }}>Login</Link>
            </button>
            </div>
    </Fragment>
    );
};

export default Register;