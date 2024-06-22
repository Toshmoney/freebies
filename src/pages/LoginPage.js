import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Helmet} from "react-helmet";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://homeworktips-22mg.onrender.com/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setUserInfo(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        toast.success("Login successful");
        setRedirect(true);
      } else {
        toast.error(data.error || 'Wrong credentials');
      }
    } catch (err) {
      setLoading(false);
      toast.error('An error occurred. Please try again.');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="flex flex-col w-full justify-center h-[87vh] items-center gap-5">
      {/* SEO Settings... Don't touch it oo */}
      <Helmet>
                <meta charSet="utf-8" />
                <title>Login Page | Homeworktips</title>
                <meta name="description" content="Home work tips login page" />
                <link rel="canonical" href="http://homeworktips.info/login" />
      </Helmet>

      {/* End of SEO Settings... Don't touch it oo */}

      <ToastContainer />
      <form className="flex flex-col md:w-[50%] w-full justify-center items-center gap-5" onSubmit={login}>
        <h1 className="text-[23px]">Please Login</h1>
        
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
          />
        </div>

        <div>
          <button
            className="bg-[#51B73B] py-[8px] px-[35px] rounded-xl text-lime-50 text-[18px]"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        
        <p>Don't have an account? <Link to={'/register'}>Sign up now</Link></p>
      </form>
    </div>
  );
}
