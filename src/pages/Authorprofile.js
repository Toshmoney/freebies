import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import profilepic from "../assets/images/logo123.jpg";
import { UserContext } from "../UserContext";

const AuthorProfile = () => {
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const [author, setAuthor] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(`https://homeworktips-22mg.onrender.com/writer/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAuthor(data);
          if (data.followers) {
            setIsFollowing(data.followers.includes(userInfo.userId));
          }
        } else {
          console.error('Failed to fetch author info');
        }
      } catch (error) {
        console.error('Error fetching author info:', error);
      }
    };

    fetchAuthor();
  }, [id, userInfo]);

  const handleFollow = async () => {
    try {
      const response = await fetch(`https://homeworktips-22mg.onrender.com/author/${id}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ currentUserId: userInfo.userId })
      });

      if (response.ok) {
        setIsFollowing(true);
      } else {
        console.error('Failed to follow user');
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await fetch(`https://homeworktips-22mg.onrender.com/author/${id}/unfollow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ currentUserId: userInfo.userId })
      });

      if (response.ok) {
        setIsFollowing(false);
      } else {
        console.error('Failed to unfollow user');
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  if (!author) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 mt-5">
      <div>
        <img
          src={author.profilePicture ? `https://homeworktips-22mg.onrender.com/uploads/${author.profilePicture}` : profilepic}
          alt="Profile"
          className="h-[20vh] rounded-full border-2 border-[#51B73B]"
        />
      </div>
      <h1 className="text-3xl font-bold">{author.username}</h1>
      <p>{author.profileDescription}</p>
      <p>Availability: {author.availability ? "Available" : "Not Available"}</p>
      
      {userInfo && userInfo.user && userInfo.user.username !== author.username && (
        isFollowing ? (
          <button onClick={handleUnfollow} className="bg-red-500 text-white py-2 px-4 rounded mt-2">
            Unfollow
          </button>
        ) : (
          <button onClick={handleFollow} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">
            Follow
          </button>
        )
      )}
    </div>
  );
};

export default AuthorProfile;
