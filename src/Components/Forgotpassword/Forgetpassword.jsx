import React, { useState } from 'react';
import {Navigate} from "react-router-dom";
import "./login.css";

const Forgotpassword = () => {
    const [userDetails, setUserDetails] = useState({
        email : "",
    });
    const [redirect, setRedirect] = useState(false)

    const handleChange = (event)=>{
        const {value, name} = event.target;
        setUserDetails( prevData =>({...prevData, [name] : value}))
    }

    const handleLogin = async(event)=>{
        event.preventDefault();
        const response = await fetch("http://localhost:1000/login", {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers : {'Content-Type' : 'application/json'},
            credentials: "include"
        })
        if(response.ok){
            setRedirect(true)
        }else{
            alert("Wrong Credentials")
        }
    }

    if(redirect){
        return <Navigate to={"/"}/>
    }

  return (
    <div className='container'>
        <h2>Forgot Pasword</h2>
        <form onSubmit={handleLogin}>
                <label htmlFor="username">Email </label>
                <input type="text" placeholder='username' name='username' id='username' value={userDetails.username} onChange={handleChange} />

                <div>
                    <button type="submit" className='login'>Login</button>
                </div>
        </form>
        <h3>Don't have an account? <a href="/register">Sign up</a></h3>
    </div>
  )
}

export default Forgotpassword