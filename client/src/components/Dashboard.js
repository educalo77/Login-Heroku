import React, { Fragment, useState, useEffect } from 'react'; 
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import "./styles.css"

const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState(sessionStorage.getItem('name') || "");

    const userList = useSelector((state) => state.userList);
    const { users } = userList;



    async function getName() {
        if(localStorage.token){
        try {
            const response = await fetch("/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();

            setName(parseRes.user_name)

        } catch (err) {
            console.error(err.message);
        }
        }
        if (users) {
            setName(users.name);
        }
        
    }

    useEffect(() => {
        getName();
    },[]);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        sessionStorage.removeItem("name")
        setAuth(false);
        toast.success("Logged out successfully!");
        window.location = "/"
    }


    return ( 
        <Fragment >
            <div className="all">
            <div className="h1img">
            <h1 className="text">Welcome {name}  !</h1>
            <img src={users.imageUrl} alt={users.imageUrl} className="imageProfile" />
            </div>
            <div className="botlogout">
            <button className="botreg" onClick={e => logout(e)}>Logout</button>
            </div>
            </div>
    </Fragment>
    );
};

export default Dashboard;