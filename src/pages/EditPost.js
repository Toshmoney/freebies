import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`https://freebiesbackend.onrender.com/post/${id}`)  
      .then(response => response.json())
      .then(postInfo => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
        setAuthor(postInfo.author);
      });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('author', author);
    data.set('slug', id); 
    

    const token = localStorage.getItem('token'); 

    const response = await fetch(`https://freebiesbackend.onrender.com/post/${id}`, {
      method: 'PATCH',
      body: data,
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });

    if (response.ok) {
      setRedirect(true);
    } else {
      const errorData = await response.json();
      console.error('Update failed:', errorData);
      alert('Update failed: ' + errorData.error);
    }
  }

  if (redirect) {
    return <Navigate to={`/${id}`} /> 
  }

  return (
    <form onSubmit={updatePost} className="w-full flex flex-col min-h-[100vh] items-center mt-10 pb-10">
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} 
             className="md:w-[50%] w-[80%] h-[45px] px-3 rounded-lg border border-[#51B73B] outline-2 outline-[#51B73B]"/>
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)}
             className="md:w-[50%] w-[80%] h-[45px] px-3 rounded-lg border border-[#51B73B] outline-2 outline-[#51B73B] mt-3" />

      <Editor onChange={setContent} value={content} />
      <button className="md:w-[50%] w-[80%] h-[45px] px-3 rounded-lg bg-[#51B73B] outline-2 mt-5 text-lime-50 text-xl hover:bg-[#97c98c]">Update post</button>
    </form>
  );
}
