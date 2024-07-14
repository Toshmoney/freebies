import { useEffect, useState, useContext } from "react";
import Post from "../Post";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
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
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch('https://freebiesbackend.onrender.com/all-posts');
        if (response.ok) {
          const posts = await response.json();
          setPosts(posts);
        } else {
          console.error('Failed to fetch posts:', response.status);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchPosts();
  }, [setUserInfo]);

  const username = userInfo?.user?.username;

  return (
    <div className="flex w-full md:flex-row flex-col">
      <div className="w-full justify-center p-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        {loading ? (
          <div className="text-center text-xl">Fetching latest posts...</div>
        ) : (
          posts.map(post => (
            <Post key={post._id} {...post} />
          ))
        )}
      </div>
    </div>
  );
}
