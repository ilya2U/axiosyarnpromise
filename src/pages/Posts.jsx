import React, { useEffect, useState } from 'react';
import PostService from '../API/PostService';
import PostList from '../components/PostsList';


function Posts() {
  const [posts, setPosts] = useState([]);

  const removePost=(post)=>{
    setPosts(posts.filter(p=>p.id!==post.id))
    
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await PostService.getAll();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []); 
 

  return (
    <div className="App">
      <PostList remove={removePost} posts={posts} title="Посты"/>
    </div>
  );
}

export default Posts;
