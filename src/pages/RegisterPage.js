import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function RegisterPage() {
  const { setUserInfo } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!username || !email || !password) {
      setLoading(false);
      return setError("All fields are required!");
    }

    if (password !== confirmpassword) {
      setLoading(false);
      return setError("Password and confirm password do not match!");
    }

    try {
      const response = await fetch('http://localhost:1000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.status === 201) {
        setUserInfo({ username, email, token: data.token });
        setSuccess('Registration successful');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again.');
    }
  }

  return (
    <div className="flex flex-col w-full justify-center h-[87vh] items-center gap-5">
      <form className="flex flex-col md:w-[50%] w-full justify-center items-center gap-5" onSubmit={register}>
        <h1 className="text-[23px]">Register To Get Started</h1>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {loading && <p>Loading...</p>}
        
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
