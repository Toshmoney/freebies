import React, { useEffect } from 'react';
const NavBar = () => {
    // useEffect(()=>{
    //     fetch("http://localhost:1000/profile", {
    //         credentials: "include"
    //     })
    // }, [])
  return (
        <nav className='header'>
            <div className='d-flex'>
                <h2><a className='logo' href="/">Homeworktips</a></h2>
                <button className='legal'>Legal</button>
            </div>
            <ul className='nav-items'>
                <li><a className='nav-link' href="/register">Register</a></li>
                <li><a className='nav-link' href="/login">Login</a></li>
            </ul>
        </nav>
  )
}

export default NavBar