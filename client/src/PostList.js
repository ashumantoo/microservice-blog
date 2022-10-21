import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CreateComments } from './CreateComments';
import { CommentList } from './CommentList';

export const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    // const posts = await axios.get("http://localhost:6001/posts");
    // const posts = await axios.get("http://localhost:6003/posts");
    //nginx-ingress controller url using kubernetes cluster
    const posts = await axios.get("http://posts.com/posts");
    setPosts(posts.data);
  }

  useEffect(() => {
    fetchPost();
  }, []);

  // const renderedPost = posts.map((post) => {
  const renderedPost = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: 20, padding: 10 }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          {/* <CommentList postId={post.id} /> */}
          <CommentList comments={post.comments} />
          <CreateComments postId={post.id} />
        </div>
      </div>
    )
  })
  return <div className="d-flex flex-row flex-wrap justity-content-between">
    {renderedPost}
  </div>
}