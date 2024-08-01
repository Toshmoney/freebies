import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [isClickDisabled, setIsClickDisabled] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();

    if (!title || !summary || !content) {
      toast.error("All fields are required!");
      return;
    }

    setIsClickDisabled(true);

    const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to create a post.");
      setIsClickDisabled(false);
      return;
    }

    try {
      const response = await fetch('https://freebiesbackend.onrender.com/create-post', {
        method: 'POST',
        body: data,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Post created successfully!');
        setRedirect(true);
      } else {
        toast.error(result.error || 'Failed to create post');
        setIsClickDisabled(false);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      setIsClickDisabled(false);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form onSubmit={createNewPost} className="w-full flex flex-col min-h-[100vh] items-center mt-10 pb-10">
      <ToastContainer />
      <h1 className="text-xl my-5 font-semibold">Create New Post</h1>
      <input type="text"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)}
             className="md:w-[50%] w-[80%] h-[45px] px-3 rounded-lg border border-[#51B73B] outline-2 outline-[#51B73B]" />
      <input type="text"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)}
             className="md:w-[50%] w-[80%] h-[45px] px-3 rounded-lg border border-[#51B73B] outline-2 outline-[#51B73B] mt-3" />
      <Editor value={content} onChange={setContent} />
      <button type="submit"
              className={`md:w-[50%] w-[80%] h-[45px] px-3 rounded-lg ${isClickDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#51B73B] cursor-pointer'} outline-2 mt-5 text-lime-50 text-xl ${isClickDisabled ? '' : 'hover:bg-[#97c98c]'}`}
              disabled={isClickDisabled}>
        {isClickDisabled ? "Please wait..." : "Create post"}
      </button>
    </form>
  );
}
