import React, { useState } from 'react';
import {Navigate} from "react-router-dom";
import "./login.css";

const Login = () => {
    const [userDetails, setUserDetails] = useState({
        username : "",
        password: ""
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
        <h2>Welcome Back!</h2>
        <form onSubmit={handleLogin}>
                <label htmlFor="username">Username </label>
                <input type="text" placeholder='username' name='username' id='username' value={userDetails.username} onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input type="password" name='password' id='password' placeholder='password' value={userDetails.password} onChange={handleChange} />
            <button type="submit" className='login'>Login</button>

        </form>
        <h3>Don't have an account? <a href="/register">Sign Up</a></h3>
    </div>
  )
}

export default Login