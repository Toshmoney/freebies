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
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [isclick, setisclick] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();

    if (!title || !summary || !content || !file) {
      toast.error("All fields are required!");
      return;
    }

    setisclick(true);

    const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    data.append('image', file);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to create a post.");
      setisclick(false);
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
        setisclick(false);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      setisclick(false);
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
      <input type="file"
             onChange={ev => setFile(ev.target.files[0])}
             className="md:w-[50%] w-[80%] h-[45px] px-3 rounded-lg border-[#51B73B] outline-2 outline-[#51B73B] my-5" />
      <Editor value={content} onChange={setContent} />
      <button type="submit"
              className="md:w-[50%] w-[80%] h-[45px] px-3 rounded-lg bg-[#51B73B] outline-2 mt-5 text-lime-50 text-xl hover:bg-[#97c98c]"
              disabled={isclick}>
        {isclick ? "Please wait..." : "Create post"}
      </button>
    </form>
  );
}
