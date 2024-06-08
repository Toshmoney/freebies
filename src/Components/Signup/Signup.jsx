import React, { useState } from 'react'
import '../Login/login.css'
const Signup = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setconfirmPassword] = useState('')

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

        <h2>Register to get started</h2>
        <form onSubmit={handleReg}>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder='Email' value={email} onChange={ev => setEmail(ev.target.value)} />
                
                <label htmlFor="username">Username</label>
                <input type="text" placeholder='username' value={username} onChange={ev => setUsername(ev.target.value)} />

                <label htmlFor="username">Password</label>
                <input type="password" placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)} />
                
                <label htmlFor="conformpassword">Confirm password</label>
                <input type="password" placeholder='confirm password' value={confirmpassword} onChange={ev => setconfirmPassword(ev.target.value)} />
                <div>
                    <button type="submit" className='login'>Sign Up</button>
                </div>
        </form>
        <h3>Already have an account? <a href="/login">Log in</a></h3>
    </div>
  )
}

export default Signup;