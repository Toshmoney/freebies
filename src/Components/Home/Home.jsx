import React, { useEffect, useState } from 'react';
import NavBar from '../../Nav/NavBar';
import { formatISO9075 } from 'date-fns';
import '../../App.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseurl = 'http://localhost:1000';

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${baseurl}/all-posts`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading contents...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section>
      <NavBar />
      <main>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div className='post' key={index}>
              <div className='post-cover'>
                <img src={`${baseurl}/${post.author?.image}`} alt={post.author?.username} />
                {/* <img src={`${baseurl}/uploads${post.image}`} alt={post.title} /> */}
              </div>
              <div className='post-content'>
                <h2><a href="/" className='title'>{post.title}</a></h2>
                <div className='d-flex'>
                  <a href="/" className='author'>{post.author?.username || 'Anonymous'}</a>
                  <a href="/" className='date-time'>
                    <time>{formatISO9075(new Date(post.createdAt))}</time>
                  </a>
                </div>
                <p>{post.summary}</p>
                {/* <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
              </div>
            </div>
          ))
        ) : (
          <h2>No blog posts approved yet!</h2>
        )}
      </main>
    </section>
  );
};

export default Home;
