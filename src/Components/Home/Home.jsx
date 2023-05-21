import React, { useEffect, useState } from 'react';
import NavBar from '../../Nav/NavBar';
import {formatISO9075} from "date-fns"
import '../../App.css';

const Home = () => {
  const [post, setPost] = useState([{}]);

  const fetchPosts = async ()=>{
    const response = await fetch("http://localhost:1000")
    .then(res => res.json())
    setPost(response)
  }

  useEffect(()=>{
    fetchPosts()
  }, [])

  if(!post){
    return;
  }
  return (
    <section>
        <NavBar/>
        <main>
          {
            post && post.map((post, index)=>{
              return(
                <div className='post' key={index}>
                  <div className='post-cover'>
                    <img src={`http://localhost:1000/${post.cover_img}`} alt="" />
                  </div>
                  <div className='post-content'>
                    <h2><a href="/" className='title'>{post.title}</a></h2>
                    <div className='d-flex'>
                    <a href="/" className='author'>{}</a>
                    <a href="/" className='date-time'>
                    {/* <time>{formatISO9075(new Date(post.createdAt))}</time> */}
                    </a>
                    </div>
                    <p>{post.summary}</p>
                    {/* <div dangerouslySetInnerHTML={{__html: post.content}} /> */}
                  </div>
                </div>
              )
          })
            
            
          }
          
        </main>
    </section>
  )
}

export default Home