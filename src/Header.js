import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('https://freebiesbackend.onrender.com/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.ok) {
          const userInfo = await response.json();
          setUserInfo(userInfo);
        } else {
          console.error('Failed to fetch profile');
          setUserInfo(null);
          localStorage.removeItem('token');
        }
      }
    };

    fetchProfile();
  }, [setUserInfo]);
  const username = userInfo?.user?.username;

  function logout() {
    setUserInfo(null);
    localStorage.removeItem('token');
  }


  return (
    <header className="flex flex-col md:justify-center w-full md:h-[100px] items-center gap-4 md:bg-[transparent] justify-center">
      <a href="/" className=" text-[28px] font-bold text-[#51B73B]">Freebiestech</a>
      <nav className="w-full flex justify-center">
        {username ? (
          <div className="flex gap-5 items-center text-[16px] md:flex-row flex-col">
            <h5>Welcome {username}</h5>
            <a href="/create">Create new post</a>
            <a href="/profile">Profile</a>
            <a onClick={logout} href="/login" className="text-[red] cursor-pointer">Logout ({username})</a>
          </div>
        ) : (
          <div className="flex gap-5 text-[15px]">
            <a href="/" className="hover:text-[#51B73B]">Home</a>
            <a href="/disclaimer" className="hover:text-[#51B73B]">Disclaimer</a>
            <a href="/about" className="hover:text-[#51B73B]">About</a>
            <a href="/privacy-policy" className="hover:text-[#51B73B]">Privacy Policy</a>
            <a href="/contact" className="hover:text-[#51B73B]">Contact Us</a>
          </div>
        )}
      </nav>
    </header>
  );
}
