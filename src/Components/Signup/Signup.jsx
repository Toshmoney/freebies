import React, { useState } from 'react'
import '../Login/login.css'
const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleReg(e){
        e.preventDefault();
        try {
            await fetch("http://localhost:1000/register", {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers : {'Content-Type' : 'application/json'}
        })
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='container'>

        <h2>Sign Up To Get Started</h2>
        <form onSubmit={handleReg}>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder='username' value={username} onChange={ev => setUsername(ev.target.value)} />

                <label htmlFor="username">Password</label>
                <input type="password" placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)} />
            <button type="submit" className='login'>Sign Up</button>
        </form>
        <h3>Already have an account? <a href="/login">Sign In</a></h3>
    </div>
  )
}

export default Signup;