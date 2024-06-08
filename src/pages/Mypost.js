import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyPosts() {
  const { userInfo } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:1000/user/my-posts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          toast.error('Failed to fetch posts');
        }
      } catch (error) {
        toast.error('Error fetching posts: ' + error.message);
      }
    };

    fetchPosts();
  }, [userInfo]);

  return (
    <div className="flex flex-col w-full items-center mt-[50px]">
      <h2 className='text-2xl font-semibold'>My Posts</h2>
      <div className="flex flex-col gap-3">
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map(post => (
            <div key={post._id} className="flex gap-3 flex-col mt-4">
              <h3 className='text-2xl'>{post.title}</h3>
              <p>Views: {post.views}</p>
              <p>Reward: ${post.reward.toFixed(2)}</p>
              <p>Comments: {post.commentCount}</p>
              <div>
                <Link to={`/${post.slug}`} className=' underline'>View Post</Link>
              </div>
              <div>
                <Link to={`/edit/${post.slug}`} className=' underline decoration-[#51B73B]'>Edit Post</Link>
                </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
