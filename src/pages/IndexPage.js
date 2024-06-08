import { useEffect, useState, useContext } from "react";
import Post from "../Post";
import {formatISO9075} from "date-fns";
import { UserContext } from "../UserContext";
import LoginPage from "../pages/LoginPage"
import { Link } from "react-router-dom";

export default function IndexPage() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('https://homeworktips-22mg.onrender.com/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });

          if (response.ok) {
            const userInfo = await response.json();
            setUserInfo(userInfo);
          } else {
            console.error('Failed to fetch profile');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfile();

    try {
      fetch('https://homeworktips-22mg.onrender.com/all-posts').then(response => {
        if (response.ok) {
          response.json().then(posts => {
            setPosts(posts);
          });
        } else {
          console.error('Failed to fetch posts:', response.status);
        }
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, []);

  const username = userInfo?.user?.username;

  return (
    <div className="flex w-full md:flex-row flex-col">
      <div className="md:w-[40%] justify-center w-full md:flex hidden">
        {userInfo ? (
          <div className="w-[80%] p-4 h-[50vh] justify-center md:flex flex-col m-[70px]">
            <h2 className="text-xl font-medium">{username}, kindly note that any writers caught publishing AI-generated content would receive a permanent account ban, and such a writer would lose all their earnings.</h2>
            <p className="mt-4 text-[20px]">Available Balance: $ {userInfo.balance}</p>
            <p className="mt-4 text-[20px]">Username: {username}</p>
            <p className="mt-4 text-[20px]">Email: {userInfo?.user?.email}</p>
            <p className="mt-4 text-[20px]">Date Joined:  
          <time> {formatISO9075(new Date(userInfo?.user?.createdAt || null))}</time>
          </p>
            <p className="mt-4 text-[20px]">Availability: {userInfo?.user?.available ? "Yes" : "No"}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-[80%] h-[60vh] justify-center items-center">
            <h2>You are not logged in, Please login to continue enjoying this app!</h2>
            <h2>And if you have not yet register kindly do that now.</h2>
            <div className="mt-4">
              <Link to={'/login'} className="bg-[#51B73B] py-[8px] px-[35px] rounded-xl text-lime-50 text-[18px]">Login Now</Link>
            </div>
          </div>
        )}
      </div>
      <div className="md:w-[60%] w-full justify-center p-5 flex gap-4 flex-col">
        {posts.map(post => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
}
