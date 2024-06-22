import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";

export default function RegisterPage() {
  const { setUserInfo } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    setLoading(true);

    if (!username || !email || !password) {
      setLoading(false);
      return toast.error("All fields are required!");
    }

    if (password !== confirmpassword) {
      setLoading(false);
      return toast.error("Password and confirm password do not match!");
    }

    try {
      const response = await fetch('https://homeworktips-22mg.onrender.com/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.status === 201) {
        setUserInfo({ username, email, token: data.token });
        toast.success('Registration successful');
      } else {
        toast.error(data.error || 'Registration failed');
      }
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred. Please try again.');
    }
  }

  return (
    <div className="flex flex-col w-full justify-center h-[87vh] items-center gap-5">
      {/* SEO Settings... Don't touch it oo */}
      <Helmet>
                <meta charSet="utf-8" />
                <title>Sign Up Page | Homeworktips</title>
                <meta name="description" content="Home work tips Registration page" />
                <link rel="canonical" href="http://homeworktips.info/register" />
      </Helmet>

      {/* End of SEO Settings... Don't touch it oo */}
      <ToastContainer />
      <form className="flex flex-col md:w-[50%] w-full justify-center items-center gap-5" onSubmit={register}>
        <h1 className="text-[23px]">Register To Get Started</h1>
        
        <div className="flex flex-col w-[80%] gap-3">
          <label className="font-semibold text-[20px]">Username</label>
          <input
            type="text"
            placeholder="Username e.g Tosh"
            value={username}
            onChange={ev => setUsername(ev.target.value)}
            className="h-[45px] px-3 rounded-full outline-[#51B73B] border-[#51B73B] border bg-white"
            required
            minLength={3}
          />
        </div>

        <div className="flex flex-col w-[80%] gap-3">
          <label className="font-semibold text-[20px]">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={ev => setEmail(ev.target.value)}
            className="h-[45px] px-3 rounded-full outline-[#51B73B] border-[#51B73B] border bg-white"
            required
          />
        </div>

        <div className="flex flex-col gap-3 w-[80%]">
          <label className="font-semibold text-[20px]">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
            className="h-[45px] px-3 rounded-full outline-[#51B73B] border-[#51B73B] border bg-white"
            required
            minLength={6}
          />
        </div>
        <div className="flex flex-col gap-3 w-[80%]">
          <label className="font-semibold text-[20px]">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={ev => setConfirmpassword(ev.target.value)}
            className="h-[45px] px-3 rounded-full outline-[#51B73B] border-[#51B73B] border bg-white"
            required
            minLength={6}
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-[#51B73B] py-[8px] px-[35px] rounded-xl text-lime-50 text-[18px]"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
        <p>Already have an account? <Link to={'/login'}>Login now</Link></p>
      </form>
    </div>
  );
}
