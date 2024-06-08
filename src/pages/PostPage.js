import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from 'react-router-dom';
import Comments from './Comment';
import { toast } from 'react-toastify';

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  // const { id: slug } = useParams(); 
  const { id } = useParams();

  console.log("post url:  " + id);

  useEffect(() => {
    fetch(`http://localhost:1000/post/${id}`)
      .then(response => {
        if (response.ok) {
          response.json().then(postInfo => {
            setPostInfo(postInfo);
          });
        } else {
          console.error('Failed to fetch post:', response.status);
        }
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        toast.error('Error fetching post');
      });
  }, [id]);

  if (!postInfo) return null;

  return (
    <div className="post-page w-[100%] flex flex-col gap-2 items-center mt-5">
      <h1 className="text-2xl font-semibold m-2">{postInfo.title}</h1>
      <time className="text-lime-500">{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="text-[18px] font-semibold text-gray-400">Views {postInfo.views}</div>
      <div className="author text-[16px] font-medium">by @{postInfo.author}</div>
      {userInfo && userInfo?.user?.username === postInfo.author && (
        <div className="">
          <Link className="flex flex-row-reverse gap-3 bg-[#51B73B] py-2 px-5 rounded text-white mt-3" to={`/edit/${postInfo.slug}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
        </div>
      )}
      <div className="my-4">
        <img src={postInfo.image} alt={postInfo.title} />
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col w-[80%] gap-3" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
      <Comments postId={id} />
    </div>
  );
}
