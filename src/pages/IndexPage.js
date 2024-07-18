import { useEffect, useState, useContext } from "react";
import Post from "../Post";
import { UserContext } from "../UserContext";
import ReactPaginate from 'react-paginate';

export default function IndexPage() {
  const { setUserInfo } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
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

  // Calculate the range of posts for the current page
  const startIndex = currentPage * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
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
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={Math.ceil(posts.length / postsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'flex justify-center space-x-2 mt-5'}
          previousLinkClassName={'px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'}
          nextLinkClassName={'px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'}
          breakLinkClassName={'px-3 py-1'}
          pageLinkClassName={'px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'}
          activeLinkClassName={'bg-[#51B73B] text-white'}
        />
      </div>
    </div>
  );
}
