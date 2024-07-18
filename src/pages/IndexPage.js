import { useEffect, useState, useContext } from "react";
import Post from "../Post";
import { UserContext } from "../UserContext";

export default function IndexPage() {
  const { setUserInfo } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

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

  // Calculate total pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="w-full justify-center p-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        {loading ? (
          <div className="text-center text-xl">Fetching latest posts...</div>
        ) : (
          currentPosts.map(post => (
            <Post key={post._id} {...post} />
          ))
        )}
      </div>
      <div className="w-full flex justify-center mt-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-[#51B73B] text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
