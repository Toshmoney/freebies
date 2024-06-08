import React, { useState } from 'react';
import {Navigate} from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './create-post.css'

 const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContents] = useState('')
    const [file, setFile]= useState('');
    const [redirect, setRedirect] = useState(false)

    const createPost = async(ev)=>{
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("file", file[0]);
      data.set("content", content);
      ev.preventDefault();
      try {
        const response = await fetch("http://localhost:1000/create-post",{
          method:"POST",
          body:data,
          headers:{
            "Authorization":"token"
          }
        })

        if(response.ok){
          alert("New post successfully created")
          return setRedirect(true)
        }else{
          alert("Error .." + response.status);
          throw new Error()
        }
      } catch (error) {
        console.log(error);
      }     
      
    }

    if (redirect){
      return <Navigate to={'/'} />
    }
  return (
    <div>
        <h1>Create a new blog post</h1>
        <form action="" className='create-post' onSubmit={createPost}>
            <div className="form-control">
                <input type="text" name='title' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <div className="form-control">
                <input type="text" name='summary' placeholder='Summary' value={summary} onChange={e => setSummary(e.target.value)} />
            </div>

            <div className="form-control">
                <input type="file"  onChange={e => setFile(e.target.files)} />
            </div>

            <div className="">
                <ReactQuill theme='snow'
                value={content}
                placeholder='Contents'
                modules={modules}
                formats={formats} 
                onChange={newValue => setContents(newValue)}
                />
            </div>

            <button type="submit" className='publish'>Publish</button>
        </form>
    </div>
  )
}

export default CreatePost;