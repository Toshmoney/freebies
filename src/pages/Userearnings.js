import React, { useState, useEffect } from 'react';
// import { UserContext } from '../UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EarningsPage() {
  // const { userInfo } = useContext(UserContext);
  const [earnings, setEarnings] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await fetch('https://homeworktips-22mg.onrender.com/user/earnings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setEarnings(data.totalEarnings);
          setPosts(data.posts);
        } else {
          toast.error(data.error);
        }
      } catch (error) {
        toast.error('Error fetching earnings: ' + error.message);
      }
    };

    fetchEarnings();
  }, []);

  return (
    <div className="earnings-page w-full flex flex-col items-center gap-5 py-10">
      <h2 className="text-2xl font-semibold">Earnings Overview</h2>
      <p className="text-lg">Total Earnings: ${earnings.toFixed(2)}</p>
      <div className="flex flex-col w-[80%] gap-5">
        <h3 className="text-xl font-semibold">Post Earnings</h3>
        {posts.map(post => (
          <div key={post._id} className="flex flex-col border p-3 rounded shadow">
            <h4 className="text-lg font-semibold">{post.title}</h4>
            <p>Views: {post.views}</p>
            <p>Earnings: ${(Math.floor(post.views / 1000) * 0.1).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
