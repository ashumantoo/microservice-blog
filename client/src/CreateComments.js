import React, { useState } from 'react';
import axios from "axios"

export const CreateComments = ({ postId }) => {
  const [content, setContent] = useState("");


  const onSubmit = async (event) => {
    event.preventDefault();
    // axios.post(`http://localhost:6002/post/${postId}/comments`, {
    //   content
    // });
    //nginx-ingress controller url using kubernetes cluster
    axios.post(`http://posts.com/post/${postId}/comments`, {
      content
    });
    setContent("");
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Add New Comment</label>
          <input
            className="form-control"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  )
}

